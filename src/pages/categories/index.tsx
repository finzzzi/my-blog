import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import CategoryCard from '../../components/ui/CategoryCard';
import { useCategories } from '../../hooks/useCategories';

const CategoriesPage: NextPage = () => {
  const { categories, loading } = useCategories();
  
  return (
    <Layout>
      <Head>
        <title>Categories | My Blog</title>
        <meta name="description" content="Browse all categories on our blog." />
      </Head>
      
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Categories</h1>
          <p className="text-xl">Find articles based on your interest</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.objectId} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No categories found</h3>
            <p className="text-gray-600">Check back later for new categories.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoriesPage;