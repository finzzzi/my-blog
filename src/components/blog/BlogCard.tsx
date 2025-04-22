import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../../types/post';

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <div className="relative h-80 w-full">
          <Image
            src={post.featuredImage || '/images/placeholder.jpg'}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-600 rounded-full mb-3">
            {post.categoryName}
          </span>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          <p className="mb-3 line-clamp-2 text-gray-200">
            {post.excerpt}
          </p>
          <p className="text-sm text-gray-300">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.featuredImage || '/images/placeholder.jpg'}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      </Link>
      <div className="p-5">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-3">
          {post.categoryName}
        </span>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {formatDate(post.createdAt)}
          </span>
          <Link 
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;