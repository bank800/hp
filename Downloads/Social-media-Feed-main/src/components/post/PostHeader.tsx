// Post Header Component - User info and timestamp
import React from 'react';
import { AvatarEnhanced } from '@/components/ui/avatar-enhanced';
import { Post } from '@/models/Post';
import { formatDistanceToNow } from 'date-fns';

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const { author, createdAt } = post;
  
  return (
    <div className="flex items-start space-x-3">
      <AvatarEnhanced 
        src={author.avatar}
        alt={author.displayName}
        fallback={author.displayName.charAt(0)}
        verified={author.verified}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-foreground truncate">
            {author.displayName}
          </h3>
          <span className="text-muted-foreground text-sm">
            @{author.username}
          </span>
          <span className="text-muted-foreground text-sm">·</span>
          <time className="text-muted-foreground text-sm" dateTime={createdAt.toISOString()}>
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </time>
        </div>
        {author.bio && (
          <p className="text-muted-foreground text-sm mt-1 truncate">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}