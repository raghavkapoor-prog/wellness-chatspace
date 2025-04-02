
-- Function to increment article likes
CREATE OR REPLACE FUNCTION public.increment_article_likes(article_id UUID)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE articles
  SET likes = COALESCE(likes, 0) + 1
  WHERE id = article_id;
$$;
