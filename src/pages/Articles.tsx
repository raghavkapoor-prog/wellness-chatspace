
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Heart } from 'lucide-react';
import Hero from '@/components/ui/Hero';
import ArticleCard from '@/components/ui/ArticleCard';
import { getAllArticles, likeArticle } from '@/utils/articleUtils';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Articles = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Fetch articles using React Query
  const { data: articles = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['articles'],
    queryFn: getAllArticles,
  });
  
  // Refresh articles
  const refreshArticles = async () => {
    toast.info('Refreshing articles...');
    await refetch();
    toast.success('Articles refreshed successfully');
  };

  // Handle like article
  const handleLikeArticle = async (articleId: string) => {
    const success = await likeArticle(articleId);
    if (success) {
      // Invalidate articles query to refetch with updated likes
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success('Article liked!');
    } else {
      toast.info('You already liked this article');
    }
  };

  // Get unique categories
  const categories = [...new Set(articles.map(article => article.category))];
  
  // Filter articles by category
  const filteredArticles = activeCategory
    ? articles.filter(article => article.category === activeCategory)
    : articles;

  return (
    <div className="min-h-screen">
      <Hero 
        title="Fitness Articles" 
        subtitle="Learn about fitness, nutrition, and wellness from our expert contributors."
        backgroundImage="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />
      
      <section className="py-12">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
              <Button 
                variant={activeCategory === null ? "default" : "outline"} 
                onClick={() => setActiveCategory(null)}
                className="rounded-full"
              >
                All
              </Button>
              
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={refreshArticles} 
                disabled={isLoading}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Link to="/add-article">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Article
                </Button>
              </Link>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Failed to load articles. Please try again.</p>
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <div key={article.id} className="relative">
                    <ArticleCard article={article} />
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="absolute top-4 right-4 rounded-full p-2 bg-black/30 hover:bg-black/50"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLikeArticle(article.id);
                      }}
                    >
                      <Heart className="h-4 w-4" />
                      <span className="ml-1">{article.likes || 0}</span>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {activeCategory 
                      ? `No articles found in the "${activeCategory}" category.` 
                      : "No articles found. Create your first article!"}
                  </p>
                  <Link to="/add-article">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Article
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;
