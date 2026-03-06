import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../types';
import { useCartStore } from '../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;

  const handleIncrement = () => updateQuantity(product.id, quantity + 1);
  const handleDecrement = () => updateQuantity(product.id, quantity - 1);
  const handleRemove = () => removeItem(product.id);

  return (
    <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:border-gray-200 group">
      <div className="flex-1 min-w-0 pr-3">
        <h4 className="text-sm font-semibold text-gray-800 truncate">
          {product.name}
        </h4>
        <div className="text-xs text-gray-500 mt-0.5">${product.price.toFixed(2)}</div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-1 bg-gray-50 rounded-md border border-gray-200">
          <button
            onClick={handleDecrement}
            className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-200 rounded-l-md transition-colors"
            aria-label="Decrease quantity"
          >
            {quantity === 1 ? <Trash2 size={14} className="text-red-500" /> : <Minus size={14} />}
          </button>
          
          <span className="w-8 text-center text-sm font-medium tabular-nums">
            {quantity}
          </span>
          
          <button
            onClick={handleIncrement}
            className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-200 rounded-r-md transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Line Total & Remove */}
        <div className="flex flex-col items-end gap-1 w-16 text-right">
          <span className="font-semibold text-sm text-gray-900">
            ${(product.price * quantity).toFixed(2)}
          </span>
          <button 
             onClick={handleRemove}
             className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
             aria-label="Remove item completely"
          >
             <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
