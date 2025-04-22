import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import BlogCard from '../../components/blog/BlogCard';
import CategoryList from '../../components/blog/CategoryList';
import SearchBar from '../../components/ui/SearchBar';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { useCategories } from '../../hooks/useCategories';
import { Post } from '../../types/post';

const BlogPage: NextPage = () => {
  const { posts, loading: postsLoading } = useBlogPosts();
  const { categories, loading: categoriesLoading } = useCategories();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (posts.length) {
      const filtered = posts.filter((post) => {
        if (!searchQuery) return true;
        
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.categoryName.toLowerCase().includes(query)
        );
      });
      
      setFilteredPosts(filtered);
    }
  }, [posts, searchQuery]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <Layout>
      <Head>
        <title>Blog Posts | My Blog</title>
        <meta name="description" content="Browse all our blog posts about technology, design, and more." />
      </Head>
      
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
          <p className="text-xl">Browse all our articles and discover something new</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <CategoryList 
              categories={categories} 
              loading={categoriesLoading} 
            />
          </div>
          
          <div className="md:col-span-3">
            {postsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.objectId} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
                <p className="text-gray-600">
                  {searchQuery ? `No posts matching "${searchQuery}"` : 'No posts available.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;