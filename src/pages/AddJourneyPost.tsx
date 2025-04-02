
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
import { saveJourneyPost, JourneyPost } from '@/utils/articleUtils';
import { SupabaseFileUploader } from '@/components/ui/SupabaseFileUploader';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters' }),
});

const AddJourneyPost = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast: useToastHook } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Create journey post object
      const journeyData: Omit<JourneyPost, 'id' | 'likes'> = {
        title: data.title,
        content: data.content,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      };
      
      const journeyId = await saveJourneyPost(journeyData);
      
      if (journeyId) {
        // Invalidate journey posts query to refetch the latest data
        queryClient.invalidateQueries({ queryKey: ['journeyPosts'] });
        
        useToastHook({
          title: 'Journey Post Published!',
          description: 'Your journey post has been successfully published.',
        });
        
        toast.success('Journey post published successfully');
        navigate('/journey');
      } else {
        toast.error('Failed to publish journey post');
      }
    } catch (error) {
      console.error('Error saving journey post:', error);
      useToastHook({
        title: 'Error',
        description: 'Failed to publish journey post. Please try again.',
        variant: 'destructive',
      });
      toast.error('Failed to publish journey post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Hero 
        title="Share Your Fitness Journey" 
        subtitle="Document your progress, challenges, and victories"
        backgroundImage="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />
      
      <section className="py-10">
        <div className="container-custom">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Journey Post Details</CardTitle>
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
                          <Input placeholder="Enter journey post title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel>Featured Image</FormLabel>
                    <SupabaseFileUploader 
                      onFileUpload={(url) => setImageUrl(url)}
                      accept="image/*"
                      previewUrl={imageUrl}
                      bucketName="journey_images"
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your experience, challenges, and achievements..." 
                            {...field} 
                            className="min-h-[300px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <CardFooter className="px-0 flex justify-end">
                    <Button type="button" variant="outline" className="mr-2" onClick={() => navigate('/journey')}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Publishing...' : 'Publish Journey Post'}
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

export default AddJourneyPost;
