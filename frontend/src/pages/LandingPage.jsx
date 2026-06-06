import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Globe, Receipt, Mic, FileCheck, CheckCircle, TrendingUp } from 'lucide-react';
import heroImage from '../assets/hero-bg.png';
import workflowImage from '../assets/workflow-bg.png';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  // Add this smooth scroll function
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-slate-50">
      
      {/* 
        Custom CSS for the smooth "Ken Burns" dynamic background animation.
        This gives it that premium ExpenseMe feel without needing external libraries.
      */}
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

      {/* Public Navbar - Transparent Glass Effect & Reduced Height */}
      <header className="fixed top-0 w-full bg-white/30 backdrop-blur-md z-50 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Shrunk the logo padding and icon slightly to match the slimmer bar */}
            <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0B132B] tracking-tight">Helix<span className="text-blue-600">Lite</span></span>
          </div>
          
          {/* Darkened text slightly to ensure it stays readable over the transparency */}
          <nav className="hidden md:flex gap-8 font-medium text-sm text-gray-900">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-blue-600 transition">Features</a>
            <button onClick={() => navigate('/app/submit')} className="hover:text-blue-600 transition">Submit Claim</button>
            <button onClick={() => navigate('/app/review')} className="hover:text-blue-600 transition">Review Queue</button>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-blue-600 transition">About Us</a>
          </nav>

          <div className="flex gap-4 items-center">
            {user ? (
              <div className="flex items-center gap-4">
                {/* Clean greeting text */}
                <span className="hidden md:block text-sm font-semibold text-gray-900">
                  Hi, {user.name}
                </span>
                {/* Standard, professional Dashboard button */}
                <button onClick={() => navigate('/app')} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md flex items-center gap-2">
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={openAuthModal} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md">
                Sign in / Log in
              </button>
            )}
          </div>
        </div>
      </header>

      {/* SECTION 1: Dynamic Image Hero */}
      {/* Reduced padding because the sticky navbar now handles the spacing naturally */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden flex items-center min-h-[85vh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Premium executive corporate workspace" 
            className="w-full h-full object-cover animate-kenburns-hero origin-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Take <span className="text-blue-400">control</span> of your business spend.
            </h1>
            <p className="text-xl text-blue-50 mb-8 font-medium leading-relaxed max-w-lg">
              Automate claims, enforce policy, and unlock real-time insights all from one powerful platform designed for global teams.
            </p>
            <button onClick={() => navigate('/app/submit')} className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition flex items-center gap-2 shadow-lg">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: White Features Section (100% Real Functionality) */}
      <section id="features" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to scale</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Experience the exact tools we built to remove friction for employees and empower your finance teams.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1: AI Capture */}
            <div className="group rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="h-56 overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop" 
                  alt="Employee using mobile phone" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col relative bg-white">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center absolute -top-7 shadow-lg border-4 border-white">
                  <Mic className="w-6 h-6"/>
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4 text-gray-900">AI Voice & Text Capture</h3>
                <p className="text-gray-600 leading-relaxed">
                  No more manual data entry. Simply speak or type your expense details naturally. Our Gemini AI engine instantly extracts the date, exact amount, and correctly categorizes your spend.
                </p>
              </div>
            </div>

            {/* Card 2: Review Queue */}
            <div className="group rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="h-56 overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop" 
                  alt="Manager reviewing data on laptop" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col relative bg-white">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center absolute -top-7 shadow-lg border-4 border-white">
                  <FileCheck className="w-6 h-6"/>
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4 text-gray-900">Smart Review Queue</h3>
                <p className="text-gray-600 leading-relaxed">
                  Managers get a clean, organized data table displaying all pending claims. Review details, track status, and instantly approve or reject claims with a single click to update the database.
                </p>
              </div>
            </div>

            {/* Card 3: Real-Time Dashboard */}
            <div className="group rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="h-56 overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" 
                  alt="Financial analytics and charts" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col relative bg-white">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center absolute -top-7 shadow-lg border-4 border-white">
                  <TrendingUp className="w-6 h-6"/>
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4 text-gray-900">Real-Time Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">
                  Total visibility into your company's finances. Your dashboard pulls live data to visualize total spend, pending actions, and expense distribution across categories using beautiful interactive charts.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Dynamic Image Section (Workflow / App Preview) */}
      <section className="relative py-32 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Using the local workflowImage variable */}
          <img 
            src={workflowImage} 
            alt="Modern high-fidelity corporate collaboration" 
            className="w-full h-full object-cover animate-kenburns-workflow origin-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/70 to-[#0B132B]/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">How Helix Works</h2>
          <div className="grid md:grid-cols-3 gap-12 text-white">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-400 flex items-center justify-center mb-6 backdrop-blur-sm">
                <Mic className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">1. Voice Capture</h3>
              <p className="text-blue-100">Simply tell the app what you spent. We do the data entry.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-400 flex items-center justify-center mb-6 backdrop-blur-sm">
                <FileCheck className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">2. Smart Review</h3>
              <p className="text-blue-100">Managers review claims in a clean, organized queue.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-400 flex items-center justify-center mb-6 backdrop-blur-sm">
                <CheckCircle className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">3. Fast Reimbursement</h3>
              <p className="text-blue-100">Approved claims are instantly readied for payout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: White About Us Section */}
      <section id="about" className="py-32 bg-slate-50 scroll-mt-20 relative overflow-hidden">
        {/* Subtle glowing background orb */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-200 blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Mission Statement with Gradient Text */}
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold text-sm mb-6 uppercase tracking-wider">
                Our Mission
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Making expense management <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">invisible.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe employees should spend their time doing their actual jobs, not chasing down lost receipts or fighting with clunky legacy software.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By leveraging AI-driven data capture and seamless approval workflows, HelixLite gives your team their time back while providing finance departments with bulletproof compliance and real-time visibility.
              </p>
            </div>

            {/* Right Column: Premium Image with Floating Metrics */}
            <div className="relative">
              
              <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
                  alt="Finance team collaborating" 
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Glassmorphism Metric 1 */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-gray-900">98%</h4>
                      <p className="text-sm text-gray-600 font-bold tracking-wide uppercase">Faster Approvals</p>
                    </div>
                  </div>
                </div>

                {/* Floating Glassmorphism Metric 2 */}
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                      <CheckCircle className="w-5 h-5" /> 
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-900">0</h4>
                      <p className="text-xs text-gray-600 font-bold tracking-wide uppercase whitespace-nowrap">Lost Receipts</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative shadow layer behind the image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl transform translate-x-6 translate-y-6 -z-10 opacity-20"></div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B132B] text-slate-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Receipt className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white tracking-tight">HelixLite</span>
            </div>
            <p className="text-sm leading-relaxed">Intelligent reimbursement and review workflow built for the future of work.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => navigate('/app/submit')} className="hover:text-blue-400 transition">Submit Claim</button></li>
              <li><button onClick={() => navigate('/app/review')} className="hover:text-blue-400 transition">Review Queue</button></li>
              {/* Updated Features link with smooth scroll */}
              <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-blue-400 transition">Features</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              {/* Updated About Us link with smooth scroll */}
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