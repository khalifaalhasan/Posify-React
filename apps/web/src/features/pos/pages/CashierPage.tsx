import { useState } from 'react';
import { ShoppingCart, LogOut, Search, Settings, Receipt } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { ProductCard } from '../components/ProductCard';
import { CartItem } from '../components/CartItem';
import { CategoryFilter } from '../components/CategoryFilter';
import type { Product, CartItem as CartItemType } from '../types';

// Dummy Data
const DUMMY_CATEGORIES = ['All', 'Coffee', 'Tea', 'Pastries', 'Snacks', 'Merchandise'];
const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: 'Espresso', price: 3.50, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '2', name: 'Cappuccino', price: 4.50, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '3', name: 'Matcha Latte', price: 5.00, category: 'Tea', imageUrl: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '4', name: 'Croissant', price: 3.00, category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '5', name: 'Blueberry Muffin', price: 3.50, category: 'Pastries', imageUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '6', name: 'Iced Americano', price: 4.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '7', name: 'Earl Grey', price: 3.00, category: 'Tea', imageUrl: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '8', name: 'Chocolate Chip Cookie', price: 2.50, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=200&h=200' },
];

export function CashierPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { items, total, addItem, clearCart } = useCartStore();

  const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      
      {/* Left Sidebar - Navigation (Optional compact nav) */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 hidden md:flex">
        <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl mb-8 shadow-sm">
          BP
        </div>
        <nav className="flex-1 flex flex-col gap-4">
          <button className="p-3 text-primary bg-blue-50 rounded-xl relative">
            <ShoppingCart size={24} />
          </button>
          <button className="p-3 text-gray-400 hover:text-gray-600 rounded-xl transition-colors">
            <Receipt size={24} />
          </button>
          <button className="p-3 text-gray-400 hover:text-gray-600 rounded-xl transition-colors">
            <Settings size={24} />
          </button>
        </nav>
        <button className="p-3 text-gray-400 hover:text-red-500 rounded-xl transition-colors mt-auto">
          <LogOut size={24} />
        </button>
      </div>

      {/* Main Content Area (70%) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-800">New Order</h1>
            <p className="text-sm text-gray-400">Cashier: Admin</p>
          </div>
          
          <div className="relative w-72 hidden sm:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block pl-10 p-2.5 transition-colors placeholder:text-gray-400 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Scrollable Products Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <CategoryFilter
              categories={DUMMY_CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20 md:pb-0">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addItem}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400">
               <Search size={48} className="mb-4 opacity-20" />
               <p className="text-lg font-medium">No products found</p>
               <p className="text-sm text-gray-500 text-center max-w-sm mt-1">Try adjusting your category filter or search terms to find what you're looking for.</p>
             </div>
          )}
        </div>
      </main>

      {/* Right Sidebar - Cart (30%) */}
      <aside className="w-full md:w-96 bg-white border-l border-gray-200 shadow-sm flex flex-col h-full transform transition-transform duration-300 md:relative absolute right-0 z-20 md:translate-x-0 translate-x-full">
        {/* Cart Header */}
        <div className="p-6 border-b border-gray-100 flex-shrink-0 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800 flex items-center justify-between">
            Current Order
            <span className="bg-primary text-white text-xs py-1 px-2.5 rounded-full font-medium">
              {items.reduce((acc: number, item: CartItemType) => acc + item.quantity, 0)} items
            </span>
          </h2>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50/20">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-50">
              <ShoppingCart size={48} strokeWidth={1.5} />
              <p className="text-sm font-medium">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-1">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary & Checkout */}
        <div className="p-6 bg-white border-t border-gray-100 flex-shrink-0">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Tax (10%)</span>
              <span className="font-medium text-gray-900">${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="pt-3 flex justify-between items-center border-t border-gray-100 border-dashed">
              <span className="text-base font-medium text-gray-800">Total</span>
              <span className="text-2xl font-bold text-primary">
                ${(total * 1.1).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={clearCart}
              disabled={items.length === 0}
              className="py-3 px-4 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-transparent hover:border-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Cart
            </button>
            <button
              disabled={items.length === 0}
              className="py-3 px-4 rounded-xl text-sm font-bold bg-primary text-white shadow-md shadow-blue-500/20 hover:bg-primary-dark transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay Now
            </button>
          </div>
        </div>
      </aside>

    </div>
  );
}
