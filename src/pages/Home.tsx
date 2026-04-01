import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, TrendingUp, Clock, Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';
import { db, collection, onSnapshot } from '../firebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import * as Icons from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(prods);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const trendingProducts = products.filter(p => p.isTrending);
  const dealProducts = products.filter(p => p.isDeal);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-bold mb-8"
            >
              <Zap className="h-4 w-4 mr-2" />
              Trusted by 500,000+ Smart Shoppers
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6 leading-[1.1]"
            >
              Shop Smarter. <br />
              <span className="text-orange-500">Buy Better.</span> Get Now.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              We test, review, and compare thousands of products so you don't have to. Get the best deals and honest insights on the products that matter.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link to="/deals" className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:scale-105 transition-all flex items-center justify-center">
                View Today's Deals <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/categories" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-100 hover:border-orange-500 transition-all flex items-center justify-center">
                Browse Categories
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Explore Top Categories</h2>
            <p className="text-gray-500">Hand-picked selections from every niche</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = (Icons as any)[cat.icon];
              return (
                <Link 
                  key={cat.id} 
                  to={`/category/${cat.slug}`}
                  className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-xl hover:border-orange-500 transition-all group"
                >
                  <div className="p-4 bg-orange-50 rounded-2xl text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="font-bold text-gray-900">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                Hot Right Now
              </div>
              <h2 className="text-4xl font-black text-gray-900">Trending Products</h2>
            </div>
            <Link to="/trending" className="hidden md:flex items-center text-orange-500 font-bold hover:underline">
              View All Trending <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Deals Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-black mb-6">
                <Clock className="h-3 w-3 mr-2" />
                LIMITED TIME OFFERS
              </div>
              <h2 className="text-5xl font-black mb-6 leading-tight">Don't Miss Out on <br /><span className="text-orange-500">Today's Best Deals</span></h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Our algorithm scans Amazon every hour to find the biggest price drops on high-rated items. Save up to 60% on tech, home, and lifestyle essentials.
              </p>
              <Link to="/deals" className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all">
                Shop All Deals <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {dealProducts.slice(0, 2).map(product => (
                <ProductCard key={product.id} product={product} variant="horizontal" />
              ))}
            </div>
          </div>
        </div>
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/10 skew-x-12 translate-x-1/4" />
      </section>

      {/* Comparison Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Top 3 Noise Canceling Headphones</h2>
            <p className="text-gray-500">We compared the giants so you can choose the winner.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-6 px-4 text-left font-black text-gray-900">Product</th>
                  <th className="py-6 px-4 text-center font-black text-gray-900">Rating</th>
                  <th className="py-6 px-4 text-center font-black text-gray-900">Best For</th>
                  <th className="py-6 px-4 text-center font-black text-gray-900">Price</th>
                  <th className="py-6 px-4 text-right font-black text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Sony WH-1000XM5', rating: 4.9, best: 'Overall Quality', price: '$348', url: '#' },
                  { name: 'Bose QuietComfort Ultra', rating: 4.8, best: 'Noise Cancellation', price: '$429', url: '#' },
                  { name: 'Apple AirPods Max', rating: 4.6, best: 'Apple Ecosystem', price: '$499', url: '#' },
                ].map((item, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-4 font-bold text-gray-900">{item.name}</td>
                    <td className="py-6 px-4 text-center">
                      <div className="flex items-center justify-center text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 font-bold text-gray-900">{item.rating}</span>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">{item.best}</span>
                    </td>
                    <td className="py-6 px-4 text-center font-bold text-gray-900">{item.price}</td>
                    <td className="py-6 px-4 text-right">
                      <a href={item.url} className="inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600">
                        View on Amazon
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-orange-500 mb-6">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Unbiased Reviews</h3>
              <p className="text-gray-500 leading-relaxed">We don't accept free products. We buy everything we test to ensure our reviews are 100% honest and objective.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-orange-500 mb-6">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Testing</h3>
              <p className="text-gray-500 leading-relaxed">Our team of specialists spends hundreds of hours testing products in real-world scenarios before making a recommendation.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-orange-500 mb-6">
                <TrendingUp className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data-Driven Picks</h3>
              <p className="text-gray-500 leading-relaxed">We analyze thousands of user reviews and technical specs to find the absolute best value for your money.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-24 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Get the Best Deals <br />Before They're Gone.</h2>
              <p className="text-lg text-gray-600 mb-10">Join 50,000+ subscribers who get our weekly "Insider Picks" and exclusive discount alerts directly in their inbox.</p>
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
                  required
                />
                <button className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all">
                  Join Free
                </button>
              </form>
              <p className="mt-4 text-xs text-gray-400">No spam, ever. Unsubscribe with one click.</p>
            </div>
            {/* Decorative icon */}
            <Icons.Mail className="absolute -bottom-10 -right-10 h-64 w-64 text-orange-500/5 -rotate-12" />
          </div>
        </div>
      </section>
    </div>
  );
}
