import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot, query, where, handleFirestoreError, OperationType } from '../firebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Clock } from 'lucide-react';

export default function Deals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), where('isDeal', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(prods);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products (deals)');
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-6">
            <Clock className="h-4 w-4 mr-2" />
            Updated Every Hour
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-6">Today's Best Amazon Deals</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            We track thousands of prices to bring you the absolute biggest discounts on high-quality products.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} variant="horizontal" />
          ))}
        </div>
      </div>
    </div>
  );
}
