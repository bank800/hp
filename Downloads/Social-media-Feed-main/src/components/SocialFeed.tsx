// Main Social Feed Component - MVVM pattern with infinite scroll and pull-to-refresh
import React, { useEffect, useRef, useCallback } from 'react';
import { useFeedViewModel } from '@/viewmodels/useFeedViewModel';
import { PostFactory } from './post/PostFactory';
import { Button } from './ui/button';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function SocialFeed() {
  const {
    posts,
    loading,
    refreshing,
    hasMore,
    error,
    loadMore,
    refresh,
    likePost,
    retweetPost,
    bookmarkPost
  } = useFeedViewModel();

  const observerRef = useRef<IntersectionObserver>();
  const lastPostRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore, loadMore]);

  return (
    <div className="min-h-screen bg-social-bg">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Social Feed</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={refresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Feed Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {error && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={index === posts.length - 1 ? lastPostRef : null}
          >
            <PostFactory
              post={post}
              onLike={likePost}
              onRetweet={retweetPost}
              onBookmark={bookmarkPost}
            />
          </div>
        ))}

        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="text-center py-8 text-muted-foreground">
            You've reached the end of the feed
          </div>
        )}
      </div>
    </div>
  );
}