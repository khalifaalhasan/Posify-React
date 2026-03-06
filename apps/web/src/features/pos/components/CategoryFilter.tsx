import { cn } from '../../../lib/utils';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex w-full items-center space-x-2 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border",
              isActive
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary-light hover:text-primary hover:bg-blue-50"
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
