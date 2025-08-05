// Service Layer - Data access and API simulation
import { Post, PostType, User, MediaPost, TextPost, PollPost } from '../models/Post';

// Mock data for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    displayName: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: true,
    bio: 'Software Engineer | Tech enthusiast'
  },
  {
    id: '2',
    username: 'sarahchen',
    displayName: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c1?w=150&h=150&fit=crop&crop=face',
    verified: false,
    bio: 'Designer & Creative Director'
  },
  {
    id: '3',
    username: 'alextech',
    displayName: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: true,
    bio: 'Startup founder | Innovation advocate'
  },
  {
    id: '4',
    username: 'emilydesign',
    displayName: 'Emily Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    verified: false,
    bio: 'UX Designer | Digital artist'
  }
];

const sampleTexts = [
  "Just shipped a new feature! The team worked incredibly hard to make this happen. Excited to see how users respond to the improved experience. #ProductLaunch #TeamWork",
  "Beautiful sunset today reminds me why I love working remotely. There's something magical about ending the workday with nature's best show. 🌅 #RemoteWork #Nature",
  "Hot take: The best code is the code you don't have to write. Sometimes the most elegant solution is the simplest one. What's your philosophy on this? #CodingPhilosophy",
  "Coffee shop WiFi is down, but sometimes the best ideas come when you're forced to think without distractions. Old school brainstorming with pen and paper! ☕️ #Productivity",
  "Attending an amazing conference today. The speakers are sharing incredible insights about the future of technology. Taking lots of notes! #TechConference #Learning"
];

const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateMockPost = (index: number): Post => {
  const user = mockUsers[index % mockUsers.length];
  const basePost = {
    id: `post-${index}`,
    author: user,
    createdAt: new Date(Date.now() - Math.random() * 86400000 * 7), // Random date within last week
    stats: {
      likes: Math.floor(Math.random() * 1000),
      retweets: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 200),
      views: Math.floor(Math.random() * 10000)
    },
    interactions: {
      liked: Math.random() > 0.7,
      retweeted: Math.random() > 0.9,
      bookmarked: Math.random() > 0.8
    },
    hashtags: ['#technology', '#innovation', '#design'].filter(() => Math.random() > 0.5),
    mentions: ['@johndoe', '@sarahchen'].filter(() => Math.random() > 0.7)
  };

  // Randomly generate different post types
  const rand = Math.random();
  
  if (rand < 0.6) {
    // Text post
    return {
      ...basePost,
      type: PostType.TEXT,
      content: sampleTexts[index % sampleTexts.length]
    } as TextPost;
  } else if (rand < 0.9) {
    // Media post
    return {
      ...basePost,
      type: PostType.IMAGE,
      content: sampleTexts[index % sampleTexts.length],
      media: [{
        id: `media-${index}`,
        type: 'image' as const,
        url: sampleImages[index % sampleImages.length],
        alt: 'Beautiful landscape photo',
        width: 600,
        height: 400
      }]
    } as MediaPost;
  } else {
    // Poll post
    return {
      ...basePost,
      type: PostType.POLL,
      content: "What's your favorite programming language for web development?",
      pollOptions: [
        { id: 'opt1', text: 'JavaScript/TypeScript', votes: 45 },
        { id: 'opt2', text: 'Python', votes: 23 },
        { id: 'opt3', text: 'Go', votes: 18 },
        { id: 'opt4', text: 'Rust', votes: 14 }
      ],
      pollEndsAt: new Date(Date.now() + 86400000), // 24 hours from now
      userVote: Math.random() > 0.5 ? 'opt1' : undefined
    } as PollPost;
  }
};

export const mockDataService = {
  async getPosts(page: number = 0, limit: number = 10): Promise<Post[]> {
    await delay(800); // Simulate network delay
    
    const startIndex = page * limit;
    const posts: Post[] = [];
    
    for (let i = startIndex; i < startIndex + limit; i++) {
      posts.push(generateMockPost(i));
    }
    
    return posts;
  },

  async likePost(postId: string): Promise<void> {
    await delay(200);
    // In a real app, this would make an API call
    console.log(`Liked post: ${postId}`);
  },

  async retweetPost(postId: string): Promise<void> {
    await delay(200);
    // In a real app, this would make an API call
    console.log(`Retweeted post: ${postId}`);
  },

  async bookmarkPost(postId: string): Promise<void> {
    await delay(200);
    // In a real app, this would make an API call
    console.log(`Bookmarked post: ${postId}`);
  }
};