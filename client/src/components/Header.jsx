import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, subtitle }) {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const [user] = useState(() => {
    const stored = localStorage.getItem('recyclex_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('recyclex_user');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-stone-50/60 backdrop-blur-md px-10 py-6 flex justify-between items-center border-b border-stone-200/50">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-on-surface">{title}</h2>
        <p className="text-sm text-on-surface-variant">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Market Feed Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-bold text-primary">Live Market Feed</span>
        </div>

        {/* Notification Bell */}
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-stone-200/50 rounded-lg">
          <Bell size={20} />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-green-600 to-green-800 text-white font-bold flex items-center justify-center hover:shadow-lg transition-all ring-2 ring-white ring-offset-2 ring-offset-stone-100"
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </button>

          {/* Profile Popover */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-stone-200/50 overflow-hidden z-50">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-6 text-white">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mb-3">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h3 className="font-bold text-lg">{user?.name || 'User'}</h3>
                <p className="text-sm text-white/80">{user?.email}</p>
                <div className="mt-3 inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">
                  {user?.role === 'seller' ? '🏪 Seller' : '🛒 Buyer'}
                </div>
              </div>

              {/* Profile Stats */}
              <div className="grid grid-cols-3 gap-4 p-6 border-b border-stone-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-xs text-on-surface-variant">Listings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">$1.2K</p>
                  <p className="text-xs text-on-surface-variant">Earnings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">2.4T</p>
                  <p className="text-xs text-on-surface-variant">CO₂ Saved</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-4 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-stone-100 rounded-lg transition-colors text-on-surface font-medium">
                  <Settings size={18} /> Settings
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-stone-100 rounded-lg transition-colors text-on-surface font-medium">
                  📋 Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-stone-100 rounded-lg transition-colors text-on-surface font-medium">
                  💬 Support
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-stone-200"></div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-bold hover:bg-red-50 transition-colors">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
