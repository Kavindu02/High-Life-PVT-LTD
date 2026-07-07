import React from 'react';

const Profile = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#B69F73] flex flex-col items-center justify-center p-6 font-sans relative pt-24 md:pt-32">
      <div className="w-full max-w-[700px] z-10 relative">
        <div className="bg-[#FAF5EC] w-full p-10 md:p-14 rounded-[30px] relative shadow-2xl">
          {/* Corner Decorators */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#EADFC8] rounded-tl-xl pointer-events-none"></div>
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#EADFC8] rounded-br-xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-24 h-24 bg-[#B69F73] text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg shrink-0 border-4 border-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-[32px] font-bold text-[#2A2A2A] tracking-tight">{user.name}</h2>
              <p className="text-[#9A9286] font-bold tracking-widest text-[11px] uppercase mt-1">Premium Member</p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-bold text-[#2A2A2A] mb-6">Account Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">Full Name</p>
                <p className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-3 text-lg font-bold">
                  {user.name}
                </p>
              </div>
              
              {user.mobileNumber && (
                <div>
                  <p className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">Mobile Number</p>
                  <p className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-3 text-lg font-bold">
                    {user.mobileNumber}
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">Email Address</p>
              <p className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-3 text-lg font-bold">
                {user.email}
              </p>
            </div>
          </div>

          <div className="pt-12 flex justify-center md:justify-start">
            <button 
              onClick={onLogout}
              className="bg-[#2A2A2A] text-white font-bold text-[11px] tracking-widest py-4 px-10 rounded-[20px] hover:bg-black transition-colors uppercase shadow-md"
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

