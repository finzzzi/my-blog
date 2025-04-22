import axios from 'axios';
import { Post, PostDetail } from '../types/post';
import { Category } from '../types/category';

const API_URL = 'https://lustytin-us.backendless.app';
const APP_ID = '6B888442-622C-4DD6-9FCF-FCEC760D9A23';
const API_KEY = '463C6F7F-FC0F-429E-98F8-A71F9DC124E7';

const backendlessApi = axios.create({
  baseURL: `${API_URL}/${APP_ID}/${API_KEY}/data`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const BlogService = {
  async getPosts(): Promise<Post[]> {
    try {
      const response = await backendlessApi.get('/posts?sortBy=createdAt%20desc');
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },
  
  async getPostBySlug(slug: string): Promise<PostDetail | null> {
    try {
      const response = await backendlessApi.get(`/posts?where=slug%3D'${slug}'`);
      return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      return null;
    }
  },
  
  async getCategories(): Promise<Category[]> {
    try {
      const response = await backendlessApi.get('/categories?sortBy=name%20asc');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
  
  async getPostsByCategory(categoryId: string): Promise<Post[]> {
    try {
      const response = await backendlessApi.get(`/posts?where=categoryId%3D'${categoryId}'&sortBy=createdAt%20desc`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching posts for category ${categoryId}:`, error);
      return [];
    }
  },
  
  async getFeaturedPosts(): Promise<Post[]> {
    try {
      const response = await backendlessApi.get('/posts?where=featured%3Dtrue&sortBy=createdAt%20desc&pageSize=3');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      return [];
    }
  }
};

export default BlogService;