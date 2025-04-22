export interface Post {
  objectId: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  featured: boolean;
}

export interface PostDetail extends Post {
  content: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  tags?: string[];
}