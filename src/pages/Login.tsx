import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup, onAuthStateChanged } from '../firebase';
import { LogIn, ShoppingCart, ShieldCheck, Zap, ArrowRight, AlertCircle, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isIframe, setIsIframe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  useEffect(() => {
    setIsIframe(window.self !== window.top);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(from, { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, from]);

  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Attempting sign-in with popup...");
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Login Error Details:", err);
      if (err.code === 'auth/popup-blocked') {
        setError("The sign-in popup was blocked. Please allow popups or try opening the app in a new tab.");
      } else if (err.code === 'auth/unauthorized-domain') {
        setError(`Domain not authorized. Please add "${window.location.hostname}" to your Firebase Authorized Domains.`);
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError("Sign-in window was closed before completion.");
      } else {
        setError(`${err.code || 'Error'}: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 text-center max-w-md w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-orange-500" />
        
        <div className="flex items-center justify-center space-x-2 mb-8">
          <ShoppingCart className="h-10 w-10 text-orange-500" />
          <span className="text-3xl font-black tracking-tighter text-gray-900">
            GetNow<span className="text-orange-500">Store</span>
          </span>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-4">Welcome Back!</h1>
        <p className="text-gray-500 mb-10">Sign in to unlock exclusive deals, save your favorite products, and manage your account.</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-start text-left">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-6 mb-10">
          <div className="flex items-start space-x-4 text-left">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Early Access</h3>
              <p className="text-sm text-gray-500">Get notified about price drops before anyone else.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 text-left">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Trusted Recommendations</h3>
              <p className="text-sm text-gray-500">Save products that our experts have verified.</p>
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center shadow-lg shadow-gray-900/20 disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <LogIn className="mr-2 h-5 w-5" /> Sign In with Google
            </>
          )}
        </button>

        {isIframe && (
          <div className="mt-6">
            <p className="text-xs text-gray-400 mb-3">Having trouble signing in inside the preview?</p>
            <button 
              onClick={handleOpenNewTab}
              className="w-full py-3 bg-white text-orange-500 border border-orange-200 font-bold rounded-xl hover:bg-orange-50 transition-all flex items-center justify-center text-sm"
            >
              <ExternalLink className="mr-2 h-4 w-4" /> Open App in New Tab
            </button>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-gray-50 text-left">
          <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Debug Info</h4>
          <p className="text-[10px] text-gray-400 font-mono break-all">
            Domain: {window.location.hostname}
          </p>
        </div>
      </motion.div>
      
      <Link to="/" className="mt-8 text-gray-500 font-medium flex items-center hover:text-orange-500 transition-colors">
        <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back to Home
      </Link>
    </div>
  );
}
