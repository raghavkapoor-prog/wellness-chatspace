
-- Function to increment journey post likes
CREATE OR REPLACE FUNCTION public.increment_journey_likes(journey_id UUID)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE journey_posts
  SET likes = COALESCE(likes, 0) + 1
  WHERE id = journey_id;
$$;
