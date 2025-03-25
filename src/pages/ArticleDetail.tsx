
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getArticleById } from '@/utils/articleUtils';
import { Article } from '@/components/ui/ArticleCard';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the article by ID when the component mounts
    if (id) {
      const fetchedArticle = getArticleById(id);
      setArticle(fetchedArticle || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container-custom py-16">
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-xl text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container-custom py-16">
        <div className="flex flex-col justify-center items-center min-h-[50vh]">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/articles">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Article Header */}
      <div 
        className="w-full h-[50vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${article.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60">
          <div className="container-custom h-full flex flex-col justify-end pb-10">
            <div className="max-w-3xl text-white">
              <Link to="/articles">
                <Button variant="outline" className="mb-6 bg-transparent border-white/30 text-white hover:bg-white/10">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Articles
                </Button>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center mb-2">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/80 text-white mr-4">
                  {article.category}
                </span>
                <span className="text-white/80 text-sm">{article.date}</span>
                <span className="mx-2 text-white/80">•</span>
                <span className="text-white/80 text-sm">{article.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl font-medium text-muted-foreground mb-8">
                {article.excerpt}
              </p>
              
              <article className="leading-relaxed">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">{paragraph}</p>
                ))}
              </article>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              {/* Author Information */}
              <div className="bg-card rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">About the Author</h3>
                <div className="flex items-center">
                  <Avatar className="h-14 w-14 mr-4">
                    <AvatarImage src={article.authorAvatar} alt={article.authorName} />
                    <AvatarFallback>{article.authorName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{article.authorName}</h4>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </div>
              </div>
              
              {/* Category Information */}
              <div className="bg-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Category</h3>
                <Link to={`/articles?category=${article.category}`}>
                  <Button variant="outline" className="w-full">
                    {article.category}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
