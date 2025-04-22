import { useState, useEffect } from 'react';
import BlogService from '../services/backendless';
import { Category } from '../types/category';
import { Post } from '../types/post';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const usePostsByCategory = (categoryId: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      if (!categoryId) return;
      
      try {
        setLoading(true);
        const data = await BlogService.getPostsByCategory(categoryId);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch posts for category ${categoryId}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByCategory();
  }, [categoryId]);

  return { posts, loading, error };
};