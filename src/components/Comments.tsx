// 留言組件

import { useState, useEffect } from 'react';
import { commentService } from '@/services/commentService';
import { useGame } from '@/hooks/useGame';
import type { Comment } from '@/types/comment';

interface CommentsProps {
  locationId: string;
}

export default function Comments({ locationId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { level } = useGame();

  useEffect(() => {
    loadComments();
  }, [locationId]);

  const loadComments = () => {
    const locationComments = commentService.getCommentsByLocation(locationId);
    setComments(locationComments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const username = `探險家${level}`;
      commentService.postComment(locationId, username, level, newComment.trim());
      setNewComment('');
      loadComments();
    } catch (error) {
      console.error('留言發布失敗:', error);
      alert('留言發布失敗，請重試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (commentId: string) => {
    commentService.likeComment(commentId);
    loadComments();
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '剛剛';
    if (minutes < 60) return `${minutes}分鐘前`;
    if (hours < 24) return `${hours}小時前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-TW');
  };

  return (
    <div className="retro-card p-6 border-2 border-neon-cyan/50">
      <h3 className="text-2xl font-retro font-black mb-6 neon-text-cyan">
        <i className="fas fa-comments mr-2" aria-hidden="true"></i>
        留言板 ({comments.length})
      </h3>

      {/* 發布留言 */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="分享你的探索體驗..."
          maxLength={500}
          className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg text-white focus:border-neon-cyan transition-colors resize-none font-retro"
          rows={4}
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400 font-retro">{newComment.length}/500</span>
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="retro-button px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                發布中...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane mr-2" aria-hidden="true"></i>
                發布
              </>
            )}
          </button>
        </div>
      </form>

      {/* 留言列表 */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-neon-cyan/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center border-2 border-neon-cyan">
                    <i className="fas fa-user text-white text-sm" aria-hidden="true"></i>
                  </div>
                  <div>
                    <div className="text-white font-retro font-bold">{comment.username}</div>
                    <div className="text-xs text-gray-400">
                      Lv.{comment.level} • {formatTime(comment.timestamp)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center space-x-1 text-neon-pink hover:scale-110 transition-transform"
                >
                  <i className="fas fa-heart" aria-hidden="true"></i>
                  <span className="text-sm font-retro">{comment.likes}</span>
                </button>
              </div>

              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-comment-slash text-5xl text-gray-600 mb-4" aria-hidden="true"></i>
            <p className="text-gray-400 font-retro">還沒有留言，快來搶第一個留言吧！</p>
          </div>
        )}
      </div>
    </div>
  );
}
