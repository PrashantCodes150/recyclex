import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Leaf, Microscope, Camera, TrendingUp, Truck, BarChart3, Link2, Trophy, Package } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const stats = [
    { value: '45T+', label: 'Waste Diverted', color: 'primary' },
    { value: '12K', label: 'Active Recyclers', color: 'tertiary' },
    { value: '98%', label: 'AI Accuracy', color: 'on-surface' },
  ];

  const marketplaceItems = [
    { id: 'PET', category: 'PET', weight: '120kg', item: 'Plastic Flakes', location: 'Offered by Boston MA', price: '$1.24/kg' },
    { id: 'ALU', category: 'ALU', weight: '45kg', item: 'Aluminum Scrap', location: 'Offered by Chicago IL', price: '$2.80/kg' },
    { id: 'GLS', category: 'GLS', weight: '300kg', item: 'Clear Glass', location: 'Offered by DenverState NYC', price: '$0.45/kg' },
  ];

  return (
    <div className="light bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container scroll-smooth">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-stone-50/60 backdrop-blur-md shadow-sm">
        <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-black tracking-tighter text-green-800 cursor-pointer hover:text-green-700"
          >
            ReCycleX
          </button>
          <div className="hidden md:flex items-center gap-8 font-bold tracking-tight text-sm">
            <button onClick={() => navigate('/')} className="text-stone-600 hover:text-green-700 transition-all">Home</button>
            <button onClick={() => navigate('/marketplace')} className="text-stone-600 hover:text-green-700 transition-all">Marketplace</button>
            <button onClick={() => navigate('/about')} className="text-stone-600 hover:text-green-700 transition-all">About</button>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-br from-green-700 to-green-600 text-white px-6 py-2 rounded-xl font-bold active:scale-95 transition-transform"
          >
            Login
          </button>
        </nav>
      </header>

      {/* Main Content with consistent spacing */}
      <main className="pt-24 bg-mesh">
        {/* Hero Section */}
        <section className="relative px-4 md:px-8 py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full mb-6">
                <Leaf size={16} className="text-green-700" />
                <span className="text-xs font-bold uppercase tracking-widest text-green-700">
                  The Future of Waste
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-on-surface mb-6 leading-tight">
                The Smarter Way{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-cyan-500">
                  to Recycle is Here
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                ReCycleX: AI-powered sorting for a cleaner, greener tomorrow. Scan, sort, and
                earn rewards with our advanced eco-tech.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12">
                <button 
                  onClick={() => navigate('/login')}
                  className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-br from-green-700 to-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 hover:scale-95 transition-transform"
                >
                  Sell Waste
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-6 md:px-8 py-3 md:py-4 bg-blue-100 text-blue-700 font-bold rounded-xl hover:scale-95 transition-transform"
                >
                  Buy Waste
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-2xl md:text-3xl font-black text-green-700">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-tighter text-slate-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Hero Image with AI Detection UI */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-200/20 blur-3xl rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-200/20 blur-3xl rounded-full"></div>

              <div className="relative glass-card rounded-3xl p-8 shadow-2xl bg-gradient-to-b from-gray-900 to-gray-800 border border-cyan-500/20">
                {/* AI Detection Interface Mockup */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-cyan-950 to-gray-900 h-96 border border-cyan-500/30 p-6 flex flex-col justify-between">
                  {/* Circular AI Visualization */}
                  <div className="flex justify-center items-center">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-pulse"></div>
                      <div className="absolute inset-2 rounded-full border-2 border-cyan-300/50"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-cyan-400 text-3xl font-black">A</div>
                    </div>
                  </div>
                  
                  {/* Status Info */}
                  <div className="space-y-3">
                    <div className="text-xs text-cyan-300 uppercase tracking-widest font-bold">Status Info</div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-green-400 w-3/4"></div>
                    </div>
                    <div className="text-xs text-gray-400">Analytics</div>
                  </div>
                </div>

                {/* Status Badge - Top Left */}
                <div className="absolute top-6 left-6 glass-card px-4 py-3 rounded-xl border border-cyan-400/40 bg-gray-800/60 flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Microscope size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-cyan-300 uppercase">Status</div>
                    <div className="text-sm font-bold text-cyan-400">AI Detection Active</div>
                  </div>
                </div>

                {/* Reward Badge - Bottom Right */}
                <div className="absolute bottom-6 right-6 glass-card px-6 py-4 rounded-2xl border border-cyan-400/40 bg-gray-200/90 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-700">Real-time Reward</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900">+$24.50 Earned</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 md:px-8 py-16 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-4">
                  How ReCycleX Revolutionizes Waste
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Our ecosystem leverages advanced neural networks and crystalline data visualization to make sustainability effortless for everyone.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <Camera className="text-green-700" size={24} />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Visual Recognition</h3>
                <p className="text-slate-600">AI instantly identifies materials with 98% accuracy.</p>
              </div>

              <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl p-6 md:p-8 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Credits</h3>
                <p className="text-white/90">Convert materials into rewards instantly.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Truck className="text-blue-700" size={24} />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Smart Logistics</h3>
                <p className="text-slate-600">Optimized routes minimize carbon footprint.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Section */}
        <section className="px-4 md:px-8 py-16 md:py-24 bg-gray-950 text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
              Ready to join the<br/><span className="text-green-400">Circular Economy?</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Active Marketplace</h3>
                {marketplaceItems.map((item) => (
                  <div key={item.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-green-500/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs font-bold rounded">
                            {item.category}
                          </span>
                          <span className="text-sm font-bold text-gray-300">{item.weight}</span>
                        </div>
                        <h4 className="font-bold text-white mb-1">{item.item}</h4>
                        <p className="text-xs text-gray-400">{item.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-green-400">{item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/20 rounded-lg p-12 text-center w-full">
                  <Package className="mx-auto mb-4 text-green-400" size={48} />
                  <p className="text-white font-bold mb-4">Ready to start recycling?</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Browse Marketplace
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-600">
          <p className="mb-4">© 2024 ReCycleX. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#privacy" className="hover:text-on-surface transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-on-surface transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-on-surface transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
