// Base Post Component - Provides common post structure and styling
import React from 'react';
import { Card } from '@/components/ui/card';
import { AvatarEnhanced } from '@/components/ui/avatar-enhanced';
import { PostHeader } from './PostHeader';
import { PostActions } from './PostActions';
import { Post } from '@/models/Post';
import { cn } from '@/lib/utils';

interface PostBaseProps {
  post: Post;
  children: React.ReactNode;
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
  onBookmark: (postId: string) => void;
  className?: string;
}

export function PostBase({ 
  post, 
  children, 
  onLike, 
  onRetweet, 
  onBookmark,
  className 
}: PostBaseProps) {
  return (
    <Card className={cn(
      "border-0 shadow-card hover:shadow-hover transition-smooth bg-social-card",
      "hover:bg-social-hover cursor-pointer group",
      className
    )}>
      <div className="p-4 space-y-3">
        {/* Post Header */}
        <PostHeader post={post} />
        
        {/* Post Content - Provided by specific post type components */}
        <div className="space-y-3">
          {children}
        </div>
        
        {/* Post Actions */}
        <PostActions 
          post={post}
          onLike={onLike}
          onRetweet={onRetweet}
          onBookmark={onBookmark}
        />
      </div>
    </Card>
  );
}