
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import Hero from '@/components/ui/Hero';
import { saveArticle } from '@/utils/articleUtils';
import { SupabaseFileUploader } from '@/components/ui/SupabaseFileUploader';
import { Article } from '@/components/ui/ArticleCard';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  excerpt: z.string().min(10, { message: 'Excerpt must be at least 10 characters' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters' }),
  category: z.string().min(2, { message: 'Category is required' }),
  authorName: z.string().min(2, { message: 'Author name is required' }),
});

const AddArticle = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [authorAvatar, setAuthorAvatar] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast: useToastHook } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      category: '',
      authorName: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Calculate reading time based on content length
      const wordsPerMinute = 200;
      const wordCount = data.content.trim().split(/\s+/).length;
      const readingTime = `${Math.max(1, Math.ceil(wordCount / wordsPerMinute))} min read`;
      
      // Create article object using the form data
      const articleData = {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        authorName: data.authorName,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        authorAvatar: authorAvatar || 'https://randomuser.me/api/portraits/men/32.jpg',
        readingTime: readingTime,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      };
      
      const articleId = await saveArticle(articleData);
      
      if (articleId) {
        // Invalidate articles query to refetch the latest data
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        
        useToastHook({
          title: 'Article Published!',
          description: 'Your article has been successfully published.',
        });
        
        toast.success('Article published successfully');
        navigate('/articles');
      } else {
        toast.error('Failed to publish article');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      useToastHook({
        title: 'Error',
        description: 'Failed to publish article. Please try again.',
        variant: 'destructive',
      });
      toast.error('Failed to publish article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Hero 
        title="Create a New Article" 
        subtitle="Share your fitness knowledge and insights with the community"
        backgroundImage="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />
      
      <section className="py-10">
        <div className="container-custom">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter article title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write a brief summary of your article" 
                            {...field} 
                            className="min-h-[80px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Nutrition, Training, Wellness" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="authorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormLabel>Featured Image</FormLabel>
                      <SupabaseFileUploader 
                        onFileUpload={(url) => setImageUrl(url)}
                        accept="image/*"
                        previewUrl={imageUrl}
                        bucketName="article_images"
                      />
                    </div>
                    
                    <div>
                      <FormLabel>Author Avatar</FormLabel>
                      <SupabaseFileUploader 
                        onFileUpload={(url) => setAuthorAvatar(url)}
                        accept="image/*"
                        previewUrl={authorAvatar}
                        bucketName="article_images"
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your article content here..." 
                            {...field} 
                            className="min-h-[300px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <CardFooter className="px-0 flex justify-end">
                    <Button type="button" variant="outline" className="mr-2" onClick={() => navigate('/articles')}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Publishing...' : 'Publish Article'}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AddArticle;
