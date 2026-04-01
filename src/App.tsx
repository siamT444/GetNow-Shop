import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Deals from './pages/Deals';
import Comparison from './pages/Comparison';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryDetail />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/trending" element={<Home />} />
            <Route path="/blog" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/contact" element={<Home />} />
            <Route path="/privacy" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
