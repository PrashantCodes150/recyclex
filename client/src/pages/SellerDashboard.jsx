import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight, Edit2, Mail, User, LogOut, X, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageDetectionModule from '../components/ImageDetectionModule';

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard' | 'detect'
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Chen',
    role: 'Verified Seller',
    email: 'alex@recyclex.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  });

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditPicture, setShowEditPicture] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    // Read user profile from localStorage
    const storedUser = localStorage.getItem('recyclex_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserProfile(prev => ({
          ...prev,
          name: userData.name || 'User',
          role: userData.role === 'seller' ? 'Verified Seller' : 'Buyer',
          email: userData.email,
          profileImage: userData.profileImage || prev.profileImage,
        }));
        setNewUsername(userData.name || '');
        setNewEmail(userData.email || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfile = {
          ...userProfile,
          profileImage: reader.result,
        };
        setUserProfile(newProfile);
        
        // Update localStorage
        const storedUser = JSON.parse(localStorage.getItem('recyclex_user') || '{}');
        storedUser.profileImage = reader.result;
        localStorage.setItem('recyclex_user', JSON.stringify(storedUser));
        
        setShowEditPicture(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameUpdate = () => {
    if (newUsername.trim()) {
      const newProfile = {
        ...userProfile,
        name: newUsername,
      };
      setUserProfile(newProfile);
      
      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem('recyclex_user') || '{}');
      storedUser.name = newUsername;
      localStorage.setItem('recyclex_user', JSON.stringify(storedUser));
      
      setShowEditUsername(false);
    }
  };

  const handleEmailUpdate = () => {
    if (newEmail.trim()) {
      const newProfile = {
        ...userProfile,
        email: newEmail,
      };
      setUserProfile(newProfile);
      
      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem('recyclex_user') || '{}');
      storedUser.email = newEmail;
      localStorage.setItem('recyclex_user', JSON.stringify(storedUser));
      
      setShowEditEmail(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('recyclex_user');
    navigate('/');
  };

  const [formData, setFormData] = useState({
    wasteType: 'High-Density Polyethylene (HDPE)',
    quantity: '',
    description: '',
    location: '',
    price: '',
  });

  const [listings, setListings] = useState([
    {
      id: 1,
      name: 'Crushed PET Bottles (Grade A)',
      type: 'Recycled Plastic',
      price: 450.00,
      quantity: 500,
      location: 'Berlin Hub',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      status: 'Active',
      interest: 65,
    },
    {
      id: 2,
      name: 'Shredded Aluminum Cans',
      type: 'Ferrous Metals',
      price: 820.00,
      quantity: 1200,
      location: 'Hamburg Port',
      image: 'https://images.unsplash.com/photo-1605600611284-19561ad7ddf0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      status: 'Active',
      interest: 30,
    },
    {
      id: 3,
      name: 'Industrial Grade Cardboard',
      type: 'Paper & Fiber',
      price: 120.00,
      quantity: 800,
      location: 'Munich Logis',
      image: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      status: 'Pending Approval',
      interest: 10,
    },
  ]);

  const [uploadedImages, setUploadedImages] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePublish = (e) => {
    e.preventDefault();
    
    if (!formData.wasteType || !formData.quantity || !formData.location || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new listing
    const newListing = {
      id: listings.length + 1,
      name: `${formData.wasteType} - ${formData.quantity}kg`,
      type: formData.wasteType,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      location: formData.location,
      image: uploadedImages[0] || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      status: 'Pending Approval',
      interest: 0,
    };

    setListings([newListing, ...listings]);
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      wasteType: 'High-Density Polyethylene (HDPE)',
      quantity: '',
      description: '',
      location: '',
      price: '',
    });
    setUploadedImages([]);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-white/90 text-green-700' : 'bg-cyan-500 text-white';
  };

  const getInterestColor = (interest) => {
    if (interest >= 50) return 'from-green-500 to-green-400';
    if (interest >= 30) return 'from-cyan-500 to-cyan-400';
    return 'from-slate-400 to-slate-300';
  };

  return (
    <div className="light bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container flex min-h-screen">
      {/* Sidebar */}
      <aside className="h-screen w-64 border-r border-slate-200/20 bg-slate-50 flex flex-col py-6 space-y-2 fixed left-0 top-0 z-40">
        <div className="px-8 mb-8">
          <h1 className="text-2xl font-black text-green-800 tracking-tight font-headline">ReCycleX</h1>
          <p className="font-headline font-medium tracking-wide uppercase text-[10px] text-slate-500 mt-1">Eco-Tech Portal</p>
        </div>

        <nav className="flex-grow space-y-1">
          <a href="#dashboard" className="flex items-center gap-3 px-4 py-3 mx-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all active:scale-95">
            <span className="text-lg">📊</span>
            <span className="font-headline font-medium tracking-wide uppercase text-xs">Dashboard</span>
          </a>
          <a href="#upload" className="flex items-center gap-3 px-4 py-3 mx-2 bg-white text-green-700 shadow-sm rounded-lg transition-all active:scale-95">
            <span className="text-lg">☁️</span>
            <span className="font-headline font-medium tracking-wide uppercase text-xs">Upload</span>
          </a>
          <a href="#sales" className="flex items-center gap-3 px-4 py-3 mx-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all active:scale-95">
            <span className="text-lg">💰</span>
            <span className="font-headline font-medium tracking-wide uppercase text-xs">Sales</span>
          </a>
          <a href="#settings" className="flex items-center gap-3 px-4 py-3 mx-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all active:scale-95">
            <span className="text-lg">⚙️</span>
            <span className="font-headline font-medium tracking-wide uppercase text-xs">Settings</span>
          </a>
        </nav>

        <div 
          className="px-6 py-4 flex items-center gap-3 mt-auto relative"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high cursor-pointer hover:ring-2 hover:ring-green-700 transition-all">
            <img
              src={userProfile.profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold font-headline">{userProfile.name}</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{userProfile.role}</p>
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 z-50 py-2">
              <div className="px-4 py-3 border-b border-slate-200">
                <p className="text-sm font-bold text-slate-900">{userProfile.name}</p>
                <p className="text-xs text-slate-500">{userProfile.email}</p>
              </div>

              <button 
                onClick={() => setShowEditPicture(true)}
                className="w-full px-4 py-2 flex items-center gap-3 text-slate-700 hover:bg-slate-50 transition-all text-sm"
              >
                <Edit2 size={16} />
                <span>Edit Profile Picture</span>
              </button>

              <button 
                onClick={() => setShowEditUsername(true)}
                className="w-full px-4 py-2 flex items-center gap-3 text-slate-700 hover:bg-slate-50 transition-all text-sm"
              >
                <User size={16} />
                <span>Change Username</span>
              </button>

              <button 
                onClick={() => setShowEditEmail(true)}
                className="w-full px-4 py-2 flex items-center gap-3 text-slate-700 hover:bg-slate-50 transition-all text-sm"
              >
                <Mail size={16} />
                <span>Change Email</span>
              </button>

              <div className="border-t border-slate-200 mt-2 pt-2">
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-all text-sm"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-sm flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-8 flex-grow">
            <div className="relative w-full max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search marketplace records..."
                className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-green-700/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="bg-gradient-to-br from-green-700 to-green-600 text-white px-6 py-2 rounded-xl font-headline font-bold text-sm hover:scale-105 active:scale-95 transition-all">
              New Listing
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="sticky top-20 z-40 bg-white border-b border-slate-200 px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`px-4 py-4 font-bold text-sm uppercase tracking-widest transition-all border-b-2 ${
                activeSection === 'dashboard'
                  ? 'text-green-700 border-green-700'
                  : 'text-slate-500 border-transparent hover:text-slate-900'
              }`}
            >
              📊 My Listings
            </button>
            <button
              onClick={() => setActiveSection('detect')}
              className={`px-4 py-4 font-bold text-sm uppercase tracking-widest transition-all border-b-2 ${
                activeSection === 'detect'
                  ? 'text-green-700 border-green-700'
                  : 'text-slate-500 border-transparent hover:text-slate-900'
              }`}
            >
              🤖 Detect & List
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8 space-y-12">
          {activeSection === 'detect' && (
            <ImageDetectionModule 
              userId={userProfile.name}
              onListingCreated={(listing) => {
                console.log('New listing created:', listing);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                setActiveSection('dashboard');
              }}
            />
          )}

          {activeSection === 'dashboard' && (
            <>
              {/* Success Message */}
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 text-lg">
                    ✓
                  </div>
                  <div>
                    <p className="font-headline font-bold text-green-900">Listing Created Successfully!</p>
                    <p className="text-sm text-green-700">Your waste has been added to pending listings and will be reviewed shortly.</p>
                  </div>
                </div>
              )}

              {/* Page Header */}
              <section className="relative">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-4xl font-black font-headline text-on-surface tracking-tight leading-none">Upload Waste</h2>
                <p className="text-slate-500 mt-2 font-medium">Turn your recycled materials into eco-revenue.</p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600 text-xl">
                    🌿
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total Impact</p>
                    <p className="text-xl font-black font-headline text-cyan-600">1.2 Tons CO₂</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Upload Form Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Inputs */}
            <div className="lg:col-span-7 bg-white rounded-xl p-8 shadow-sm space-y-6">
              <form onSubmit={handlePublish} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-headline text-xs font-bold uppercase tracking-wider text-slate-500">
                      Waste Type
                    </label>
                    <select
                      name="wasteType"
                      value={formData.wasteType}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-green-700/20 transition-all"
                    >
                      <option>High-Density Polyethylene (HDPE)</option>
                      <option>Aluminum Scrap</option>
                      <option>Cardboard & Fiber</option>
                      <option>Glass Cullet</option>
                      <option>Mixed Metals</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-headline text-xs font-bold uppercase tracking-wider text-slate-500">
                      Quantity (kg)
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="0.00"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-green-700/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-headline text-xs font-bold uppercase tracking-wider text-slate-500">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    placeholder="Describe the purity and condition of the material..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-green-700/20 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-headline text-xs font-bold uppercase tracking-wider text-slate-500">
                      Pickup Location
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">📍</span>
                      <input
                        type="text"
                        name="location"
                        placeholder="Warehouse Alpha, Sector 4"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-green-700/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-headline text-xs font-bold uppercase tracking-wider text-slate-500">
                      Asking Price (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">💰</span>
                      <input
                        type="number"
                        name="price"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-green-700/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-700 to-green-600 text-white py-4 rounded-xl font-headline font-extrabold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Publish Listing
                  </button>
                </div>
              </form>
            </div>

            {/* Drag & Drop Area */}
            <div className="lg:col-span-5 h-full">
              <label
                onDrop={handleDragDrop}
                onDragOver={(e) => e.preventDefault()}
                className="h-full border-2 border-dashed border-slate-300 rounded-xl bg-surface-container-low flex flex-col items-center justify-center p-12 text-center group hover:bg-white hover:border-green-700/40 transition-all cursor-pointer"
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="w-20 h-20 rounded-full bg-green-700/5 flex items-center justify-center text-green-700 mb-6 group-hover:scale-110 transition-transform text-4xl">
                  📷
                </div>
                <h3 className="font-headline font-bold text-xl mb-2">Drag and Drop Images</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto">
                  Upload high-resolution photos of the material for faster verification. Supports JPG, PNG (Max 10MB).
                </p>
                {uploadedImages.length > 0 && (
                  <div className="mt-4 text-sm font-bold text-green-700">
                    ✓ {uploadedImages.length} image(s) uploaded
                  </div>
                )}
              </label>
            </div>
          </section>

          {/* Listed Waste Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black font-headline text-on-surface">My Listed Waste</h3>
              <button className="text-green-700 font-bold flex items-center gap-2 hover:underline">
                View All Listings <ChevronRight size={16} />
              </button>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white/60 backdrop-blur-md shadow-sm rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-white"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={listing.image}
                      alt={listing.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute top-4 left-4 ${getStatusColor(listing.status)} backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black font-headline uppercase`}>
                      {listing.status}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-lg leading-tight">{listing.name}</h4>
                      <span className="text-green-700 font-black font-headline">${listing.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                        <span>⚖️</span>
                        {listing.quantity} kg
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                        <span>📍</span>
                        {listing.location}
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`w-[${listing.interest}%] h-full bg-gradient-to-r ${getInterestColor(listing.interest)} rounded-full`} style={{ width: `${listing.interest}%` }}></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Interest Level</span>
                        <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-tighter">
                          {listing.interest}% {listing.interest >= 50 ? 'High' : listing.interest >= 30 ? 'Moderate' : 'Low'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
            </>
          )}
        </div>

        {/* Footer */}
        {activeSection === 'dashboard' && (
          <footer className="mt-auto w-full py-12 px-8 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-green-800 font-headline">ReCycleX</span>
              <span className="text-sm text-slate-400 font-body">© 2024. The Crystalline Ecosystem.</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="font-inter text-sm text-slate-500 hover:text-green-500 transition-all hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="font-inter text-sm text-slate-500 hover:text-green-500 transition-all hover:underline">
                Terms of Service
              </a>
              <a href="#" className="font-inter text-sm text-slate-500 hover:text-green-500 transition-all hover:underline">
                Contact Us
              </a>
            </div>
          </footer>
        )}

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
                  <img src={userProfile.profileImage} alt="current" className="w-full h-full object-cover" />
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
                  <p className="text-slate-600 font-medium">{userProfile.name}</p>
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
                  <p className="text-slate-600 font-medium">{userProfile.email}</p>
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
      </main>
    </div>
  );
}
