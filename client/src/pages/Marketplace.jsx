import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Search, RotateCcw } from 'lucide-react';

export default function Marketplace() {
  const navigate = useNavigate();
  const [selectedPurity, setSelectedPurity] = useState('A+ Industrial');

  const products = [
    {
      id: 1,
      name: 'Clear Industrial Flakes',
      category: 'Premium HDPE',
      price: 450,
      location: 'Rotterdam Hub, NL',
      seller: 'Eco-Cycle Global',
      seller_code: 'EC',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8uqOdVZP-8qKEEVc4ySc_MySBpjZDa85vvaibnTVHO7pOdzkhjN46QdOHb-iva97-MA4IRjWs0bgnl_-hzsjEKAEy_8eu9N3MT6eP6HR7TIvx6-qd-FS6NwdsiWi2M2_ur3VcwrxXq9j0rZ1NaWwMjXWBRq9ItdhFpxOw_5-NUKhst7Qw-BUcAMuKsMnpyCiDRMtcRBc-tSBerFw8bSo8tJqLn1dPiZjvAiEt_bR-TrlKvLEa0FrSttXMrcwRgyZ_4sjL1DvhJgNh',
      color: 'tertiary',
    },
    {
      id: 2,
      name: 'Compressed Cardboard',
      category: 'OCC Bales',
      price: 120,
      location: 'Newark Port, USA',
      seller: 'Blue Paper Ltd.',
      seller_code: 'BP',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP5-vt8QlkaS41opaGrPVYysk7caxmMoEhhx-m9Y0MnD8VmtkA4-NOf_TXEy9GMkOVebkqSX0UJm3aaFE0yJF-l8a3r3SBuL6NkREPhRLYab3VYlZOTNJAutHR7qq-fyB-VIs05tQoBs_XRdpWiUOG-6wSgcVoTahc1ewOgLttowrFOAllBh63KJ8A7lVq5gT0d-U2muRtfWWdDEln53SJ5DQGYE5y4UWt-lIkhYJ2FstaaMkXXufPWtzMyD-P-4GJfjoT5fXwnEnC',
      color: 'primary',
    },
    {
      id: 3,
      name: 'Grade A Logic Boards',
      category: 'Mixed E-Waste',
      price: 1250,
      location: 'Shenzhen Tech, CN',
      seller: 'Silicon Recovery',
      seller_code: 'SR',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWvHbtDqGG4AGxn1nQpj7HEzi7OwrzHAowYVr41J7DTKnluH-t4td5yxsTbWdfK7Dwdu6tRkX6dDEgRXCuudw4adoJLemI63pOaOTJqtPFydwYa78rrzSnr6VCIPG4UIOJdVcwRgyZ_4sjL1DvhJgNh',
      color: 'secondary',
    },
    {
      id: 4,
      name: 'Extrusion Aluminum Scraps',
      category: '6063 Aluminum',
      price: 1800,
      location: 'Hamburg Port, DE',
      seller: 'Metals Alliance',
      seller_code: 'MA',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcBzo792EVAw7TK3XcJH8xmbGwWm9h4HaqEUdRI8MISy9hH7ivs6mFB-9kuhhv-SIyYj26M4uCBhRO6hVE-RZed3Ce-Owa7n5c8a2T8nZt0YeohjeaiXhJS6CMUqkoHBYmlPn5VNLhnJ3lxG8ALzfvAxUa9T7xJ-c_oR-lt21ssWFzIlUPqnpHFgFqAUmv7ao41FmRqu2W_dX4uTC9FcSvPDm2AeBiN6SdIjTDo7c47O1P1xIQW_oQnMU4urBQU5htv7RKFnn6RM1v',
      color: 'tertiary',
    },
    {
      id: 5,
      name: 'Clear Flint Glass Cullet',
      category: 'Cullet Glass',
      price: 85,
      location: 'Venice Depot, IT',
      seller: 'Vetro Green',
      seller_code: 'VG',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd-DtLZGFiYO0i3dAzPDv-TwIlU3T1H8vKddspItShic_mnnhdvvdw0-g7iobmanEV2t_LbYn9g67_04HW9ExSfdGkljziSR2kIkFmLC_eJaASmkHiiPGKB_TwhJP1-fM-Wl1qfvPc8LP-6kYppFbI3dsfY2P-dULctIB7kPmvkEFs5VNaTfOjVXCwByW2FpHmf9PscCvlEUrXIrM-PSa3zU60IeFKzzDtE9aDQuGlm7nN7Ho9o56E3khWQrM1MICJdlulE_hjPbr-',
      color: 'primary',
    },
    {
      id: 6,
      name: 'SBR Rubber Granules',
      category: 'Rubber Crumbs',
      price: 310,
      location: 'Lyon Industrial, FR',
      seller: 'ReTire Systems',
      seller_code: 'RT',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7w2kRJhk7fYjVI4TBtrVqwCf8SkkLnO1aYR3Re4hIQlv11L4aOTH3dxBXmLp-FSerVBN4ssXK4UEWpyZFD2KT3U8UK-6k9losMA11GGDIaRHsQhLNk5DiZ2IJgBBk_NKcrdxKA1nCfUEct-kobVgZQwyUCUTtWkrpaFY7h0VzOQQLHo-JySfROkAxQ7yfDQ6NIDVvAR0hx89qzI4llFH9FszvEFICnLZG43cTL5DdQdNrJQban5m6y4VjOwmXaOGp0Bm96gPVQ4m2',
      color: 'secondary',
    },
  ];

  const categories = [
    { icon: '🔄', name: 'Recycled Plastic' },
    { icon: '⚙️', name: 'Ferrous Metals' },
    { icon: '📄', name: 'Paper & Fiber' },
    { icon: '🔋', name: 'E-Waste Components' },
  ];

  const getSellerColor = (color) => {
    const colors = {
      tertiary: 'bg-cyan-200/30 text-cyan-700',
      primary: 'bg-green-200/30 text-green-700',
      secondary: 'bg-blue-200/30 text-blue-700',
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="light bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-stone-50/60 backdrop-blur-md shadow-sm flex justify-between items-center px-6 md:px-8 py-4">
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-black text-green-800 tracking-tight cursor-pointer hover:text-green-700 transition-colors"
        >
          ReCycleX
        </button>
        <div className="hidden md:flex items-center gap-8 font-bold tracking-tight text-sm">
          <button onClick={() => navigate('/')} className="text-stone-600 hover:text-green-700 transition-all">Home</button>
          <button onClick={() => navigate('/marketplace')} className="text-green-700 hover:text-green-600 transition-all">Marketplace</button>
          <button onClick={() => navigate('/about')} className="text-stone-600 hover:text-green-700 transition-all">About</button>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="bg-gradient-to-br from-green-700 to-green-600 text-white px-6 py-2 rounded-xl font-bold active:scale-95 transition-transform"
        >
          Login
        </button>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-headline uppercase tracking-[0.2em] text-xs font-bold text-green-700 mb-2 block">
              The Crystalline Marketplace
            </span>
            <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Circular Resources. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-cyan-500">
                Premium Quality.
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-low p-1.5 rounded-xl self-start md:self-end">
            <button className="bg-white text-green-700 font-bold px-4 py-2 rounded-lg shadow-sm">Grid</button>
            <button className="text-slate-500 font-medium px-4 py-2 hover:bg-white/50 rounded-lg transition-all">List</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
          {/* Filters Sidebar */}
          <aside className="space-y-10">
            <div className="space-y-6">
              <h3 className="font-headline text-xs font-bold uppercase tracking-wider text-slate-400">Filter By Category</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <label key={cat.name} className="flex items-center justify-between group cursor-pointer p-3 rounded-xl hover:bg-green-700/5 transition-colors">
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-on-surface font-medium">{cat.name}</span>
                    </span>
                    <input
                      type="checkbox"
                      className="rounded-full border-outline-variant text-green-700 focus:ring-green-700 w-5 h-5"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-headline text-xs font-bold uppercase tracking-wider text-slate-400">Price Range (per Ton)</h3>
              <div className="px-2">
                <input
                  type="range"
                  className="w-full h-2 bg-surface-container rounded-full appearance-none cursor-pointer accent-green-700"
                  defaultValue="50"
                />
                <div className="flex justify-between mt-4 text-sm font-headline font-bold text-slate-600">
                  <span>$100</span>
                  <span>$5,000+</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-headline text-xs font-bold uppercase tracking-wider text-slate-400">Purity Grade</h3>
              <div className="flex flex-wrap gap-2">
                {['A+ Industrial', 'B Mix', 'Unprocessed'].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedPurity(grade)}
                    className={`px-4 py-2 font-bold rounded-full text-xs transition-all ${
                      selectedPurity === grade
                        ? 'bg-green-700 text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-green-700 hover:text-white'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-outline-variant/15">
              <button className="w-full bg-white py-4 rounded-xl font-headline font-bold text-on-surface-variant flex items-center justify-center gap-2 hover:bg-slate-50 shadow-sm transition-all border border-outline-variant/10">
                <RotateCcw size={16} />
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Grid Content */}
          <section className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-green-700 shadow-sm">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-green-700 text-white font-headline font-bold px-4 py-1.5 rounded-full text-sm shadow-lg">
                      ${product.price}/Ton
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="font-headline text-xl font-bold text-on-surface group-hover:text-green-700 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-slate-400 mt-1">
                        <span>📍</span>
                        <span className="text-xs font-medium">{product.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${getSellerColor(product.color)} flex items-center justify-center font-bold text-xs`}>
                          {product.seller_code}
                        </div>
                        <span className="text-sm font-semibold text-slate-600">{product.seller}</span>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-green-700 hover:bg-green-700 hover:text-white transition-all">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-4 pt-12">
              <button className="w-12 h-12 rounded-full border border-outline-variant/20 flex items-center justify-center text-slate-400 hover:text-green-700 hover:border-green-700 transition-all">
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center bg-surface-container-low rounded-full px-2 py-1.5">
                <button className="w-10 h-10 rounded-full bg-green-700 text-white font-headline font-bold shadow-md shadow-green-700/20">
                  1
                </button>
                <button className="w-10 h-10 rounded-full text-on-surface font-headline font-bold hover:bg-white transition-all">2</button>
                <button className="w-10 h-10 rounded-full text-on-surface font-headline font-bold hover:bg-white transition-all">3</button>
                <span className="px-2 text-slate-400">...</span>
                <button className="w-10 h-10 rounded-full text-on-surface font-headline font-bold hover:bg-white transition-all">12</button>
              </div>
              <button className="w-12 h-12 rounded-full border border-outline-variant/20 flex items-center justify-center text-slate-400 hover:text-green-700 hover:border-green-700 transition-all">
                <ChevronRight size={20} />
              </button>
            </nav>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 mt-12">
        <div className="space-y-4 text-center md:text-left">
          <div className="text-lg font-bold text-green-800 font-headline">ReCycleX</div>
          <p className="font-inter text-sm text-slate-500 max-w-xs">
            © 2024 ReCycleX. The Crystalline Ecosystem. Empowering circular commerce through technology.
          </p>
        </div>
        <div className="flex gap-8 font-inter text-sm text-slate-400">
          <a href="#" className="hover:text-green-500 transition-all">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-green-500 transition-all">
            Terms of Service
          </a>
          <a href="#" className="hover:text-green-500 transition-all">
            Contact Us
          </a>
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-slate-500 hover:text-green-700 transition-all">
            🌐
          </button>
          <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-slate-500 hover:text-green-700 transition-all">
            📤
          </button>
        </div>
      </footer>
    </div>
  );
}
