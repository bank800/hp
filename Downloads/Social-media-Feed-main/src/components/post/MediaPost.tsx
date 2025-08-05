// Media Post Component - Handles posts with images/videos
import React, { useState } from 'react';
import { PostBase } from './PostBase';
import { MediaPost as MediaPostModel } from '@/models/Post';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

interface MediaPostProps {
  post: MediaPostModel;
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export function MediaPost({ post, onLike, onRetweet, onBookmark }: MediaPostProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const processContent = (content: string) => {
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

  const renderMedia = () => {
    if (!post.media || post.media.length === 0) return null;

    return (
      <div className="space-y-3">
        {post.media.map((media) => (
          <div key={media.id} className="relative rounded-xl overflow-hidden">
            {media.type === 'image' ? (
              <div className="relative">
                {!imageLoaded && !imageError && (
                  <div className="aspect-video bg-muted animate-pulse rounded-xl" />
                )}
                <img
                  src={media.url}
                  alt={media.alt || 'Post image'}
                  className={cn(
                    "w-full rounded-xl transition-opacity duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
                {imageError && (
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                    <span className="text-muted-foreground">Failed to load image</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden group cursor-pointer">
                <img
                  src={media.thumbnail || media.url}
                  alt={media.alt || 'Video thumbnail'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 text-black fill-current" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <PostBase 
      post={post} 
      onLike={onLike} 
      onRetweet={onRetweet} 
      onBookmark={onBookmark}
    >
      {post.content && (
        <div className="text-foreground leading-relaxed">
          {processContent(post.content)}
        </div>
      )}
      {renderMedia()}
    </PostBase>
  );
}