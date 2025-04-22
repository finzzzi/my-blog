import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import BlogCard from '../components/blog/BlogCard';
import CategoryCard from '../components/ui/CategoryCard';
import { useFeaturedPosts } from '../hooks/useBlogPosts';
import { useCategories } from '../hooks/useCategories';

const HomePage: NextPage = () => {
  const { featuredPosts, loading: postsLoading } = useFeaturedPosts();
  const { categories, loading: categoriesLoading } = useCategories();
  
  // Get popular categories (limit to 4)
  const popularCategories = categories.slice(0, 4);

  return (
    <Layout>
      <Head>
        <title>My Blog - Home</title>
        <meta name="description" content="Welcome to my blog about technology, design, and everything in between." />
      </Head>
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero background"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to My Blog</h1>
            <p className="text-xl mb-8">
              Discover articles about technology, design, and everything in between.
              Join us on a journey of knowledge and inspiration.
            </p>
            <Button href="/blog" variant="primary">
              Explore Articles
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Posts Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Posts</h2>
          
          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white h-64 rounded-lg shadow mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.objectId} post={post} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button href="/blog" variant="outline">
              View All Posts
            </Button>
          </div>
        </div>
      </section>
      
      {/* Popular Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularCategories.map((category) => (
                <CategoryCard key={category.objectId} category={category} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button href="/categories" variant="outline">
              View All Categories
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Stay updated with our latest articles and news. Join our community today!
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md focus:outline-none text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-r-md font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;