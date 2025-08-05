// Data Models - Clean separation of data structures

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  bio?: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface PostStats {
  likes: number;
  retweets: number;
  comments: number;
  views: number;
}

export interface PostInteractions {
  liked: boolean;
  retweeted: boolean;
  bookmarked: boolean;
}

export enum PostType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  POLL = 'poll',
  QUOTE = 'quote'
}

export interface BasePost {
  id: string;
  type: PostType;
  content: string;
  author: User;
  createdAt: Date;
  stats: PostStats;
  interactions: PostInteractions;
  hashtags: string[];
  mentions: string[];
}

export interface TextPost extends BasePost {
  type: PostType.TEXT;
}

export interface MediaPost extends BasePost {
  type: PostType.IMAGE | PostType.VIDEO;
  media: MediaItem[];
}

export interface PollPost extends BasePost {
  type: PostType.POLL;
  pollOptions: {
    id: string;
    text: string;
    votes: number;
  }[];
  pollEndsAt: Date;
  userVote?: string;
}

export interface QuotePost extends BasePost {
  type: PostType.QUOTE;
  quotedPost: Post;
}

export type Post = TextPost | MediaPost | PollPost | QuotePost;

// Type guards for posts
export const isMediaPost = (post: Post): post is MediaPost => 
  post.type === PostType.IMAGE || post.type === PostType.VIDEO;

export const isPollPost = (post: Post): post is PollPost => 
  post.type === PostType.POLL;

export const isQuotePost = (post: Post): post is QuotePost => 
  post.type === PostType.QUOTE;