import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User as UserIcon, LogOut, Shield, LogIn } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User, db, doc, getDoc, setDoc } from '../firebase';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check/Create user doc
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          const newUser = {
            uid: currentUser.uid,
            email: currentUser.email,
            role: currentUser.email === "mdsiamsadik22@gmail.com" ? 'admin' : 'user'
          };
          await setDoc(userRef, newUser);
          if (newUser.role === 'admin') setIsAdmin(true);
        } else {
          if (userSnap.data().role === 'admin') setIsAdmin(true);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold tracking-tighter text-gray-900">
                GetNow<span className="text-orange-500">Store</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">Home</Link>
            <Link to="/categories" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">Categories</Link>
            <Link to="/comparison" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">Comparisons</Link>
            <Link to="/deals" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">Best Deals</Link>
            
            <div className="flex items-center space-x-4 border-l border-gray-100 pl-8">
              {user ? (
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <Link to="/admin" className="p-2 text-gray-500 hover:text-orange-500 transition-colors" title="Admin Dashboard">
                      <Shield className="h-5 w-5" />
                    </Link>
                  )}
                  <div className="flex items-center space-x-2">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || ''} className="h-8 w-8 rounded-full border border-gray-200" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                      </div>
                    )}
                    <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors">
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-all flex items-center"
                >
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {user ? (
              <img src={user.photoURL || ''} alt="" className="h-8 w-8 rounded-full border border-gray-200" />
            ) : (
              <Link to="/login" className="p-2 text-gray-500"><UserIcon className="h-6 w-6" /></Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("md:hidden bg-white border-b border-gray-100", isOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500">Home</Link>
          <Link to="/categories" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500">Categories</Link>
          <Link to="/comparison" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500">Comparisons</Link>
          <Link to="/deals" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500">Best Deals</Link>
          {user && (
            <>
              {isAdmin && <Link to="/admin" className="block px-3 py-2 text-base font-medium text-orange-500">Admin Dashboard</Link>}
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-500">Sign Out</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
