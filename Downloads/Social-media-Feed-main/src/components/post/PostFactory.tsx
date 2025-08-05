// Post Factory Component - Plugin system for different post types
import React from 'react';
import { Post, PostType, isMediaPost, isPollPost } from '@/models/Post';
import { TextPost } from './TextPost';
import { MediaPost } from './MediaPost';
import { PollPost } from './PollPost';

interface PostFactoryProps {
  post: Post;
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

// Factory pattern for rendering different post types
export function PostFactory({ post, onLike, onRetweet, onBookmark }: PostFactoryProps) {
  // Type-safe rendering based on post type
  switch (post.type) {
    case PostType.TEXT:
      return (
        <TextPost 
          post={post} 
          onLike={onLike} 
          onRetweet={onRetweet} 
          onBookmark={onBookmark} 
        />
      );
      
    case PostType.IMAGE:
    case PostType.VIDEO:
      if (isMediaPost(post)) {
        return (
          <MediaPost 
            post={post} 
            onLike={onLike} 
            onRetweet={onRetweet} 
            onBookmark={onBookmark} 
          />
        );
      }
      break;
      
    case PostType.POLL:
      if (isPollPost(post)) {
        return (
          <PollPost 
            post={post} 
            onLike={onLike} 
            onRetweet={onRetweet} 
            onBookmark={onBookmark} 
          />
        );
      }
      break;
      
    case PostType.QUOTE:
      // Quote posts would be implemented here - for now treat as text
      return (
        <TextPost 
          post={{ ...post, type: PostType.TEXT }} 
          onLike={onLike} 
          onRetweet={onRetweet} 
          onBookmark={onBookmark} 
        />
      );
      
    default:
      // Fallback to text post for unknown types
      return (
        <div className="p-4 border border-destructive rounded-xl">
          <p className="text-destructive">Unknown post type</p>
        </div>
      );
  }
}