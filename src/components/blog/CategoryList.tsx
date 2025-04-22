import React from 'react';
import Link from 'next/link';
import { Category } from '../../types/category';

interface CategoryListProps {
  categories: Category[];
  loading?: boolean;
  activeCategory?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  loading = false, 
  activeCategory 
}) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 bg-gray-300 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  if (!categories.length) {
    return <p className="text-gray-500">No categories found</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
      <ul className="space-y-2">
        <li>
          <Link 
            href="/blog" 
            className={`block px-3 py-2 rounded ${
              !activeCategory ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Posts
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.objectId}>
            <Link 
              href={`/categories/${category.slug}`}
              className={`block px-3 py-2 rounded ${
                activeCategory === category.slug ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;