import { Link } from 'react-router-dom';
import { Star, ExternalLink, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'horizontal';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  if (variant === 'horizontal') {
    return (
      <div className="flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="sm:w-1/3 relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          {product.discount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}
            </div>
          )}
        </div>
        <div className="p-6 sm:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("h-4 w-4", i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200")} />
              ))}
              <span className="text-xs text-gray-500 ml-2">({product.reviewsCount.toLocaleString()} reviews)</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.benefit}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-2xl font-bold text-gray-900">{product.price}</div>
            <div className="flex space-x-2">
              <Link 
                to={`/product/${product.id}`}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              >
                Full Review <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a 
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors flex items-center"
              >
                Check Price <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {product.isDeal && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            BEST DEAL
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn("h-3 w-3", i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200")} />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">({product.reviewsCount.toLocaleString()})</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors flex-grow">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{product.benefit}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
          <span className="text-xl font-bold text-gray-900">{product.price}</span>
          <a 
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
