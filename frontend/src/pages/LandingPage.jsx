import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Globe, Receipt, Mic, FileCheck, CheckCircle, TrendingUp } from 'lucide-react';
import heroImage from '../assets/hero-bg.png';
import workflowImage from '../assets/workflow-bg.png';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-slate-50">
      
      <style>
        {`
          @keyframes kenburns-out-right {
            0% { transform: scale(1.1) translate(-1%, 0); }
            50% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(-1%, 0); }
          }
          @keyframes kenburns-out-top {
            0% { transform: scale(1.1) translate(0, -1%); }
            50% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(0, -1%); }
          }
          .animate-kenburns-hero {
            animation: kenburns-out-right 25s ease-in-out infinite;
            will-change: transform;
          }
          .animate-kenburns-workflow {
            animation: kenburns-out-top 30s ease-in-out infinite;
            will-change: transform;
          }
        `}
      </style>

      {/* Public Navbar */}
      <header className="fixed top-0 w-full bg-white/30 backdrop-blur-md z-50 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold text-[#0B132B] tracking-tight">Helix<span className="text-blue-600">Lite</span></span>
          </div>
          
          <nav className="hidden md:flex gap-8 font-medium text-sm text-gray-900">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-blue-600 transition">Features</a>
            <button onClick={() => navigate('/app/submit')} className="hover:text-blue-600 transition">Submit Claim</button>
            <button onClick={() => navigate('/app/review')} className="hover:text-blue-600 transition">Review Queue</button>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-blue-600 transition">About Us</a>
          </nav>

          <div className="flex gap-4 items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden md:block text-sm font-semibold text-gray-900">
                  Hi, {user.name}
                </span>
                <button onClick={() => navigate('/app')} className="bg-blue-600 text-white px-4 md:px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md flex items-center gap-2">
                  <span className="hidden md:inline">Go to Dashboard</span>
                  <span className="md:hidden">App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={openAuthModal} className="bg-blue-600 text-white px-4 md:px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md">
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* SECTION 1: Dynamic Image Hero */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden flex items-center min-h-[85vh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Premium executive corporate workspace" 
            className="w-full h-full object-cover animate-kenburns-hero origin-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0B132B]/90 md:from-[#0B132B] via-[#0B132B]/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-10 md:mt-0">
          <div className="max-w-2xl text-white text-center md:text-left">
            {/* Added responsive text sizing here */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Take <span className="text-blue-400">control</span> of your business spend.
            </h1>
            <p className="text-lg md:text-xl text-blue-50 mb-8 font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
              Automate claims, enforce policy, and unlock real-time insights all from one powerful platform designed for global teams.
            </p>
            {/* Full width button on mobile */}
            <button onClick={() => navigate('/app/submit')} className="w-full md:w-auto justify-center bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition flex items-center gap-2 shadow-lg">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: White Features Section */}
      <section id="features" className="py-20 md:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to scale</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">Experience the exact tools we built to remove friction for employees and empower your finance teams.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-8">
            
            <div className="group rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="h-48 md:h-56 overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop" alt="Employee using mobile phone" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col relative bg-white">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center absolute -top-6 md:-top-7 shadow-lg border-4 border-white">
                  <Mic className="w-5 h-5 md:w-6 md:h-6"/>
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4 text-gray-900">AI Voice & Text Capture</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  No more manual data entry. Simply speak or type your expense details naturally. Our Gemini AI engine instantly extracts the date, exact amount, and correctly categorizes your spend.
                </p>
              </div>
            </div>

            <div className="group rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="h-48 md:h-56 overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop" alt="Manager reviewing data" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col relative bg-white">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center absolute -top-6 md:-top-7 shadow-lg border-4 border-white">
                  <FileCheck className="w-5 h-5 md:w-6 md:h-6"/>
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4 text-gray-900">Smart Review Queue</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Managers get a clean, organized data table displaying all pending claims. Review details, track status, and instantly approve or reject claims with a single click to update the database.
                </p>
              </div>
            </div>

            <div className="group rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="h-48 md:h-56 overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" alt="Financial analytics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col relative bg-white">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center absolute -top-6 md:-top-7 shadow-lg border-4 border-white">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6"/>
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4 text-gray-900">Real-Time Dashboard</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Total visibility into your company's finances. Your dashboard pulls live data to visualize total spend, pending actions, and expense distribution across categories using beautiful interactive charts.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Workflow */}
      <section className="relative py-20 md:py-32 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={workflowImage} 
            alt="Modern high-fidelity corporate collaboration" 
            className="w-full h-full object-cover animate-kenburns-workflow origin-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/80 to-[#0B132B]/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 md:mb-12">How Helix Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-white">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-600/20 border border-blue-400 flex items-center justify-center mb-4 md:mb-6 backdrop-blur-sm">
                <Mic className="w-6 h-6 md:w-8 md:h-8 text-blue-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2">1. Voice Capture</h3>
              <p className="text-blue-100 text-sm md:text-base px-4">Simply tell the app what you spent. We do the data entry.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-600/20 border border-blue-400 flex items-center justify-center mb-4 md:mb-6 backdrop-blur-sm">
                <FileCheck className="w-6 h-6 md:w-8 md:h-8 text-blue-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2">2. Smart Review</h3>
              <p className="text-blue-100 text-sm md:text-base px-4">Managers review claims in a clean, organized queue.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-600/20 border border-blue-400 flex items-center justify-center mb-4 md:mb-6 backdrop-blur-sm">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-blue-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2">3. Fast Reimbursement</h3>
              <p className="text-blue-100 text-sm md:text-base px-4">Approved claims are instantly readied for payout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: About Us Section */}
      <section id="about" className="py-20 md:py-32 bg-slate-50 scroll-mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-200 blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            
            <div className="text-center md:text-left">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs md:text-sm mb-4 md:mb-6 uppercase tracking-wider">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight">
                Making expense management <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">invisible.</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                We believe employees should spend their time doing their actual jobs, not chasing down lost receipts or fighting with clunky legacy software.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                By leveraging AI-driven data capture and seamless approval workflows, HelixLite gives your team their time back while providing finance departments with bulletproof compliance and real-time visibility.
              </p>
            </div>

            <div className="relative mt-8 md:mt-0">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
                  alt="Finance team collaborating" 
                  className="w-full h-[350px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Adjusted positioning and padding for mobile metrics */}
                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-md p-3 md:p-5 rounded-xl md:rounded-2xl shadow-xl border border-white/50">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg md:rounded-xl flex items-center justify-center text-blue-600">
                      <Zap className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black text-gray-900">98%</h4>
                      <p className="text-xs md:text-sm text-gray-600 font-bold tracking-wide uppercase">Faster Approvals</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-white/50">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg md:rounded-xl flex items-center justify-center text-green-600">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> 
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-gray-900">0</h4>
                      <p className="text-[10px] md:text-xs text-gray-600 font-bold tracking-wide uppercase whitespace-nowrap">Lost Receipts</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl transform translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 -z-10 opacity-20"></div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B132B] text-slate-400 py-12 md:py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Receipt className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white tracking-tight">HelixLite</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">Intelligent reimbursement and review workflow built for the future of work.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => navigate('/app/submit')} className="hover:text-blue-400 transition">Submit Claim</button></li>
              <li><button onClick={() => navigate('/app/review')} className="hover:text-blue-400 transition">Review Queue</button></li>
              <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-blue-400 transition">Features</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}