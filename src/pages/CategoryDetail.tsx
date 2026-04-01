import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { db, collection, onSnapshot, query, where, handleFirestoreError, OperationType } from '../firebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function CategoryDetail() {
  const { slug } = useParams();
  const category = CATEGORIES.find(c => c.slug === slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    const q = query(collection(db, 'products'), where('category', '==', category.name));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(prods);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `products (category: ${category.name})`);
    });
    return () => unsubscribe();
  }, [category]);

  if (!category) return null;
  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">{category.name}</h1>
          <p className="text-gray-500">Showing {products.length} expert-recommended products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
