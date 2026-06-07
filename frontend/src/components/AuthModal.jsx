import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, EyeOff, Eye } from 'lucide-react';

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // NEW: Handle Firebase errors
  
  const { loginWithEmail, registerWithEmail, loginWithGoogle, isAuthModalOpen, closeAuthModal } = useAuth();

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    
    try {
      if (isLogin) {
        // Run Firebase Login
        await loginWithEmail(email, password);
      } else {
        // Run Firebase Registration
        const extractedName = email.split('@')[0];
        const displayName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
        await registerWithEmail(email, password, institution || displayName);
      }
    } catch (err) {
      // Show Firebase error beautifully in the UI
      setError(err.message.replace('Firebase: ', '').replace(/\(auth.*\)\./, ''));
    }
  };

  // SVG Icons
  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  const FacebookIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );

  const LinkedinIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-[#0B132B]/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="max-w-[480px] w-full bg-white rounded-2xl shadow-2xl relative p-8 md:p-10">
        
        <button 
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isLogin ? 'Log in' : 'Create Account'}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {isLogin ? 'New user? ' : 'Already have an account? '}
          <button type="button" onClick={() => {setIsLogin(!isLogin); setError('');}} className="text-blue-600 font-medium hover:underline">
            {isLogin ? 'Register Now' : 'Log in'}
          </button>
        </p>

        {/* Display Firebase Errors here */}
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

        {isLogin ? (
          <>
            <button 
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-gray-700 mb-4"
            >
              <GoogleIcon /> Continue with Google
            </button>
            <div className="flex justify-center gap-4 mb-6">
              <button type="button" className="p-2 border border-gray-200 rounded-full text-blue-600 hover:bg-blue-50"><FacebookIcon /></button>
              <button type="button" className="p-2 border border-gray-200 rounded-full text-blue-700 hover:bg-blue-50"><LinkedinIcon /></button>
            </div>
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-xs text-gray-400">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-800 mb-1">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0e8a46] focus:border-[#0e8a46]" />
              </div>
              <div>
                <label className="block text-sm text-gray-800 mb-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0e8a46] focus:border-[#0e8a46]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 mb-6">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#0e8a46] focus:ring-[#0e8a46] border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-600">Remember Me</label>
                </div>
                <button type="button" className="text-sm font-medium text-blue-600 hover:underline">Forgot password</button>
              </div>
              <button type="submit" className="w-full bg-[#0e8a46] text-white py-3 rounded-md font-bold text-lg hover:bg-[#0c7a3d] transition-colors">Sign In</button>
            </form>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-800 mb-1">Full Name</label>
              <input type="text" required value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Enter Full name" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0e8a46] focus:border-[#0e8a46]" />
            </div>
            <div>
              <label className="block text-sm text-gray-800 mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0e8a46] focus:border-[#0e8a46]" />
            </div>
            <div>
              <label className="block text-sm text-gray-800 mb-1">Password (Min 6 characters)</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" minLength="6" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0e8a46] focus:border-[#0e8a46]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#0e8a46] text-white py-3 mt-4 rounded-md font-bold text-lg hover:bg-[#0c7a3d] transition-colors">Sign Up</button>
            
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-xs text-gray-400">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
            <button 
              type="button"
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-gray-700 mb-4"
            >
              <GoogleIcon /> Continue with Google
            </button>
          </form>
        )}
      </div>
    </div>
  );
}