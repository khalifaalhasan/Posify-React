import { Plus } from 'lucide-react';
import type { Product } from '../types';
import { cn } from '../../../lib/utils'; // Assuming global alias or relative path

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onAdd, className }: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col bg-white rounded-xl border border-gray-100 p-3 shadow-sm transition-all hover:shadow-md hover:border-blue-100 cursor-pointer",
        className
      )}
      onClick={() => onAdd(product)}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50 mb-3">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <span className="text-xl font-medium">{product.name.charAt(0)}</span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-primary-dark active:scale-95"
          aria-label="Add to cart"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-medium text-gray-800 line-clamp-2 text-sm leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        </div>
        <div className="mt-2 font-semibold text-primary">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
