import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-bold tracking-tighter text-white">
                GetNow<span className="text-orange-500">Store</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted authority for honest product reviews, comparisons, and the best deals on the web. We help you shop smarter.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/categories" className="hover:text-orange-500 transition-colors">Categories</Link></li>
              <li><Link to="/deals" className="hover:text-orange-500 transition-colors">Best Deals</Link></li>
              <li><Link to="/blog" className="hover:text-orange-500 transition-colors">Buying Guides</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-orange-500 transition-colors">Affiliate Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 hover:text-white transition-all"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 hover:text-white transition-all"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 hover:text-white transition-all"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 hover:text-white transition-all"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-xs text-gray-500 max-w-3xl mx-auto mb-4">
            As an Amazon Associate, we earn from qualifying purchases. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
          </p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} GetNow Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
