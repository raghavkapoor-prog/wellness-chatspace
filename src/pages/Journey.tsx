
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Heart } from 'lucide-react';
import Hero from '@/components/ui/Hero';
import { getAllJourneyPosts, likeJourneyPost } from '@/utils/articleUtils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const JourneyCard = ({ post, onLike }: { 
  post: any,
  onLike: (id: string) => void
}) => {
  return (
    <div className="card-hover bg-card text-card-foreground rounded-2xl overflow-hidden border relative">
      <div className="relative aspect-[16/9]">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="object-cover w-full h-full"
        />
        <Button 
          size="sm" 
          variant="secondary"
          className="absolute top-4 right-4 rounded-full p-2 bg-black/30 hover:bg-black/50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onLike(post.id);
          }}
        >
          <Heart className="h-4 w-4" />
          <span className="ml-1">{post.likes || 0}</span>
        </Button>
      </div>
      <div className="p-6">
        <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
        <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
        <p className="text-muted-foreground mb-4">{post.content.substring(0, 150)}...</p>
        <Link
          to={`/journey/${post.id}`}
          className="text-sm text-accent-foreground font-medium hover:underline"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

const Journey = () => {
  const queryClient = useQueryClient();
  
  // Fetch journey posts using React Query
  const { data: journeyPosts = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['journeyPosts'],
    queryFn: getAllJourneyPosts,
  });

  // Handle like journey post
  const handleLikeJourneyPost = async (journeyId: string) => {
    const success = await likeJourneyPost(journeyId);
    if (success) {
      // Invalidate journey posts query to refetch with updated likes
      queryClient.invalidateQueries({ queryKey: ['journeyPosts'] });
      toast.success('Journey post liked!');
    } else {
      toast.info('You already liked this journey post');
    }
  };

  // Refresh journey posts
  const refreshJourneyPosts = async () => {
    toast.info('Refreshing journey posts...');
    await refetch();
    toast.success('Journey posts refreshed successfully');
  };

  return (
    <div className="min-h-screen">
      <Hero 
        title="My Fitness Journey"
        subtitle="Follow along as I document my personal transformation, sharing insights, struggles, and victories."
        backgroundImage="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold mr-4">Journey Posts</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={refreshJourneyPosts} 
                disabled={isLoading}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            <Link to="/add-journey">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Journey Post
              </Button>
            </Link>
          </div>
          
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 mb-16 neo-blur">
            <h2 className="text-2xl font-semibold mb-4">About This Journey</h2>
            <p className="text-muted-foreground mb-4">
              In January 2023, I decided to transform my approach to fitness and wellness. This journey documents my experiences, challenges, and lessons learned along the way.
            </p>
            <p className="text-muted-foreground mb-4">
              I'm not a fitness professional or nutrition expert — just someone committed to improving my health and sharing what I learn along the way. I hope my experiences can provide insight, motivation, or simply a realistic perspective on what a fitness journey truly looks like.
            </p>
            <p className="text-muted-foreground">
              Join me as I navigate the ups and downs of creating sustainable healthy habits.
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading journey posts...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Failed to load journey posts. Please try again.</p>
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          ) : journeyPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No journey posts found. Start documenting your fitness journey!</p>
              <Link to="/add-journey">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Journey Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {journeyPosts.map((post, index) => (
                <div key={post.id} className="flex flex-col md:flex-row gap-10 items-center">
                  {/* Alternate layout for even/odd posts */}
                  {index % 2 === 0 ? (
                    <>
                      <div className="w-full md:w-1/2">
                        <JourneyCard post={post} onLike={handleLikeJourneyPost} />
                      </div>
                      <div className="w-full md:w-1/2 space-y-6">
                        <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-muted">
                          Milestone {index + 1}
                        </div>
                        <h3 className="text-2xl font-semibold">{post.title}</h3>
                        <p className="text-muted-foreground">{post.content.substring(0, 250)}...</p>
                        <p className="text-muted-foreground">
                          This part of my journey taught me that consistency matters more than perfection, and that small daily habits lead to significant changes over time.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full md:w-1/2 space-y-6 order-2 md:order-1">
                        <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-muted">
                          Milestone {index + 1}
                        </div>
                        <h3 className="text-2xl font-semibold">{post.title}</h3>
                        <p className="text-muted-foreground">{post.content.substring(0, 250)}...</p>
                        <p className="text-muted-foreground">
                          During this period, I learned to appreciate the process rather than focusing solely on results, which transformed how I approach fitness entirely.
                        </p>
                      </div>
                      <div className="w-full md:w-1/2 order-1 md:order-2">
                        <JourneyCard post={post} onLike={handleLikeJourneyPost} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Journey;
