import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, X, Camera, User, Mail } from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    name: 'User',
    email: 'user@recyclex.com',
    role: 'seller',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  });

  const [showEditPicture, setShowEditPicture] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('recyclex_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserProfile(parsedUser);
      setNewUsername(parsedUser.name);
      setNewEmail(parsedUser.email);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        const updatedProfile = { ...userProfile, profileImage: base64 };
        setUserProfile(updatedProfile);
        localStorage.setItem('recyclex_user', JSON.stringify(updatedProfile));
        setShowEditPicture(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameUpdate = () => {
    if (newUsername.trim()) {
      const updatedProfile = { ...userProfile, name: newUsername };
      setUserProfile(updatedProfile);
      localStorage.setItem('recyclex_user', JSON.stringify(updatedProfile));
      setShowEditUsername(false);
    }
  };

  const handleEmailUpdate = () => {
    if (newEmail.trim()) {
      const updatedProfile = { ...userProfile, email: newEmail };
      setUserProfile(updatedProfile);
      localStorage.setItem('recyclex_user', JSON.stringify(updatedProfile));
      setShowEditEmail(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('recyclex_user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Navbar */}
      <nav className="fixed top-0 right-0 left-0 z-40 bg-stone-50/60 backdrop-blur-md shadow-sm border-b border-stone-200/50">
        <div className="flex justify-between items-center px-8 h-20">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-lg font-bold text-green-700 hover:opacity-70 transition-opacity"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-8 pb-12 max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-2">{userProfile.name}'s Profile</h1>
          <p className="text-slate-600">Manage your profile settings and preferences</p>
        </div>

        {/* Profile Settings */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-stone-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-200">
                <img src={userProfile.profileImage} alt="profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Profile Picture</p>
                <p className="text-sm text-stone-600">Upload a new profile photo</p>
              </div>
            </div>
            <button
              onClick={() => setShowEditPicture(true)}
              className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all font-bold"
            >
              Change
            </button>
          </div>

          {/* Username */}
          <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-stone-100">
            <div>
              <p className="font-bold text-slate-900">Username</p>
              <p className="text-sm text-stone-600">{userProfile.name}</p>
            </div>
            <button
              onClick={() => setShowEditUsername(true)}
              className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all font-bold"
            >
              Change
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-stone-100">
            <div>
              <p className="font-bold text-slate-900">Email Address</p>
              <p className="text-sm text-stone-600">{userProfile.email}</p>
            </div>
            <button
              onClick={() => setShowEditEmail(true)}
              className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all font-bold"
            >
              Change
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-6 bg-red-50 rounded-2xl border-2 border-red-200 hover:bg-red-100 transition-all font-bold text-red-600 mt-8"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </main>

      {/* Edit Profile Picture Modal */}
      {showEditPicture && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Change Profile Picture</h3>
              <button onClick={() => setShowEditPicture(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-100">
                <img src={userProfile.profileImage} alt="current" className="w-full h-full object-cover" />
              </div>
              <label className="flex items-center justify-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg cursor-pointer hover:bg-green-600 transition-all font-bold">
                <Camera size={20} />
                Upload Image
                <input type="file" accept="image/*" onChange={handleProfilePictureUpload} className="hidden" />
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
              <h3 className="text-xl font-bold text-slate-900">Change Username</h3>
              <button onClick={() => setShowEditUsername(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Current</label>
                <p className="text-slate-600 font-medium">{userProfile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">New Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent"
                  placeholder="Enter new username"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUsernameUpdate}
                  className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 font-bold"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowEditUsername(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-bold"
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
              <h3 className="text-xl font-bold text-slate-900">Change Email</h3>
              <button onClick={() => setShowEditEmail(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Current</label>
                <p className="text-slate-600 font-medium">{userProfile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">New Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent"
                  placeholder="Enter new email"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleEmailUpdate}
                  className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 font-bold"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowEditEmail(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
