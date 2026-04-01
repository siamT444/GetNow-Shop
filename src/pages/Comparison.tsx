import { Star, Check, X, ExternalLink } from 'lucide-react';
import { PRODUCTS } from '../constants';

export default function Comparison() {
  const techProducts = PRODUCTS.filter(p => p.category === 'Tech Gadgets' || p.category === 'Smart Accessories');

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Product Comparisons</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            We put the top contenders head-to-head to help you decide which one is worth your hard-earned money.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="p-8 font-black uppercase tracking-widest text-xs">Feature</th>
                  {techProducts.map(p => (
                    <th key={p.id} className="p-8 min-w-[250px]">
                      <div className="flex flex-col items-center text-center">
                        <img src={p.image} alt={p.name} className="h-24 w-24 object-cover rounded-xl mb-4 border-2 border-white/20" />
                        <span className="text-sm font-bold leading-tight">{p.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-8 font-bold text-gray-900 bg-gray-50">Price</td>
                  {techProducts.map(p => (
                    <td key={p.id} className="p-8 text-center font-black text-xl">{p.price}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-8 font-bold text-gray-900 bg-gray-50">Rating</td>
                  {techProducts.map(p => (
                    <td key={p.id} className="p-8 text-center">
                      <div className="flex items-center justify-center text-yellow-400">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="ml-2 font-black text-gray-900">{p.rating}/5</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-8 font-bold text-gray-900 bg-gray-50">Key Benefit</td>
                  {techProducts.map(p => (
                    <td key={p.id} className="p-8 text-center text-sm text-gray-600 leading-relaxed">{p.benefit}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-8 font-bold text-gray-900 bg-gray-50">Top Pro</td>
                  {techProducts.map(p => (
                    <td key={p.id} className="p-8 text-center">
                      <div className="inline-flex items-center text-green-600 font-bold text-xs">
                        <Check className="h-4 w-4 mr-1" />
                        {p.pros[0]}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-8 font-bold text-gray-900 bg-gray-50">Top Con</td>
                  {techProducts.map(p => (
                    <td key={p.id} className="p-8 text-center">
                      <div className="inline-flex items-center text-red-600 font-bold text-xs">
                        <X className="h-4 w-4 mr-1" />
                        {p.cons[0]}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-8 font-bold text-gray-900 bg-gray-50">Action</td>
                  {techProducts.map(p => (
                    <td key={p.id} className="p-8 text-center">
                      <a 
                        href={p.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-black rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                      >
                        Buy Now <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
