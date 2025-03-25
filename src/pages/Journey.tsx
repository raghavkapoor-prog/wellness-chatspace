
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Hero from '@/components/ui/Hero';
import { getAllJourneyPosts } from '@/utils/articleUtils';

const JourneyCard = ({ post }: { post: ReturnType<typeof getAllJourneyPosts>[0] }) => {
  return (
    <div className="card-hover bg-card text-card-foreground rounded-2xl overflow-hidden border">
      <div className="relative aspect-[16/9]">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
        <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
        <p className="text-muted-foreground mb-4">{post.content}</p>
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
  const [journeyPosts, setJourneyPosts] = useState(getAllJourneyPosts());

  // Update journey posts when the component mounts (to get the latest)
  useEffect(() => {
    setJourneyPosts(getAllJourneyPosts());
  }, []);

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
            <h2 className="text-2xl font-semibold">Journey Posts</h2>
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
          
          <div className="space-y-12">
            {journeyPosts.map((post, index) => (
              <div key={post.id} className="flex flex-col md:flex-row gap-10 items-center">
                {/* Alternate layout for even/odd posts */}
                {index % 2 === 0 ? (
                  <>
                    <div className="w-full md:w-1/2">
                      <JourneyCard post={post} />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                      <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-muted">
                        Milestone {index + 1}
                      </div>
                      <h3 className="text-2xl font-semibold">{post.title}</h3>
                      <p className="text-muted-foreground">{post.content}</p>
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
                      <p className="text-muted-foreground">{post.content}</p>
                      <p className="text-muted-foreground">
                        During this period, I learned to appreciate the process rather than focusing solely on results, which transformed how I approach fitness entirely.
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 order-1 md:order-2">
                      <JourneyCard post={post} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journey;
