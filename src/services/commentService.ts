// 留言管理服務

import type { Comment } from '@/types/comment';

const STORAGE_KEY = 'yunlin_comments';
const MAX_COMMENTS = 500; // 最多存儲 500 條留言

class CommentService {
  /**
   * 獲取所有留言
   */
  getAllComments(): Comment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const comments = JSON.parse(data);
        return comments.map((c: any) => ({
          ...c,
          timestamp: new Date(c.timestamp),
          replies: c.replies?.map((r: any) => ({
            ...r,
            timestamp: new Date(r.timestamp),
          })),
        }));
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
    return [];
  }

  /**
   * 保存留言
   */
  private saveComments(comments: Comment[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  }

  /**
   * 獲取地點的留言
   */
  getCommentsByLocation(locationId: string): Comment[] {
    return this.getAllComments()
      .filter((c) => c.locationId === locationId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * 發布留言
   */
  postComment(
    locationId: string,
    username: string,
    level: number,
    content: string
  ): Comment {
    const comments = this.getAllComments();

    const comment: Comment = {
      id: `comment_${Date.now()}`,
      locationId,
      username,
      level,
      content,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    };

    comments.unshift(comment); // 新留言放在最前面

    // 限制留言數量
    if (comments.length > MAX_COMMENTS) {
      comments.splice(MAX_COMMENTS);
    }

    this.saveComments(comments);
    return comment;
  }

  /**
   * 點讚留言
   */
  likeComment(commentId: string): boolean {
    const comments = this.getAllComments();
    const comment = comments.find((c) => c.id === commentId);

    if (comment) {
      comment.likes++;
      this.saveComments(comments);
      return true;
    }

    return false;
  }

  /**
   * 刪除留言
   */
  deleteComment(commentId: string): boolean {
    let comments = this.getAllComments();
    const initialLength = comments.length;

    comments = comments.filter((c) => c.id !== commentId);

    if (comments.length < initialLength) {
      this.saveComments(comments);
      return true;
    }

    return false;
  }
}

export const commentService = new CommentService();
