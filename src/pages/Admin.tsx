import React, { useState, useEffect } from 'react';
import { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, User, handleFirestoreError, OperationType } from '../firebase';
import { Plus, Edit2, Trash2, LogOut, LogIn, Shield, Package, LayoutDashboard, ExternalLink, Save, X } from 'lucide-react';
import { Product } from '../types';
import { cn } from '../lib/utils';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if user is admin (based on email for now, or a user doc)
        const adminEmail = "mdsiamsadik22@gmail.com";
        if (user.email === adminEmail) {
          setIsAdmin(true);
        } else {
          // Check firestore for role
          const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', user.uid)));
          if (!userDoc.empty && userDoc.docs[0].data().role === 'admin') {
            setIsAdmin(true);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
        const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(prods);
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      if (editingProduct.id) {
        const { id, ...data } = editingProduct;
        await updateDoc(doc(db, 'products', id), data);
      } else {
        await addDoc(collection(db, 'products'), editingProduct);
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'products');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
      }
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md w-full">
          <Shield className="h-16 w-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-gray-900 mb-4">Admin Access</h1>
          <p className="text-gray-500 mb-8">Please sign in with an authorized account to manage the GetNow Store.</p>
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center"
          >
            <LogIn className="mr-2 h-5 w-5" /> Sign In with Google
          </button>
          {!isAdmin && user && (
            <p className="mt-4 text-red-500 text-sm font-medium">You do not have admin privileges.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 flex items-center">
              <LayoutDashboard className="mr-4 h-10 w-10 text-orange-500" />
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-2">Manage your products, deals, and affiliate links.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => { setEditingProduct({}); setIsFormOpen(true); }}
              className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all flex items-center shadow-lg shadow-orange-500/20"
            >
              <Plus className="mr-2 h-5 w-5" /> Add New Product
            </button>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all flex items-center"
            >
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-6 font-bold text-gray-900">Product</th>
                  <th className="p-6 font-bold text-gray-900">Category</th>
                  <th className="p-6 font-bold text-gray-900">Price</th>
                  <th className="p-6 font-bold text-gray-900">Status</th>
                  <th className="p-6 font-bold text-gray-900 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center space-x-4">
                        <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-400 truncate max-w-xs">{p.amazonUrl}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">{p.category}</span>
                    </td>
                    <td className="p-6 font-bold text-gray-900">{p.price}</td>
                    <td className="p-6">
                      <div className="flex flex-wrap gap-2">
                        {p.isTrending && <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-black uppercase rounded">Trending</span>}
                        {p.isDeal && <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-black uppercase rounded">Deal</span>}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => { setEditingProduct(p); setIsFormOpen(true); }}
                          className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-black text-gray-900">
                {editingProduct?.id ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={editingProduct?.name || ''} 
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                    placeholder="e.g. Sony WH-1000XM5"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">Category</label>
                  <select 
                    required
                    value={editingProduct?.category || ''} 
                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Tech Gadgets">Tech Gadgets</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Smart Accessories">Smart Accessories</option>
                    <option value="Trending TikTok">Trending TikTok</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">Price</label>
                  <input 
                    required
                    type="text" 
                    value={editingProduct?.price || ''} 
                    onChange={e => setEditingProduct({...editingProduct, price: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                    placeholder="e.g. $348.00"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">Amazon Affiliate URL</label>
                  <input 
                    required
                    type="url" 
                    value={editingProduct?.amazonUrl || ''} 
                    onChange={e => setEditingProduct({...editingProduct, amazonUrl: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                    placeholder="https://amazon.com/..."
                  />
                </div>
                <div className="space-y-4 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700">Image URL</label>
                  <input 
                    required
                    type="url" 
                    value={editingProduct?.image || ''} 
                    onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div className="space-y-4 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700">Short Benefit</label>
                  <input 
                    type="text" 
                    value={editingProduct?.benefit || ''} 
                    onChange={e => setEditingProduct({...editingProduct, benefit: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                    placeholder="e.g. Industry-leading noise cancellation"
                  />
                </div>
                <div className="space-y-4 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700">Detailed Description</label>
                  <textarea 
                    required
                    rows={4}
                    value={editingProduct?.description || ''} 
                    onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                    placeholder="Write a detailed review..."
                  />
                </div>
                <div className="flex items-center space-x-8 md:col-span-2 p-6 bg-gray-50 rounded-2xl">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={editingProduct?.isTrending || false} 
                      onChange={e => setEditingProduct({...editingProduct, isTrending: e.target.checked})}
                      className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <span className="font-bold text-gray-700">Trending</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={editingProduct?.isDeal || false} 
                      onChange={e => setEditingProduct({...editingProduct, isDeal: e.target.checked})}
                      className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <span className="font-bold text-gray-700">Best Deal</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all flex items-center"
                >
                  <Save className="mr-2 h-5 w-5" /> Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
