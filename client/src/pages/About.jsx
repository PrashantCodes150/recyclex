import React from 'react';
import { ArrowRight, CheckCircle, Globe, Zap, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-stone-50/60 backdrop-blur-md shadow-sm">
        <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
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

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[500px] flex items-center px-6 md:px-12 overflow-hidden bg-surface-container-low pt-20">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-15 grayscale brightness-110"
              alt="crystalline green glass structures"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD154v0qdgzRwij9ZwOetgxqZB-Otxqw_c9UkHSNM03x_NKqLbv5cfEiI_BjnfcZHBxRhDjBYdso3kcQi-cOGL5wmpEz7shXDxnx3KkglMDrJHUgOrqlBHbOWbOQSRL7gDTGqKGAPJU9fHeztqMjDaZkA7YX0iiEm7dxCCaGU2kJYIm35iCcC5xWBC4b6GiIQAp5XY10Db-qat97Ah7VwjLkZ_1XCIiBtFZ_I9b9XQjr_XTa2IXXOUa1flZ7fpNBAB1mkEIcrdLuWSr"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-4xl">
            <span className="text-xs uppercase tracking-widest text-green-700 font-bold mb-4 block">About ReCycleX</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-8 leading-tight">
              Transforming Waste into <span className="text-green-700">Opportunity</span>
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mb-8 font-medium leading-relaxed">
              We're building a circular economy where industrial waste becomes a valuable commodity through AI-powered detection, smart logistics, and verified marketplaces.
            </p>
            <button
              onClick={() => navigate('/#impact')}
              className="inline-flex items-center gap-2 bg-gradient-to-br from-green-700 to-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              Explore Impact <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-on-surface">
                  Our Mission
                </h2>
                <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
                  We believe waste is not an end product—it's a design flaw in our current economy. At ReCycleX, we're leveraging cutting-edge AI, blockchain verification, and decentralized logistics to transform how industries handle by-products.
                </p>
                <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                  Our vision is a world where every kilogram of waste is tracked, valued, and converted into new manufacturing cycles—creating economic incentives for sustainability.
                </p>
                <div className="space-y-4">
                  {['AI-Driven Classification', 'Real-time Pricing', 'Instant Payouts', 'Carbon Credits'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="text-green-700 flex-shrink-0" size={24} />
                      <span className="text-lg font-semibold text-on-surface">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  className="w-full rounded-3xl shadow-2xl"
                  alt="AI Detection demonstration"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQO4HtP_gqW8OPkp9vTwQakSNkCaYrXYJDY6x1tWRdFZeMzDdHr58rWRZHvRngs8cRvsDFhEd6katc5XymjyP1yLSR2glIb4uvFf6_SgPVh_XV_X_hpZhMmmEZoPxLOo1Wb1BWTHrjFoOTZklgFyfA6T_yL9fMvmZjgWxKOXjkBEQ5sAIA-2GonYO1rK8VLIBuiWMHb8veKGnT5FqAmyiJgTUIhS9mpoM0X1fZnrg3VQOzQ1xuzsrBKk5Q84RfotS6B-t14MyaFAB2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Platform */}
        <section className="py-24 px-6 md:px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-on-surface">
                How ReCycleX Works
              </h2>
              <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
                A three-step ecosystem designed for radical transparency and operational efficiency
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: '01',
                  title: 'AI Detection',
                  desc: 'Upload a photo of your industrial waste. Our neural network identifies polymer types and estimates purity levels instantly.',
                  icon: '🤖',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQO4HtP_gqW8OPkp9vTwQakSNkCaYrXYJDY6x1tWRdFZeMzDdHr58rWRZHvRngs8cRvsDFhEd6katc5XymjyP1yLSR2glIb4uvFf6_SgPVh_XV_X_hpZhMmmEZoPxLOo1Wb1BWTHrjFoOTZklgFyfA6T_yL9fMvmZjgWxKOXjkBEQ5sAIA-2GonYO1rK8VLIBuiWMHb8veKGnT5FqAmyiJgTUIhS9mpoM0X1fZnrg3VQOzQ1xuzsrBKk5Q84RfotS6B-t14MyaFAB2',
                },
                {
                  num: '02',
                  title: 'Smart Listing',
                  desc: 'Verified assets are listed on the global marketplace with automated logistics and documentation pre-cleared for transport.',
                  icon: '📦',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzehu63Tq4-MDb0pU05gFIXkBrq7vL0IRGLAjLdEROt6JgkYhDQFXs8w2jpKLhSOMz67ePSzIusF-3Vzkk5Rd5hKO8fCvh8U-NWCQVaCqj6x2qIt9NV2oFYMitVfJ-dDkZdqrWa2P-kbOgU0vOH1ygvIM02JupfkCAHX9EZW4vqzp4I8X20hn6Fh1O4sDzn6Ofb-ghJ-EKEu8juKV2KRNn1nf9_4EJQaYam3NuhnV4tFCMMvz406UQrksRGf1bDXXB8ZrXUTPyFW2l',
                },
                {
                  num: '03',
                  title: 'Impact Yield',
                  desc: 'Receive instant payouts and carbon credits. Track the journey of your material as it enters new manufacturing cycles.',
                  icon: '🌱',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjMmad0evHF_Zz_j3C-_ol5S2WhVQ6T9jO841HT71f-BCxFHVlYSvZKVkDjxB2UwWp2UV1MzH2gSPHef644LWsXyo4z49FIXCjFFZbuNqmMssyhRcYH1BwsOH3QAw8ELVXvzgtFrLfJOPd3vVohscznExq0E9UqI2UZjl1r1fmzB6fy5ZHN6CfU7RKNrVMJZUxLkne0Zz8xS4g-md1efVPxksTiKq83K3-sRRPMVKtx7AqEumVuAHdeLvV26LxQl_UGlj-yd9axtmv',
                },
              ].map((step, i) => (
                <div key={i} className="group">
                  <div className="relative h-64 rounded-3xl overflow-hidden mb-6 bg-stone-300">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={step.title}
                      src={step.img}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-green-700">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-on-surface">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Impact */}
        <section id="impact" className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-green-700/5 -skew-x-12 translate-x-1/4"></div>
          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-8">
                Beyond the<br />Bottom Line
              </h2>
              <p className="text-xl text-on-surface-variant mb-12 max-w-lg leading-relaxed">
                We don't just facilitate trades; we measure the real-world reduction in virgin material extraction and ocean plastic leakage.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <div className="text-5xl font-black text-green-700 mb-2">1.2M</div>
                  <div className="text-sm uppercase tracking-widest font-bold text-on-surface-variant">Metric Tons Diverted</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-blue-600 mb-2">840K</div>
                  <div className="text-sm uppercase tracking-widest font-bold text-on-surface-variant">Carbon Credits Issued</div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-green-200/30 shadow-xl">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-on-surface">
                <Globe size={24} className="text-green-700" /> Network Velocity
              </h3>
              <div className="space-y-8">
                {[
                  { label: 'Resource Liquidity', value: 92, color: 'from-blue-600 to-blue-400' },
                  { label: 'Eco-Verification', value: 100, color: 'from-cyan-600 to-cyan-400' },
                  { label: 'Logistics Hubs', value: 78, color: 'from-green-700 to-green-500' },
                ].map((metric, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-on-surface">{metric.label}</span>
                      <span className={`font-black text-lg bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                        {metric.value}%
                      </span>
                    </div>
                    <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Preview */}
        <section className="py-24 px-6 md:px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16 text-on-surface">
              Available Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Clear Cullet Glass',
                  price: '$420/t',
                  location: 'Rotterdam, NL',
                  grade: 'Grade A',
                  quantity: '25 Tons',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFMNzMsPEWPaU2dy9UXRPqQrLRCJlMRCX5533okywI8AGFYTvLWKAgppiAfUf85HK0_dxIu8dp9ZBb8aPi_acxdiHT5i-fo0mBuLuiAd8uCiVk3Ix3yxeTRMVryicEteoFDqFI2bk-7_DBQhfbyhg2eN3gToZSiG9HsJnN00tCoJJ2jc9Cc2k0vwZ6yVnvBZn-AUAnM99pcQB7nHCp6o-H4sDZjPJ6Qqyk43b7S2HPCA-yJPE7sajXA_JYQWZSBZqXAY_WBIALBmRP',
                },
                {
                  name: 'Mixed Poly-Flakes',
                  price: '$890/t',
                  location: 'Singapore',
                  grade: 'Electronic',
                  quantity: '12 Tons',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC46ubfsLvi2Qw1miE0_u5ylzmSA4NU9vNWIiBdGAWNo-P_zEnUa_j0vPUq_r_L9NpHIFfAP2bL1DAidhdn6zPK6EUTHNrEED4nvk94Qcyj2dFaz2EUnD7Zh0ROvwIX_2rBuuhz4Gy95bUt6g-EFvN_hPGPRPjc7mr6RoHTR5wF3Pz_NhVrcWyFaWF6JUKxAyUFacFaRVZan_BUA2zxqrI0E0_EETJ_2lmkbwaGhlXENV2BwCPvWOO8GkuC16x-IBq0McRUu4xC46mG',
                },
                {
                  name: 'Compressed Alum',
                  price: '$1,150/t',
                  location: 'Detroit, USA',
                  grade: 'Raw',
                  quantity: '40 Tons',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0szVwqxRWHF1pHcWzkZhsLr5WFDfCl6uSwT_4V2vqlegy3EMN1pYjJfffbi4v5JTuuKqsPp5XLyZSM3BCjorRxbopcQGKNLOhI7kXWKoOjtSHUmNAfrY6fwR7yYuMkMpLw9i49QwO5Xum_vjU8eRpYzlKLNN6M2vioBpBldHO4OVAeMkR3MvNQ100Lq1e8qvf7mAxSGsxwsnmGVAZXJaQaqOtQyrCMk9BPOdu8_Xwt4zonI0tqox8JIn1AR1P2T3vANsent2zb7rW',
                },
                {
                  name: 'Pulp Kraft Sheet',
                  price: '$310/t',
                  location: 'Stockholm, SE',
                  grade: 'Pre-Consumer',
                  quantity: '100 Tons',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDljbHQtjP2L5i7lbgP253BsF0QYMcpCMfh9Rq2ACKPqdoSE7lVewzXxwTfAJidkjUG6vI1ddZpulMZ6jLkpzYKbgojiRf1NcI8A8HxqLsGN-_UyGpoV8tLeQo_6u54WlUgTv2TVny6ctD0_yC9yTmwbpcn2iKwiNfjV4YDgcljRaQ6ZKkBaNMCxqlr8VdPN5y58CUsemT0cWERGFYNqGvQxyLgj2UOzLv9J7dXLc0-zP0mVftuKpQh-5FDnl3vRXlUkhU7FSxy_NUN',
                },
              ].map((product, i) => (
                <div key={i} className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
                    <img className="w-full h-full object-cover" alt={product.name} src={product.img} />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-green-700">
                      NEW
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg">{product.name}</h4>
                      <span className="text-green-700 font-black text-lg">{product.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-600">
                      📍 {product.location}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <span className="bg-stone-100 text-[10px] uppercase font-bold px-2 py-1 rounded">{product.grade}</span>
                      <span className="bg-stone-100 text-[10px] uppercase font-bold px-2 py-1 rounded">{product.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-on-surface">
              Backed by Mission
            </h2>
            <p className="text-xl text-on-surface-variant mb-16 max-w-3xl mx-auto leading-relaxed">
              ReCycleX was founded by engineers, sustainability advocates, and supply chain experts who believe the circular economy is inevitable—and profitable. We're building it on blockchain transparency, AI precision, and human accountability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Verified Sellers', value: '2,400+', icon: '✓' },
                { title: 'Material Categories', value: '28', icon: '📦' },
                { title: 'Active Transactions', value: '$1.2B+', icon: '💰' },
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl border border-green-200/30">
                  <div className="text-4xl font-black text-green-700 mb-2">{stat.value}</div>
                  <div className="text-lg font-bold text-on-surface">{stat.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 md:px-12 bg-surface-container-low">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl font-black tracking-tight mb-8 text-on-surface">
              Join the Circular System Today
            </h2>
            <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
              Whether you're a waste producer, material recycler, or manufacturer—there's a role for you in the ReCycleX ecosystem.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-br from-green-700 to-green-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-white text-green-700 px-10 py-4 rounded-xl font-bold border-2 border-green-700 hover:bg-green-50 active:scale-95 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-stone-50 border-t border-stone-200/15">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-12 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <div className="font-black text-green-900 text-xl">ReCycleX</div>
            <p className="text-sm text-stone-500 max-w-xs">© 2024 ReCycleX Eco-Tech Editorial. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="text-sm text-stone-500 hover:text-green-600 transition-all">Privacy Policy</a>
            <a href="#" className="text-sm text-stone-500 hover:text-green-600 transition-all">Terms of Service</a>
            <button onClick={() => navigate('/about')} className="text-sm text-stone-500 hover:text-green-600 transition-all">About</button>
            <a href="#" className="text-sm text-stone-500 hover:text-green-600 transition-all">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
