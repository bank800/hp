// Poll Post Component - Handles poll posts with voting
import React from 'react';
import { PostBase } from './PostBase';
import { PollPost as PollPostModel } from '@/models/Post';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PollPostProps {
  post: PollPostModel;
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export function PollPost({ post, onLike, onRetweet, onBookmark }: PollPostProps) {
  const totalVotes = post.pollOptions.reduce((sum, option) => sum + option.votes, 0);
  const hasVoted = !!post.userVote;
  const pollEnded = new Date() > post.pollEndsAt;

  const handleVote = (optionId: string) => {
    if (hasVoted || pollEnded) return;
    // In a real app, this would trigger a vote action
    console.log(`Voting for option: ${optionId}`);
  };

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

  const getTimeRemaining = () => {
    if (pollEnded) return 'Poll ended';
    
    const now = new Date();
    const timeLeft = post.pollEndsAt.getTime() - now.getTime();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  return (
    <PostBase 
      post={post} 
      onLike={onLike} 
      onRetweet={onRetweet} 
      onBookmark={onBookmark}
    >
      <div className="text-foreground leading-relaxed mb-4">
        {processContent(post.content)}
      </div>
      
      <div className="border border-border rounded-xl p-4 space-y-3">
        {post.pollOptions.map((option) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isSelected = post.userVote === option.id;
          const showResults = hasVoted || pollEnded;
          
          return (
            <div key={option.id}>
              {showResults ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{option.text}</span>
                      {isSelected && (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <span className="text-sm font-semibold">{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {option.votes.toLocaleString()} votes
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left h-auto p-3",
                    "hover:bg-primary/5 hover:border-primary transition-smooth"
                  )}
                  onClick={() => handleVote(option.id)}
                >
                  {option.text}
                </Button>
              )}
            </div>
          );
        })}
        
        <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-3">
          <span>{totalVotes.toLocaleString()} votes</span>
          <span>{getTimeRemaining()}</span>
        </div>
      </div>
    </PostBase>
  );
}