import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Store, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('seller');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simple validation
      if (!formData.email || !formData.password) {
        alert('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (!isLogin && formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        setLoading(false);
        return;
      }

      // Simulate API call
      setTimeout(() => {
        console.log('Auth attempt:', {
          mode: isLogin ? 'Login' : 'Signup',
          role,
          email: formData.email,
        });

        // Store user data in localStorage
        localStorage.setItem('recyclex_user', JSON.stringify({
          email: formData.email,
          role,
          name: formData.name || formData.email.split('@')[0],
        }));

        setLoading(false);
        // Navigate immediately without alert to prevent blocking
        navigate('/dashboard');
      }, 800);
    } catch (error) {
      console.error('Auth error:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-surface-container-low flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background Organic Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-400/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-400/10 rounded-full blur-[120px] -z-10"></div>

      {/* Main Container */}
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 items-stretch bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] md:min-h-[700px]">
        
        {/* Left Side: Visual/Editorial Content */}
        <div className="hidden lg:flex flex-col justify-between p-12 relative bg-gradient-to-br from-green-700 to-green-800 overflow-hidden">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="dots" x="20" y="20" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="white" opacity="0.1" />
                </pattern>
              </defs>
              <rect width="400" height="600" fill="url(#dots)" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-white">ReCycleX</h1>
            </div>

            <h2 className="font-headline text-5xl font-bold text-white leading-tight mb-6">
              Turning waste into <br/>
              <span className="text-green-200">crystalline value.</span>
            </h2>

            <p className="text-white/85 text-lg max-w-md font-light leading-relaxed">
              Join the first AI-driven circular economy platform. Trace your impact, trade materials, and build a sustainable future.
            </p>
          </div>

          {/* Stats */}
          <div className="relative z-10 grid grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm">
              <div className="font-headline text-3xl font-bold text-white mb-1">45T+</div>
              <div className="text-xs uppercase tracking-widest text-white/70 font-medium">Materials Diverted</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm">
              <div className="font-headline text-3xl font-bold text-white mb-1">12K</div>
              <div className="text-xs uppercase tracking-widest text-white/70 font-medium">Active Partners</div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="flex flex-col p-8 md:p-16 bg-white overflow-y-auto relative">
          {/* Close Button Mobile */}
          <button
            onClick={() => navigate('/')}
            className="lg:hidden absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <ArrowLeft size={24} className="text-on-surface" />
          </button>

          {/* Toggle Header */}
          <div className="flex flex-col gap-8 mb-10 mt-8 lg:mt-0">
            <div className="flex items-center justify-between lg:justify-start mb-2">
              <div className="font-headline text-2xl font-bold tracking-tight text-on-surface">
                {isLogin ? 'Welcome Back' : 'Join ReCycleX'}
              </div>
            </div>

            {/* Toggle Tabs */}
            <div className="flex p-1 bg-surface-container-low rounded-xl max-w-xs">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  isLogin
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  !isLogin
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Signup
              </button>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-grow">
            
            {/* Role Selection */}
            <div className="flex flex-col gap-3">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">I am a</label>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Seller Option */}
                <label className="relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all group"
                  style={{
                    borderColor: role === 'seller' ? '#006a2b' : '#abadaf',
                    backgroundColor: role === 'seller' ? '#f0f9f5' : '#f5f7f9'
                  }}>
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={role === 'seller'}
                    onChange={(e) => setRole(e.target.value)}
                    className="hidden"
                  />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    role === 'seller' ? 'bg-green-600 text-white' : 'bg-surface-container-high text-on-surface-variant'
                  }`}>
                    <Store size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Seller</span>
                    <span className="text-[10px] text-on-surface-variant">Listing waste</span>
                  </div>
                </label>

                {/* Buyer Option */}
                <label className="relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all group"
                  style={{
                    borderColor: role === 'buyer' ? '#006a2b' : '#abadaf',
                    backgroundColor: role === 'buyer' ? '#f0f9f5' : '#f5f7f9'
                  }}>
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={role === 'buyer'}
                    onChange={(e) => setRole(e.target.value)}
                    className="hidden"
                  />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    role === 'buyer' ? 'bg-green-600 text-white' : 'bg-surface-container-high text-on-surface-variant'
                  }`}>
                    <ShoppingCart size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Buyer</span>
                    <span className="text-[10px] text-on-surface-variant">Sourcing tech</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Name Field (Signup Only) */}
            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all placeholder:text-outline"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all placeholder:text-outline"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Password</label>
                {isLogin && (
                  <a href="#" className="text-[11px] font-semibold text-green-700 hover:underline">Forgot?</a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all placeholder:text-outline"
                />
              </div>
            </div>

            {/* Confirm Password (Signup Only) */}
            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all placeholder:text-outline"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-br from-green-700 to-green-600 text-white font-headline font-bold text-lg rounded-xl shadow-lg shadow-green-600/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In to Portal' : 'Create Account'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-2">
                <div className="h-px flex-grow bg-outline-variant/20"></div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Social Login</span>
                <div className="h-px flex-grow bg-outline-variant/20"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-2 py-3 bg-surface border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-semibold">Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="flex items-center justify-center gap-2 py-3 bg-surface border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 13.5c-.91 0-1.82.55-2.25 1.74.5.5 1.23.81 1.96.81 1.66 0 3-1.34 3-3 0-.33-.08-.65-.19-.95-.5 1.04-1.6 1.4-2.52 1.4zm-.5-5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zM2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm15-1h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"/>
                  </svg>
                  <span className="text-sm font-semibold">Apple</span>
                </button>
              </div>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-auto pt-8 text-center">
            <p className="text-sm text-on-surface-variant">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-700 font-bold hover:underline"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
