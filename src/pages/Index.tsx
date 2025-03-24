
import React from 'react';
import Hero from '@/components/ui/Hero';
import ArticleCard from '@/components/ui/ArticleCard';
import { articles } from '@/data/articles';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Get featured article and recent articles
  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1, 7);
  
  // Get articles by category for sections
  const nutritionArticles = articles.filter(article => 
    article.category.toLowerCase() === 'nutrition'
  ).slice(0, 3);
  
  const trainingArticles = articles.filter(article => 
    article.category.toLowerCase() === 'training'
  ).slice(0, 3);
  
  return (
    <div className="min-h-screen">
      <Hero 
        title="Elevate Your Fitness Journey"
        subtitle="Discover evidence-based articles, personalized advice, and community support to transform your approach to health and wellness."
        backgroundImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />
      
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start gap-10">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold mb-8">Featured Article</h2>
              <ArticleCard article={featuredArticle} variant="featured" />
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="glass p-8 rounded-2xl h-full">
                <h3 className="text-xl font-semibold mb-4">Welcome to Fitness Journey</h3>
                <p className="text-muted-foreground mb-6">
                  Navigating health and fitness information can be overwhelming. 
                  Our platform provides science-backed content and personalized 
                  support to help you achieve your wellness goals.
                </p>
                <p className="text-muted-foreground mb-6">
                  Have questions? Our AI fitness assistant is ready to help you 
                  find the answers you need.
                </p>
                <Button className="w-full">Start Your Journey</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-semibold">Latest Articles</h2>
            <Link to="/articles" className="text-sm text-accent-foreground hover:underline">
              View all articles
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-semibold">Nutrition Insights</h2>
            <Link to="/articles?category=nutrition" className="text-sm text-accent-foreground hover:underline">
              More nutrition articles
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nutritionArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-semibold">Training & Workouts</h2>
            <Link to="/articles?category=training" className="text-sm text-accent-foreground hover:underline">
              More training articles
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our community for personalized guidance, evidence-based articles, and expert support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="min-w-[180px]">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="min-w-[180px]">
              Explore Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
