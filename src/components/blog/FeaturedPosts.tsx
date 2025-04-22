import React from 'react';
import BlogCard from './BlogCard';
import { Post } from '../../types/post';

interface FeaturedPostsProps {
  posts: Post[];
  loading?: boolean;
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts, loading = false }) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!posts.length) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.objectId} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;