// Text Post Component - Handles text-only posts
import React from 'react';
import { PostBase } from './PostBase';
import { TextPost as TextPostModel } from '@/models/Post';

interface TextPostProps {
  post: TextPostModel;
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export function TextPost({ post, onLike, onRetweet, onBookmark }: TextPostProps) {
  const processContent = (content: string) => {
    // Simple hashtag and mention highlighting
    return content
      .split(/(\s+)/)
      .map((part, index) => {
        if (part.startsWith('#')) {
          return (
            <span key={index} className="text-primary hover:underline cursor-pointer">
              {part}
            </span>
          );
        }
        if (part.startsWith('@')) {
          return (
            <span key={index} className="text-primary hover:underline cursor-pointer">
              {part}
            </span>
          );
        }
        return part;
      });
  };

  return (
    <PostBase 
      post={post} 
      onLike={onLike} 
      onRetweet={onRetweet} 
      onBookmark={onBookmark}
    >
      <div className="text-foreground leading-relaxed">
        {processContent(post.content)}
      </div>
    </PostBase>
  );
}