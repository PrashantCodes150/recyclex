import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function BuyerDashboard() {
  const [userProfile, setUserProfile] = useState({
    name: 'User',
    role: 'Buyer',
    email: 'user@recyclex.com',
  });

  useEffect(() => {
    // Read user profile from localStorage
    const storedUser = localStorage.getItem('recyclex_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserProfile({
          name: userData.name || 'User',
          role: userData.role === 'seller' ? 'Seller' : 'Buyer',
          email: userData.email,
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const availableListing = [
    {
      id: 1,
      category: 'PET',
      name: 'High-Purity PET Flakes',
      weight: '120kg',
      price: '$1.24/kg',
      seller: 'GreenTech Solutions',
      certification: 'ISO 14001',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=500&fit=crop',
    },
    {
      id: 2,
      category: 'ALU',
      name: 'Aluminum Scrap',
      weight: '45kg',
      price: '$2.80/kg',
      seller: 'EcoRecycle Inc',
      certification: 'CE Certified',
      image: 'https://images.unsplash.com/photo-1546869865-a67e9e028e7a?w=500&h=500&fit=crop',
    },
    {
      id: 3,
      category: 'GLS',
      name: 'Clear Glass',
      weight: '300kg',
      price: '$0.45/kg',
      seller: 'Urban Recyclers',
      certification: 'FDA Approved',
      image: 'https://images.unsplash.com/photo-1581577543787-b54dd0d7eed1?w=500&h=500&fit=crop',
    },
  ];

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 min-h-screen flex-1 flex flex-col bg-surface">
        <Header 
          title="Buyer Marketplace"
          subtitle="Browse and purchase premium recycled materials"
        />

        <main className="p-10">
          {/* Search & Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search materials..."
              className="flex-1 px-6 py-3 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
            />
            <select className="px-6 py-3 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all">
              <option>All Categories</option>
              <option>Plastic (PET)</option>
              <option>Aluminum (ALU)</option>
              <option>Glass (GLS)</option>
              <option>Paper</option>
              <option>Metal</option>
            </select>
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-between">
              <div>
                <p className="font-bold text-green-900">{cartItems.length} items in cart</p>
                <p className="text-sm text-green-700">Total: ${(cartItems.length * 42.80).toFixed(2)}</p>
              </div>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all">
                Checkout
              </button>
            </div>
          )}

          {/* Available Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableListing.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-stone-200">
                {/* Image */}
                <div className="relative aspect-video bg-stone-300 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {item.category}
                  </div>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                      favorites.includes(item.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-red-500 hover:bg-white'
                    }`}
                  >
                    <Star size={18} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-on-surface mb-2">{item.name}</h3>
                  
                  {/* Seller Info */}
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-stone-200">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">
                      {item.seller.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">{item.seller}</p>
                      <p className="text-xs font-bold text-green-600">{item.certification}</p>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Weight:</span>
                      <span className="font-bold text-on-surface">{item.weight}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Unit Price:</span>
                      <span className="font-bold text-green-600 text-lg">{item.price}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 py-3 bg-gradient-to-br from-green-700 to-green-600 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                    <button className="px-4 py-3 bg-stone-100 text-on-surface font-bold rounded-xl hover:bg-stone-200 transition-all">
                      📋
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Total Purchased</p>
              <p className="text-3xl font-black text-green-700 mb-2">$45,280</p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-bold">
                <TrendingUp size={16} /> +12% this month
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Materials Sourced</p>
              <p className="text-3xl font-black text-blue-600 mb-2">847 kg</p>
              <p className="text-sm text-on-surface-variant">From 24 verified sellers</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Cost Saved</p>
              <p className="text-3xl font-black text-orange-600 mb-2">$12,450</p>
              <p className="text-sm text-on-surface-variant">vs. virgin materials</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-stone-200 flex flex-col md:flex-row justify-between items-center px-10 py-6 gap-4 bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">♻️</span>
            <span className="font-bold text-green-900">ReCycleX</span>
          </div>
          <p className="text-sm text-stone-500">© 2024 ReCycleX Eco-Tech Editorial. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-stone-500 hover:text-green-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-stone-500 hover:text-green-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-stone-500 hover:text-green-600 transition-colors">Sustainability Report</a>
            <a href="#" className="text-sm text-stone-500 hover:text-green-600 transition-colors">Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
