// ViewModel Layer - Custom hooks for state management and business logic
import { useState, useEffect, useCallback, useRef } from 'react';
import { Post, PostType, PostStats, PostInteractions } from '../models/Post';
import { mockDataService } from '../services/mockDataService';

export interface FeedState {
  posts: Post[];
  loading: boolean;
  refreshing: boolean;
  hasMore: boolean;
  error: string | null;
}

export interface FeedActions {
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  retweetPost: (postId: string) => Promise<void>;
  bookmarkPost: (postId: string) => Promise<void>;
}

// Custom hook implementing ViewModel pattern
export const useFeedViewModel = (): FeedState & FeedActions => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const pageRef = useRef(0);
  const loadingRef = useRef(false);

  // Load initial posts
  useEffect(() => {
    loadMore();
  }, []);

  // Load more posts - implements infinite scrolling
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const newPosts = await mockDataService.getPosts(pageRef.current, 10);
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        pageRef.current += 1;
      }
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [hasMore]);

  // Refresh feed - implements pull-to-refresh
  const refresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    pageRef.current = 0;
    setHasMore(true);

    try {
      const freshPosts = await mockDataService.getPosts(0, 10);
      setPosts(freshPosts);
      pageRef.current = 1;
    } catch (err) {
      setError('Failed to refresh feed. Please try again.');
      console.error('Error refreshing feed:', err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Post interactions - optimistic updates
  const updatePostInteraction = useCallback((
    postId: string, 
    updateFn: (stats: PostStats, interactions: PostInteractions) => { stats: PostStats; interactions: PostInteractions }
  ) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const { stats, interactions } = updateFn(post.stats, post.interactions);
        return { ...post, stats, interactions };
      }
      return post;
    }));
  }, []);

  const likePost = useCallback(async (postId: string) => {
    // Optimistic update
    updatePostInteraction(postId, (stats, interactions) => ({
      stats: { 
        ...stats, 
        likes: interactions.liked ? stats.likes - 1 : stats.likes + 1 
      },
      interactions: { 
        ...interactions, 
        liked: !interactions.liked 
      }
    }));

    try {
      await mockDataService.likePost(postId);
    } catch (err) {
      // Revert optimistic update on error
      updatePostInteraction(postId, (stats, interactions) => ({
        stats: { 
          ...stats, 
          likes: interactions.liked ? stats.likes - 1 : stats.likes + 1 
        },
        interactions: { 
          ...interactions, 
          liked: !interactions.liked 
        }
      }));
      console.error('Error liking post:', err);
    }
  }, [updatePostInteraction]);

  const retweetPost = useCallback(async (postId: string) => {
    // Optimistic update
    updatePostInteraction(postId, (stats, interactions) => ({
      stats: { 
        ...stats, 
        retweets: interactions.retweeted ? stats.retweets - 1 : stats.retweets + 1 
      },
      interactions: { 
        ...interactions, 
        retweeted: !interactions.retweeted 
      }
    }));

    try {
      await mockDataService.retweetPost(postId);
    } catch (err) {
      // Revert optimistic update on error
      updatePostInteraction(postId, (stats, interactions) => ({
        stats: { 
          ...stats, 
          retweets: interactions.retweeted ? stats.retweets - 1 : stats.retweets + 1 
        },
        interactions: { 
          ...interactions, 
          retweeted: !interactions.retweeted 
        }
      }));
      console.error('Error retweeting post:', err);
    }
  }, [updatePostInteraction]);

  const bookmarkPost = useCallback(async (postId: string) => {
    // Optimistic update
    updatePostInteraction(postId, (stats, interactions) => ({
      stats,
      interactions: { 
        ...interactions, 
        bookmarked: !interactions.bookmarked 
      }
    }));

    try {
      await mockDataService.bookmarkPost(postId);
    } catch (err) {
      // Revert optimistic update on error
      updatePostInteraction(postId, (stats, interactions) => ({
        stats,
        interactions: { 
          ...interactions, 
          bookmarked: !interactions.bookmarked 
        }
      }));
      console.error('Error bookmarking post:', err);
    }
  }, [updatePostInteraction]);

  return {
    // State
    posts,
    loading,
    refreshing,
    hasMore,
    error,
    // Actions
    loadMore,
    refresh,
    likePost,
    retweetPost,
    bookmarkPost
  };
};