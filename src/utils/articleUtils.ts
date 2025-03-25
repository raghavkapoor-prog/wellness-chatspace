
import { articles as initialArticles, journeyPosts as initialJourneyPosts } from '@/data/articles';
import { Article } from '@/components/ui/ArticleCard';

// Type for journey posts
export interface JourneyPost {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
}

// Initialize from localStorage or default data
const initializeArticles = (): Article[] => {
  const storedArticles = localStorage.getItem('brute_strength_articles');
  return storedArticles ? JSON.parse(storedArticles) : [...initialArticles];
};

const initializeJourneyPosts = (): JourneyPost[] => {
  const storedPosts = localStorage.getItem('brute_strength_journeyPosts');
  return storedPosts ? JSON.parse(storedPosts) : [...initialJourneyPosts];
};

// In-memory storage for new articles and journey posts
let localArticles = initializeArticles();
let localJourneyPosts = initializeJourneyPosts();

// Save a new article
export const saveArticle = async (article: Article): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Add to local storage
  localArticles = [article, ...localArticles];
  
  // Persist to localStorage
  localStorage.setItem('brute_strength_articles', JSON.stringify(localArticles));
  
  // Log the updated articles list
  console.log('Article saved:', article);
  console.log('Updated articles list:', localArticles);
  
  return Promise.resolve();
};

// Save a new journey post
export const saveJourneyPost = async (post: JourneyPost): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Add to local storage
  localJourneyPosts = [post, ...localJourneyPosts];
  
  // Persist to localStorage
  localStorage.setItem('brute_strength_journeyPosts', JSON.stringify(localJourneyPosts));
  
  // Log the updated journey posts list
  console.log('Journey post saved:', post);
  console.log('Updated journey posts list:', localJourneyPosts);
  
  return Promise.resolve();
};

// Get all articles, including newly added ones
export const getAllArticles = (): Article[] => {
  return localArticles;
};

// Get all journey posts, including newly added ones
export const getAllJourneyPosts = (): JourneyPost[] => {
  return localJourneyPosts;
};

// Get article by id
export const getArticleById = (id: string): Article | undefined => {
  return localArticles.find(article => article.id === id);
};

// Get journey post by id
export const getJourneyPostById = (id: string): JourneyPost | undefined => {
  return localJourneyPosts.find(post => post.id === id);
};

// Get articles by category
export const getArticlesByCategory = (category: string): Article[] => {
  return localArticles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );
};
