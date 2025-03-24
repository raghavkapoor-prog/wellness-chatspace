
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ArticleCard from '@/components/ui/ArticleCard';
import { articles, getArticlesByCategory } from '@/data/articles';
import Hero from '@/components/ui/Hero';

const Articles = () => {
  const location = useLocation();
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(articles.map(article => article.category.toLowerCase())))];
  
  useEffect(() => {
    // Check if there's a category in the URL
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setActiveCategory(categoryParam.toLowerCase());
      setFilteredArticles(getArticlesByCategory(categoryParam));
    } else {
      setActiveCategory('all');
      setFilteredArticles(articles);
    }
  }, [location.search]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(getArticlesByCategory(category));
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term.trim()) {
      // If search is cleared, respect category filter
      handleCategoryChange(activeCategory);
      return;
    }
    
    // Filter articles based on search term and active category
    const results = articles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(term.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(term.toLowerCase());
      
      const matchesCategory = 
        activeCategory === 'all' || 
        article.category.toLowerCase() === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredArticles(results);
  };
  
  return (
    <div className="min-h-screen">
      <Hero 
        title="Articles & Resources"
        subtitle="Browse our collection of evidence-based articles on nutrition, fitness, recovery, and more."
        backgroundImage="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="w-full md:w-auto order-2 md:order-1">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 text-sm rounded-full transition-colors ${
                      activeCategory === category
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-auto order-1 md:order-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full md:w-[300px] h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filters
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;
