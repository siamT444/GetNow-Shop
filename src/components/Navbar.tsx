import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

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
            <Link to="/blog" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">Guides</Link>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 w-64"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
          <Link to="/deals" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500">Best Deals</Link>
          <Link to="/blog" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500">Guides</Link>
        </div>
      </div>
    </nav>
  );
}
