
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
    content: "Muscle hypertrophy is the scientific term for muscle growth. This process occurs when muscle fibers are damaged during resistance training and then repair themselves to become larger and stronger. The key factors that influence hypertrophy include progressive overload, proper nutrition (especially protein intake), adequate recovery, and hormonal balance. To optimize your training for hypertrophy, focus on compound movements with moderate to heavy weights, aim for 8-12 repetitions per set, and ensure you're providing your body with the necessary nutrition and recovery time.",
    category: 'Training',
    imageUrl: imageUrls[0],
    readingTime: '8 min read',
    date: 'Jun 12, 2023',
    authorName: 'Dr. Sarah Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '2',
    title: 'Nutrition Timing: When to Eat for Optimal Performance',
    excerpt: 'Learn how strategic meal timing can enhance your workout performance, recovery, and overall fitness progress.',
    content: "Nutrition timing refers to strategically consuming certain nutrients at specific times to maximize workout performance and recovery. Pre-workout nutrition (1-3 hours before exercise) should focus on easily digestible carbohydrates for energy and some protein. Post-workout nutrition (within 45 minutes after exercise) should emphasize protein for muscle repair and carbohydrates to replenish glycogen stores. Throughout the day, maintain a balanced diet that supports your overall caloric and macronutrient needs based on your fitness goals. Remember that consistency in your overall nutrition is more important than perfect timing.",
    category: 'Nutrition',
    imageUrl: imageUrls[1],
    readingTime: '6 min read',
    date: 'May 28, 2023',
    authorName: 'Michael Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: '3',
    title: 'The Ultimate Guide to Plant-Based Protein Sources',
    excerpt: 'Discover how to meet your protein needs with plant-based foods and build muscle on a vegetarian or vegan diet.',
    content: "Building muscle on a plant-based diet is absolutely achievable with proper planning. High-quality plant protein sources include legumes (beans, lentils, chickpeas), tofu and tempeh, seitan, nutritional yeast, and various plant protein powders (pea, hemp, rice). To maximize muscle growth on a plant-based diet, focus on consuming a variety of protein sources to obtain all essential amino acids, slightly increase your protein intake compared to omnivores (due to lower digestibility), and time your protein intake around workouts. Supplements like creatine and vitamin B12 may be beneficial for plant-based athletes.",
    category: 'Nutrition',
    imageUrl: imageUrls[2],
    readingTime: '7 min read',
    date: 'May 15, 2023',
    authorName: 'Emily Rodriguez',
    authorAvatar: 'https://randomuser.me/api/portraits/women/63.jpg'
  },
  {
    id: '4',
    title: 'Mindfulness and Fitness: The Mental Side of Physical Training',
    excerpt: 'Explore how mindfulness practices can enhance your workout efficiency, recovery, and long-term fitness journey.',
    content: "Mindfulness—the practice of being fully present and engaged in the current moment—can significantly enhance your fitness journey. During workouts, mindfulness improves mind-muscle connection, leading to better form and potentially greater muscle activation. Mindful breathing techniques can help optimize performance and reduce stress. Between workouts, mindfulness practices like meditation can enhance recovery by reducing stress hormones and improving sleep quality. Mindfulness also helps maintain consistency in your fitness routine by increasing awareness of your internal motivations and reducing impulsive decisions that may derail your progress.",
    category: 'Wellness',
    imageUrl: imageUrls[3],
    readingTime: '5 min read',
    date: 'Apr 30, 2023',
    authorName: 'James Wilson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/52.jpg'
  },
  {
    id: '5',
    title: 'Recovery Strategies: Sleep, Active Rest, and Regeneration',
    excerpt: 'Learn why recovery is just as important as training and how to optimize your rest days for better results.',
    content: "Recovery is when fitness adaptations actually occur—your body rebuilds and strengthens in response to training stress. Quality sleep (7-9 hours) is the foundation of recovery, as growth hormone and tissue repair processes peak during deep sleep. Active recovery (light movement on rest days) enhances blood flow and nutrient delivery to muscles. Proper nutrition, particularly protein timing and adequate carbohydrates, supports the recovery process. Stress management techniques, contrast therapy (alternating hot and cold), and appropriate supplementation can further enhance recovery. Remember that more training isn't always better—strategic recovery is essential for continued progress.",
    category: 'Recovery',
    imageUrl: imageUrls[4],
    readingTime: '9 min read',
    date: 'Apr 18, 2023',
    authorName: 'Dr. Lisa Patel',
    authorAvatar: 'https://randomuser.me/api/portraits/women/22.jpg'
  },
  {
    id: '6',
    title: 'The Truth About Cardio: Benefits Beyond Weight Loss',
    excerpt: "Understand how cardiovascular exercise affects your body and mind, and why it's essential even if weight loss isn't your goal.",
    content: "Cardiovascular exercise offers numerous benefits beyond calorie burning, including improved heart and lung function, enhanced cognitive performance, and better mood through endorphin release. Regular cardio increases mitochondrial density, improving your body's ability to use oxygen and generate energy. It also stimulates the growth of new brain cells, particularly in the hippocampus (memory center). For strength athletes, moderate cardio can enhance recovery by increasing blood flow without overtaxing the muscles. The key is finding the right type and amount of cardio that complements your primary fitness goals rather than detracting from them.",
    category: 'Cardio',
    imageUrl: imageUrls[5],
    readingTime: '6 min read',
    date: 'Apr 5, 2023',
    authorName: 'Robert Taylor',
    authorAvatar: 'https://randomuser.me/api/portraits/men/67.jpg'
  },
  {
    id: '7',
    title: 'Gut Health and Exercise: The Microbiome Connection',
    excerpt: 'Discover the fascinating relationship between your gut bacteria, exercise performance, and overall wellness.',
    content: "The gut microbiome—the trillions of bacteria living in your digestive tract—plays a crucial role in exercise performance and recovery. Regular exercise increases beneficial gut bacteria diversity, which improves digestion, nutrient absorption, and immune function. Conversely, the composition of your gut microbiome affects how efficiently you use energy during exercise and how quickly you recover afterward. To support a healthy gut microbiome, consume a variety of fiber-rich plant foods, fermented foods (yogurt, kefir, sauerkraut), and avoid excessive use of antibiotics and antibacterial products when possible. Proper hydration and stress management also support gut health.",
    category: 'Wellness',
    imageUrl: imageUrls[6],
    readingTime: '8 min read',
    date: 'Mar 22, 2023',
    authorName: 'Sophia Martinez',
    authorAvatar: 'https://randomuser.me/api/portraits/women/12.jpg'
  },
  {
    id: '8',
    title: 'Strength Training for Longevity: Exercise as Medicine',
    excerpt: 'Learn how regular strength training can add years to your life and improve quality of life as you age.',
    content: "Strength training is increasingly recognized as essential for healthy aging. Regular resistance exercise helps maintain muscle mass (which naturally declines with age), strengthens bones, improves insulin sensitivity, and enhances balance and coordination (reducing fall risk). Studies show that maintaining muscle strength is associated with lower all-cause mortality rates, regardless of age. To incorporate strength training for longevity, focus on compound movements that work multiple muscle groups, prioritize proper form over heavy weights, and aim for consistency (2-3 sessions per week) rather than intensity. It's never too late to start—research shows benefits from strength training beginning at any age.",
    category: 'Training',
    imageUrl: imageUrls[7],
    readingTime: '7 min read',
    date: 'Mar 10, 2023',
    authorName: 'Dr. Jason Brooks',
    authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    id: '9',
    title: 'Nutrition Myths Debunked: Science vs. Marketing',
    excerpt: 'Cut through the noise and learn what current nutrition research actually says about healthy eating for fitness.',
    content: 'The nutrition industry is rife with misinformation driven by marketing rather than science. Common myths include: 1) The need to eat every 2-3 hours to "stoke metabolism" (research shows meal frequency has minimal impact on metabolic rate), 2) The idea that certain foods like celery are "negative calorie" (while some foods have high thermic effects, none actually result in negative calories), 3) The notion that supplements are necessary for optimal fitness (most nutrients are better obtained from whole foods), and 4) The belief that detoxes or cleanses are needed to eliminate toxins (your liver and kidneys handle this effectively without special products). The best nutrition approach focuses on whole foods, appropriate energy balance, and consistency rather than quick fixes or extreme protocols.',
    category: 'Nutrition',
    imageUrl: imageUrls[8],
    readingTime: '10 min read',
    date: 'Feb 28, 2023',
    authorName: 'Alex Thompson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/32.jpg'
  }
];

export const journeyPosts = [
  {
    id: 'j1',
    title: 'Starting My Fitness Journey: Week 1 Reflections',
    content: 'The first week is always the hardest. Here are my honest thoughts about beginning a new fitness routine and the unexpected challenges I faced.',
    date: 'Jan 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'j2',
    title: '3 Months In: Celebrating Small Victories',
    content: "Three months of consistent training has taught me the importance of recognizing small improvements. Here's what I've learned about progress.",
    date: 'Apr 22, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'j3',
    title: 'Overcoming My First Plateau: Strategies That Worked',
    content: 'After weeks of stalled progress, I finally broke through my training plateau. These are the adjustments that made the difference.',
    date: 'Jul 10, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'j4',
    title: 'Finding Balance: Integrating Fitness Into Daily Life',
    content: "The challenge of balancing work, social life, and fitness is real. Here's how I've managed to make training a sustainable part of my routine.",
    date: 'Oct 5, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1470468969717-61d5d54fd036?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'j5',
    title: 'One Year Transformation: Mental and Physical Changes',
    content: 'Reflecting on a full year of consistent training and nutrition. The physical changes are visible, but the mental transformation has been even more profound.',
    date: 'Jan 18, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }
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
