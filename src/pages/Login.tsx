import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup, onAuthStateChanged } from '../firebase';
import { LogIn, ShoppingCart, ShieldCheck, Zap, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(from, { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, from]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Login failed", err);
      if (err.code === 'auth/popup-blocked') {
        setError("The sign-in popup was blocked by your browser. Please allow popups for this site.");
      } else if (err.code === 'auth/unauthorized-domain') {
        setError("This domain is not authorized in Firebase. Please add this domain to your Firebase Auth settings.");
      } else {
        setError(err.message || "An unexpected error occurred during sign-in.");
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

        <p className="mt-8 text-xs text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
      
      <Link to="/" className="mt-8 text-gray-500 font-medium flex items-center hover:text-orange-500 transition-colors">
        <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back to Home
      </Link>
    </div>
  );
}
