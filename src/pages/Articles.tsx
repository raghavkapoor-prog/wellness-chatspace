
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import Hero from '@/components/ui/Hero';
import ArticleCard from '@/components/ui/ArticleCard';
import { getAllArticles } from '@/utils/articleUtils';
import { toast } from 'sonner';

const Articles = () => {
  const [articles, setArticles] = useState(getAllArticles());
  const [isLoading, setIsLoading] = useState(false);

  // Update articles when the component mounts (to get the latest)
  useEffect(() => {
    refreshArticles();
  }, []);

  const refreshArticles = () => {
    setIsLoading(true);
    // Small delay to simulate fetching
    setTimeout(() => {
      setArticles(getAllArticles());
      setIsLoading(false);
      toast.success('Articles refreshed successfully');
    }, 300);
  };

  // Categories with counts
  const categories = [...new Set(articles.map(article => article.category))];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
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
        </div>
      </section>
    </div>
  );
};

export default Articles;
