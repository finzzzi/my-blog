import { useState, useEffect } from 'react';
import BlogService from '../services/backendless';
import { Post, PostDetail } from '../types/post';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export const useFeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getFeaturedPosts();
        setFeaturedPosts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch featured posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return { featuredPosts, loading, error };
};

export const usePostDetail = (slug: string) => {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await BlogService.getPostBySlug(slug);
        setPost(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch post details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};
