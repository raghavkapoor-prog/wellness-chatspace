
// Define our database types for proper type checking
export interface ArticleTable {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  author_name: string;
  author_avatar: string | null;
  reading_time: string;
  likes: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface JourneyPostTable {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  likes: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ArticleLikeTable {
  id: string;
  article_id: string | null;
  user_id: string | null;
  created_at: string | null;
}

export interface JourneyLikeTable {
  id: string;
  journey_id: string | null;
  user_id: string | null;
  created_at: string | null;
}

export interface ChatHistoryTable {
  id: string;
  user_message: string;
  assistant_message: string;
  user_id: string | null;
  created_at: string | null;
}
