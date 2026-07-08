import React, { useState } from 'react';

const Login = ({ onLogin, onAdminLogin, onNavigateToRegister, onNavigateToHome }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.role === 'admin') {
        if (onAdminLogin) onAdminLogin(data);
      } else {
        if (onLogin) onLogin(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#B69F73] flex flex-col items-center justify-center p-6 font-sans relative">
      <div className="w-full max-w-[600px] z-10 relative">
        <div className="bg-[#FAF5EC] w-full p-10 md:p-14 rounded-[30px] relative shadow-2xl">
          {/* Corner Decorators */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#EADFC8] rounded-tl-xl pointer-events-none"></div>
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#EADFC8] rounded-br-xl pointer-events-none"></div>

          <h2 className="text-[32px] font-bold text-[#2A2A2A] mb-10 tracking-tight">Login to Account</h2>

          {error && <div className="mb-6 text-red-500 text-sm bg-red-100 p-3 rounded-lg border border-red-200">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">
                Username or Email Address
              </label>
              <input 
                type="text" 
                required 
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-3 focus:outline-none focus:border-[#2A2A2A] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">
                Password
              </label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-3 focus:outline-none focus:border-[#2A2A2A] transition-colors"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full sm:w-auto bg-[#2A2A2A] btn-shine text-white font-bold text-[11px] tracking-widest py-4 px-10 rounded-[20px] hover:bg-black transition-colors uppercase"
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>

              <div className="flex flex-col items-center sm:items-end gap-2">
                <div className="text-[12px] text-[#7A7266]">
                  Don't have an account?{' '}
                  <button type="button" onClick={onNavigateToRegister} className="text-[#2A2A2A] font-bold hover:underline underline-offset-4">
                    Register
                  </button>
                </div>
                <button type="button" onClick={onNavigateToHome} className="text-[11px] text-[#9A9286] hover:text-[#2A2A2A] transition-colors uppercase tracking-widest mt-1">
                  Back to Home
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

