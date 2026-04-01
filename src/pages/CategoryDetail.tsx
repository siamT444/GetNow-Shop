import { useParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';

export default function CategoryDetail() {
  const { slug } = useParams();
  const category = CATEGORIES.find(c => c.slug === slug);
  const products = PRODUCTS.filter(p => p.category === category?.name);

  if (!category) return null;

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
