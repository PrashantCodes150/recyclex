import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Settings, HelpCircle, BarChart3, ShoppingCart, Package, Zap, Edit2, User, Mail, X, Camera } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditPicture, setShowEditPicture] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('recyclex_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [newUsername, setNewUsername] = useState(user?.name || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');

  const isActive = (path) => location.pathname === path;

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = {
          ...user,
          profileImage: reader.result,
        };
        setUser(updatedUser);
        localStorage.setItem('recyclex_user', JSON.stringify(updatedUser));
        setShowEditPicture(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameUpdate = () => {
    if (newUsername.trim()) {
      const updatedUser = {
        ...user,
        name: newUsername,
      };
      setUser(updatedUser);
      localStorage.setItem('recyclex_user', JSON.stringify(updatedUser));
      setShowEditUsername(false);
    }
  };

  const handleEmailUpdate = () => {
    if (newEmail.trim()) {
      const updatedUser = {
        ...user,
        email: newEmail,
      };
      setUser(updatedUser);
      localStorage.setItem('recyclex_user', JSON.stringify(updatedUser));
      setShowEditEmail(false);
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('recyclex_user');
    navigate('/');
  };

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '📦', label: 'Listings', path: '/dashboard/listings' },
    { icon: '🛒', label: 'Orders', path: '/dashboard/orders' },
    { icon: '📈', label: 'Analytics', path: '/dashboard/analytics' },
    { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-stone-100 flex flex-col p-4 gap-2 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 py-6">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
          ♻️
        </div>
        <div>
          <h1 className="text-lg font-black text-green-900 tracking-tighter leading-none">ReCycleX Portal</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
            {user?.role === 'seller' ? 'Seller' : 'Buyer'} Environment
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${
              isActive(item.path)
                ? 'bg-white text-green-700 shadow-sm scale-98'
                : 'text-stone-500 hover:bg-stone-200/50 hover:translate-x-1'
            }`}
          >
            <span className="text-lg">{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>

      {/* CTA Button */}
      <div className="mt-auto flex flex-col gap-1">
        <button className="mb-4 w-full py-4 rounded-xl bg-gradient-to-br from-green-700 to-green-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 hover:opacity-90 active:scale-95 transition-all">
          <Zap size={18} /> Detect Waste
        </button>

        <button
          onClick={() => navigate('/dashboard/support')}
          className="flex items-center gap-3 px-4 py-3 text-stone-500 hover:bg-stone-200/50 hover:translate-x-1 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <HelpCircle size={18} /> Support
        </button>

        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-3 px-4 py-3 text-stone-500 hover:bg-stone-200/50 hover:translate-x-1 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={18} /> Log Out
        </button>

        {/* User Profile Section */}
        <div 
          className="mt-6 pt-4 border-t border-stone-300 flex items-center gap-3 relative cursor-pointer group"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full overflow-hidden bg-stone-300 hover:ring-2 hover:ring-green-600 transition-all flex-shrink-0"
          >
            <img
              src={user?.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="flex-1 min-w-0 text-left hover:opacity-70 transition-opacity"
          >
            <p className="text-xs font-bold text-stone-900 truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] text-stone-500 font-medium uppercase tracking-wider truncate">
              {user?.role === 'seller' ? 'Seller' : 'Buyer'}
            </p>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-lg shadow-lg border border-stone-200 z-50 py-2">
              <div className="px-4 py-3 border-b border-stone-200">
                <p className="text-sm font-bold text-stone-900">{user?.name || 'User'}</p>
                <p className="text-xs text-stone-500">{user?.email || 'user@recyclex.com'}</p>
              </div>

              <button 
                onClick={() => setShowEditPicture(true)}
                className="w-full px-4 py-2 flex items-center gap-3 text-stone-700 hover:bg-stone-50 transition-all text-sm"
              >
                <Edit2 size={16} />
                <span>Edit Profile Picture</span>
              </button>

              <button 
                onClick={() => setShowEditUsername(true)}
                className="w-full px-4 py-2 flex items-center gap-3 text-stone-700 hover:bg-stone-50 transition-all text-sm"
              >
                <User size={16} />
                <span>Change Username</span>
              </button>

              <button 
                onClick={() => setShowEditEmail(true)}
                className="w-full px-4 py-2 flex items-center gap-3 text-stone-700 hover:bg-stone-50 transition-all text-sm"
              >
                <Mail size={16} />
                <span>Change Email</span>
              </button>

              <div className="border-t border-stone-200 mt-2 pt-2">
                <button 
                  onClick={handleLogoutClick}
                  className="w-full px-4 py-2 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-all text-sm"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Edit Profile Picture Modal */}
        {showEditPicture && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-headline text-slate-900">Edit Profile Picture</h3>
                <button onClick={() => setShowEditPicture(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-100">
                  <img 
                    src={user?.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'} 
                    alt="current" 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <label className="flex items-center justify-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg cursor-pointer hover:bg-green-600 transition-all font-bold">
                  <Camera size={20} />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => setShowEditPicture(false)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Username Modal */}
        {showEditUsername && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-headline text-slate-900">Change Username</h3>
                <button onClick={() => setShowEditUsername(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Current Username</label>
                  <p className="text-slate-600 font-medium">{user?.name || 'User'}</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">New Username</label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all"
                    placeholder="Enter new username"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUsernameUpdate}
                    className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all font-bold"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowEditUsername(false)}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Email Modal */}
        {showEditEmail && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-headline text-slate-900">Change Email</h3>
                <button onClick={() => setShowEditEmail(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Current Email</label>
                  <p className="text-slate-600 font-medium">{user?.email || 'user@recyclex.com'}</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">New Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all"
                    placeholder="Enter new email"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleEmailUpdate}
                    className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all font-bold"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowEditEmail(false)}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
