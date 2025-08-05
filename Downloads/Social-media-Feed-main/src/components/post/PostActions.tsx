// Post Actions Component - Like, retweet, comment, bookmark actions
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Repeat2, Bookmark, Share } from 'lucide-react';
import { Post } from '@/models/Post';
import { cn } from '@/lib/utils';

interface PostActionsProps {
  post: Post;
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export function PostActions({ post, onLike, onRetweet, onBookmark }: PostActionsProps) {
  const { stats, interactions, id } = post;

  const formatCount = (count: number): string => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="flex items-center justify-between max-w-md">
      {/* Comment */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth h-8 px-3"
      >
        <MessageCircle className="h-4 w-4 mr-1" />
        <span className="text-sm">{formatCount(stats.comments)}</span>
      </Button>

      {/* Retweet */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={(e) => {
          e.stopPropagation();
          onRetweet(id);
        }}
        className={cn(
          "text-muted-foreground hover:text-social-retweet hover:bg-social-retweet/10 transition-smooth h-8 px-3",
          interactions.retweeted && "text-social-retweet"
        )}
      >
        <Repeat2 className="h-4 w-4 mr-1" />
        <span className="text-sm">{formatCount(stats.retweets)}</span>
      </Button>

      {/* Like */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={(e) => {
          e.stopPropagation();
          onLike(id);
        }}
        className={cn(
          "text-muted-foreground hover:text-social-like hover:bg-social-like/10 transition-bounce h-8 px-3",
          interactions.liked && "text-social-like"
        )}
      >
        <Heart 
          className={cn(
            "h-4 w-4 mr-1 transition-bounce",
            interactions.liked && "fill-current"
          )} 
        />
        <span className="text-sm">{formatCount(stats.likes)}</span>
      </Button>

      {/* Views */}
      <span className="text-muted-foreground text-sm px-3">
        {formatCount(stats.views)} views
      </span>

      {/* Bookmark */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={(e) => {
          e.stopPropagation();
          onBookmark(id);
        }}
        className={cn(
          "text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth h-8 px-2",
          interactions.bookmarked && "text-primary"
        )}
      >
        <Bookmark 
          className={cn(
            "h-4 w-4",
            interactions.bookmarked && "fill-current"
          )} 
        />
      </Button>

      {/* Share */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth h-8 px-2"
      >
        <Share className="h-4 w-4" />
      </Button>
    </div>
  );
}