import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import * as Icons from 'lucide-react';

export default function Categories() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Browse by Category</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Find the best products in every niche, meticulously tested and reviewed by our experts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => {
            const Icon = (Icons as any)[cat.icon];
            return (
              <Link 
                key={cat.id} 
                to={`/category/${cat.slug}`}
                className="group relative overflow-hidden bg-gray-50 rounded-3xl p-10 hover:bg-orange-500 transition-all duration-500"
              >
                <div className="relative z-10">
                  <div className="p-4 bg-white rounded-2xl text-orange-500 mb-6 inline-block group-hover:scale-110 transition-transform">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 group-hover:text-white mb-4">{cat.name}</h3>
                  <p className="text-gray-500 group-hover:text-orange-100 mb-8">
                    Discover the top-rated {cat.name.toLowerCase()} products for {new Date().getFullYear()}.
                  </p>
                  <span className="inline-flex items-center font-bold text-orange-500 group-hover:text-white">
                    View Products <Icons.ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </div>
                {/* Decorative background icon */}
                <Icon className="absolute -bottom-10 -right-10 h-48 w-48 text-gray-200/50 group-hover:text-white/10 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
