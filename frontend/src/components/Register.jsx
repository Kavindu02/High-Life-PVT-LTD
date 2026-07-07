import React, { useState } from 'react';

const Register = ({ onRegister, onNavigateToLogin, onNavigateToHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobileNumber, password })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      onRegister(); // Redirects to login seamlessly
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

          <h2 className="text-[32px] font-bold text-[#2A2A2A] mb-10 tracking-tight">Create Account</h2>

          <div className="h-10 mb-2">
            {error && <div className="text-red-500 text-sm bg-red-100 p-2 rounded-lg border border-red-200">{error}</div>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-2 focus:outline-none focus:border-[#2A2A2A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">
                  Mobile Number
                </label>
                <input 
                  type="tel" 
                  required 
                  value={mobileNumber} 
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-2 focus:outline-none focus:border-[#2A2A2A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-2 focus:outline-none focus:border-[#2A2A2A] transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">
                  Password
                </label>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-2 focus:outline-none focus:border-[#2A2A2A] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">
                  Confirm Password
                </label>
                <input 
                  type="password" 
                  required 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-2 focus:outline-none focus:border-[#2A2A2A] transition-colors"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full sm:w-auto bg-[#2A2A2A] text-white font-bold text-[11px] tracking-widest py-4 px-10 rounded-[20px] hover:bg-black transition-colors uppercase"
              >
                {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
              </button>

              <div className="flex flex-col items-center sm:items-end gap-2">
                <div className="text-[12px] text-[#7A7266]">
                  Already have an account?{' '}
                  <button type="button" onClick={onNavigateToLogin} className="text-[#2A2A2A] font-bold hover:underline underline-offset-4">
                    Sign In
                  </button>
                </div>
                <button type="button" onClick={onNavigateToHome} className="text-[11px] text-[#9A9286] hover:text-[#2A2A2A] transition-colors uppercase tracking-widest">
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

export default Register;
