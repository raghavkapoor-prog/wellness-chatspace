
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Add content property to the interface
  category: string;
  imageUrl: string;
  readingTime: string;
  date: string;
  authorName: string;
  authorAvatar?: string;
}

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

const ArticleCard = ({ article, variant = 'default', className }: ArticleCardProps) => {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  
  return (
    <Link
      to={`/articles/${article.id}`}
      className={cn(
        'group block overflow-hidden rounded-2xl card-hover bg-card text-card-foreground',
        isCompact ? 'h-full' : '',
        className
      )}
    >
      <div className={cn(
        'relative',
        isFeatured ? 'aspect-[16/9]' : 'aspect-[16/10]',
        isCompact ? 'aspect-[16/9] h-32' : ''
      )}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm text-white">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className={cn(
        'p-5',
        isCompact ? 'p-3' : '',
        isFeatured ? 'p-6' : ''
      )}>
        <h3 className={cn(
          'font-semibold text-balance mb-2 tracking-tight group-hover:text-accent-foreground transition-colors',
          isFeatured ? 'text-xl' : 'text-lg',
          isCompact ? 'text-base' : ''
        )}>
          {article.title}
        </h3>
        
        {!isCompact && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {article.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            {article.authorAvatar && (
              <img 
                src={article.authorAvatar} 
                alt={article.authorName}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span>{article.authorName}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span>{article.date}</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
