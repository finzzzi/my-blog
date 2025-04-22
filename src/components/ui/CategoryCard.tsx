import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '../../types/category';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link href={`/categories/${category.slug}`} className="block group">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white">
        <div className="relative h-40">
          {category.imageUrl ? (
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500" />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition">
            {category.name}
          </h3>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;