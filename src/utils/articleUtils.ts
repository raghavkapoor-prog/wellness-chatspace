import { supabase } from '@/integrations/supabase/client';
import { articles as initialArticles, journeyPosts as initialJourneyPosts } from '@/data/articles';
import { Article } from '@/components/ui/ArticleCard';
import { toast } from 'sonner';
import { ArticleTable, JourneyPostTable, ArticleLikeTable, JourneyLikeTable } from './databaseTypes';

// Type for journey posts
export interface JourneyPost {
  id: string;
  title: string;
  content: string;
  date?: string;
  imageUrl: string;
  likes?: number;
}

// Map database column names to frontend property names
const mapDbArticleToArticle = (dbArticle: ArticleTable): Article => {
  return {
    id: dbArticle.id,
    title: dbArticle.title,
    excerpt: dbArticle.excerpt,
    content: dbArticle.content,
    category: dbArticle.category,
    imageUrl: dbArticle.image_url || '',
    authorName: dbArticle.author_name,
    authorAvatar: dbArticle.author_avatar || '',
    readingTime: dbArticle.reading_time,
    date: new Date(dbArticle.created_at || '').toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    likes: dbArticle.likes || 0
  };
};

const mapDbJourneyToJourney = (dbJourney: JourneyPostTable): JourneyPost => {
  return {
    id: dbJourney.id,
    title: dbJourney.title,
    content: dbJourney.content,
    imageUrl: dbJourney.image_url || '',
    date: new Date(dbJourney.created_at || '').toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    likes: dbJourney.likes || 0
  };
};

// Save a new article
export const saveArticle = async (article: Omit<Article, 'id' | 'likes'>): Promise<string | null> => {
  try {
    // Prepare the article data for database insertion
    const dbArticle = {
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      image_url: article.imageUrl,
      author_name: article.authorName,
      author_avatar: article.authorAvatar,
      reading_time: article.readingTime,
    };
    
    const { data, error } = await supabase
      .from('articles')
      .insert(dbArticle)
      .select('id')
      .single();
    
    if (error) {
      console.error('Error saving article:', error);
      toast.error('Failed to save article');
      return null;
    }
    
    console.log('Article saved:', data);
    return data?.id;
  } catch (error) {
    console.error('Error in saveArticle:', error);
    toast.error('Failed to save article');
    return null;
  }
};

// Save a new journey post
export const saveJourneyPost = async (post: Omit<JourneyPost, 'id' | 'likes'>): Promise<string | null> => {
  try {
    // Prepare the journey post data for database insertion
    const dbJourneyPost = {
      title: post.title,
      content: post.content,
      image_url: post.imageUrl,
    };
    
    const { data, error } = await supabase
      .from('journey_posts')
      .insert(dbJourneyPost)
      .select('id')
      .single();
    
    if (error) {
      console.error('Error saving journey post:', error);
      toast.error('Failed to save journey post');
      return null;
    }
    
    console.log('Journey post saved:', data);
    return data?.id;
  } catch (error) {
    console.error('Error in saveJourneyPost:', error);
    toast.error('Failed to save journey post');
    return null;
  }
};

// Get all articles from Supabase
export const getAllArticles = async (): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to load articles');
      return [];
    }
    
    if (!data || data.length === 0) {
      // If no articles exist in Supabase yet, return initial articles
      const seedPromises = initialArticles.map(article => {
        // Map our frontend article format to database format
        const dbArticle = {
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          image_url: article.imageUrl,
          author_name: article.authorName,
          author_avatar: article.authorAvatar,
          reading_time: article.readingTime,
        };

        return supabase.from('articles').insert(dbArticle);
      });

      // Seed initial articles in parallel
      await Promise.all(seedPromises);
      
      // Try fetching again
      const { data: seededData, error: seededError } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (seededError || !seededData) {
        console.error('Error fetching seeded articles:', seededError);
        return [];
      }
      
      return seededData.map(mapDbArticleToArticle);
    }
    
    return data.map(mapDbArticleToArticle);
  } catch (error) {
    console.error('Error in getAllArticles:', error);
    return [];
  }
};

// Get all journey posts from Supabase
export const getAllJourneyPosts = async (): Promise<JourneyPost[]> => {
  try {
    const { data, error } = await supabase
      .from('journey_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching journey posts:', error);
      toast.error('Failed to load journey posts');
      return [];
    }
    
    if (!data || data.length === 0) {
      // If no journey posts exist in Supabase yet, return initial journey posts
      const seedPromises = initialJourneyPosts.map(post => {
        // Map our frontend journey post format to database format
        const dbJourneyPost = {
          title: post.title,
          content: post.content,
          image_url: post.imageUrl,
        };

        return supabase.from('journey_posts').insert(dbJourneyPost);
      });

      // Seed initial journey posts in parallel
      await Promise.all(seedPromises);
      
      // Try fetching again
      const { data: seededData, error: seededError } = await supabase
        .from('journey_posts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (seededError || !seededData) {
        console.error('Error fetching seeded journey posts:', seededError);
        return [];
      }
      
      return seededData.map(mapDbJourneyToJourney);
    }
    
    return data.map(mapDbJourneyToJourney);
  } catch (error) {
    console.error('Error in getAllJourneyPosts:', error);
    return [];
  }
};

// Get article by id
export const getArticleById = async (id: string): Promise<Article | null> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching article:', error);
      return null;
    }
    
    return mapDbArticleToArticle(data as ArticleTable);
  } catch (error) {
    console.error('Error in getArticleById:', error);
    return null;
  }
};

// Get journey post by id
export const getJourneyPostById = async (id: string): Promise<JourneyPost | null> => {
  try {
    const { data, error } = await supabase
      .from('journey_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching journey post:', error);
      return null;
    }
    
    return mapDbJourneyToJourney(data as JourneyPostTable);
  } catch (error) {
    console.error('Error in getJourneyPostById:', error);
    return null;
  }
};

// Get articles by category
export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .ilike('category', category)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching articles by category:', error);
      return [];
    }
    
    return data.map(mapDbArticleToArticle);
  } catch (error) {
    console.error('Error in getArticlesByCategory:', error);
    return [];
  }
};

// Like an article
export const likeArticle = async (articleId: string): Promise<boolean> => {
  try {
    // First, check if there are any existing likes for this article (anonymous for now)
    const { data: existingLikes } = await supabase
      .from('article_likes')
      .select('*')
      .eq('article_id', articleId)
      .is('user_id', null) as any;

    // If not already liked anonymously, add a like
    if (!existingLikes || existingLikes.length === 0) {
      // First insert a like record
      const { error: likeError } = await supabase
        .from('article_likes')
        .insert({ article_id: articleId, user_id: null }) as any;
      
      if (likeError) {
        console.error('Error adding like:', likeError);
        return false;
      }
      
      // Using any type on both the method and parameters to bypass TypeScript checking completely
      const { error: updateError } = await (supabase.rpc as any)('increment_article_likes', { article_id: articleId });
      
      if (updateError) {
        console.error('Error with RPC call:', updateError);
        // Fallback method if RPC is not available
        const { data: article } = await supabase
          .from('articles')
          .select('likes')
          .eq('id', articleId)
          .single() as any;
        
        const newLikes = (article?.likes || 0) + 1;
        
        const { error } = await supabase
          .from('articles')
          .update({ likes: newLikes })
          .eq('id', articleId) as any;
          
        if (error) {
          console.error('Error updating article likes:', error);
          return false;
        }
      }
      
      return true;
    }
    
    return false; // Already liked
  } catch (error) {
    console.error('Error in likeArticle:', error);
    return false;
  }
};

// Like a journey post
export const likeJourneyPost = async (journeyId: string): Promise<boolean> => {
  try {
    // First, check if there are any existing likes for this journey post (anonymous for now)
    const { data: existingLikes } = await supabase
      .from('journey_likes')
      .select('*')
      .eq('journey_id', journeyId)
      .is('user_id', null) as any;

    // If not already liked anonymously, add a like
    if (!existingLikes || existingLikes.length === 0) {
      // First insert a like record
      const { error: likeError } = await supabase
        .from('journey_likes')
        .insert({ journey_id: journeyId, user_id: null }) as any;
      
      if (likeError) {
        console.error('Error adding like:', likeError);
        return false;
      }
      
      // Using any type on both the method and parameters to bypass TypeScript checking completely
      const { error: updateError } = await (supabase.rpc as any)('increment_journey_likes', { journey_id: journeyId });
      
      if (updateError) {
        console.error('Error with RPC call:', updateError);
        // Fallback method if RPC is not available
        const { data: journey } = await supabase
          .from('journey_posts')
          .select('likes')
          .eq('id', journeyId)
          .single() as any;
        
        const newLikes = (journey?.likes || 0) + 1;
        
        const { error } = await supabase
          .from('journey_posts')
          .update({ likes: newLikes })
          .eq('id', journeyId) as any;
          
        if (error) {
          console.error('Error updating journey likes:', error);
          return false;
        }
      }
      
      return true;
    }
    
    return false; // Already liked
  } catch (error) {
    console.error('Error in likeJourneyPost:', error);
    return false;
  }
};

// Upload an image to Supabase storage
export const uploadImage = async (file: File, bucketName: 'article_images' | 'journey_images'): Promise<string | null> => {
  try {
    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload the file
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file);
    
    if (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    toast.error('Failed to upload image');
    return null;
  }
};
