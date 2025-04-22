import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import { usePostDetail } from '../../hooks/useBlogPosts';
import Link from 'next/link';

const BlogDetailPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { post, loading, error } = usePostDetail(slug as string);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded max-w-2xl mb-6"></div>
            <div className="h-4 bg-gray-300 rounded max-w-md mb-8"></div>
            <div className="h-96 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
            Return to Blog
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      
      <article>
        <div className="relative h-96 w-full">
          <Image
            src={post.featuredImage || '/images/placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-12">
            <Link 
              href={`/categories/${post.categoryId}`}
              className="inline-block px-3 py-1 text-sm font-semibold bg-blue-600 text-white rounded-full mb-4"
            >
              {post.categoryName}
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-300 text-sm">
              <span>By {post.author}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {post.author && (
              <div className="mt-12 pt-6 border-t border-gray-200 flex items-start">
                {post.authorImage && (
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={80}
                    height={80}
                    className="rounded-full mr-6"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">About {post.author}</h3>
                  <p className="text-gray-600">{post.authorBio || 'Blog author'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogDetailPage;