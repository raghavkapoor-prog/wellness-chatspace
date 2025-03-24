
import { Article } from '../components/ui/ArticleCard';

// Sample image URLs (replace with your own)
const imageUrls = [
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1518310383802-640c2de311b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1567688354865-07806b4bc1b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Science of Muscle Growth: Understanding Hypertrophy',
    excerpt: 'Delve into the physiological mechanisms behind muscle growth and how to optimize your training for maximum results.',
    category: 'Training',
    imageUrl: imageUrls[0],
    readingTime: '8 min read',
    date: 'Jun 12, 2023',
    authorName: 'Dr. Sarah Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    title: 'Nutrition Timing: When to Eat for Optimal Performance',
    excerpt: 'Learn how strategic meal timing can enhance your workout performance, recovery, and overall fitness progress.',
    category: 'Nutrition',
    imageUrl: imageUrls[1],
    readingTime: '6 min read',
    date: 'May 28, 2023',
    authorName: 'Michael Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    title: 'The Ultimate Guide to Plant-Based Protein Sources',
    excerpt: 'Discover how to meet your protein needs with plant-based foods and build muscle on a vegetarian or vegan diet.',
    category: 'Nutrition',
    imageUrl: imageUrls[2],
    readingTime: '7 min read',
    date: 'May 15, 2023',
    authorName: 'Emily Rodriguez',
    authorAvatar: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
  {
    id: '4',
    title: 'Mindfulness and Fitness: The Mental Side of Physical Training',
    excerpt: 'Explore how mindfulness practices can enhance your workout efficiency, recovery, and long-term fitness journey.',
    category: 'Wellness',
    imageUrl: imageUrls[3],
    readingTime: '5 min read',
    date: 'Apr 30, 2023',
    authorName: 'James Wilson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    id: '5',
    title: 'Recovery Strategies: Sleep, Active Rest, and Regeneration',
    excerpt: 'Learn why recovery is just as important as training and how to optimize your rest days for better results.',
    category: 'Recovery',
    imageUrl: imageUrls[4],
    readingTime: '9 min read',
    date: 'Apr 18, 2023',
    authorName: 'Dr. Lisa Patel',
    authorAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    id: '6',
    title: 'The Truth About Cardio: Benefits Beyond Weight Loss',
    excerpt: 'Understand how cardiovascular exercise affects your body and mind, and why it's essential even if weight loss isn't your goal.',
    category: 'Cardio',
    imageUrl: imageUrls[5],
    readingTime: '6 min read',
    date: 'Apr 5, 2023',
    authorName: 'Robert Taylor',
    authorAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
  {
    id: '7',
    title: 'Gut Health and Exercise: The Microbiome Connection',
    excerpt: 'Discover the fascinating relationship between your gut bacteria, exercise performance, and overall wellness.',
    category: 'Wellness',
    imageUrl: imageUrls[6],
    readingTime: '8 min read',
    date: 'Mar 22, 2023',
    authorName: 'Sophia Martinez',
    authorAvatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: '8',
    title: 'Strength Training for Longevity: Exercise as Medicine',
    excerpt: 'Learn how regular strength training can add years to your life and improve quality of life as you age.',
    category: 'Training',
    imageUrl: imageUrls[7],
    readingTime: '7 min read',
    date: 'Mar 10, 2023',
    authorName: 'Dr. Jason Brooks',
    authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: '9',
    title: 'Nutrition Myths Debunked: Science vs. Marketing',
    excerpt: 'Cut through the noise and learn what current nutrition research actually says about healthy eating for fitness.',
    category: 'Nutrition',
    imageUrl: imageUrls[8],
    readingTime: '10 min read',
    date: 'Feb 28, 2023',
    authorName: 'Alex Thompson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
];

export const journeyPosts = [
  {
    id: 'j1',
    title: 'Starting My Fitness Journey: Week 1 Reflections',
    content: 'The first week is always the hardest. Here are my honest thoughts about beginning a new fitness routine and the unexpected challenges I faced.',
    date: 'Jan 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'j2',
    title: '3 Months In: Celebrating Small Victories',
    content: 'Three months of consistent training has taught me the importance of recognizing small improvements. Here's what I've learned about progress.',
    date: 'Apr 22, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'j3',
    title: 'Overcoming My First Plateau: Strategies That Worked',
    content: 'After weeks of stalled progress, I finally broke through my training plateau. These are the adjustments that made the difference.',
    date: 'Jul 10, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'j4',
    title: 'Finding Balance: Integrating Fitness Into Daily Life',
    content: 'The challenge of balancing work, social life, and fitness is real. Here's how I've managed to make training a sustainable part of my routine.',
    date: 'Oct 5, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1470468969717-61d5d54fd036?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'j5',
    title: 'One Year Transformation: Mental and Physical Changes',
    content: 'Reflecting on a full year of consistent training and nutrition. The physical changes are visible, but the mental transformation has been even more profound.',
    date: 'Jan 18, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
];

export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return articles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );
};

export const getJourneyPostById = (id: string) => {
  return journeyPosts.find(post => post.id === id);
};
