// 留言類型定義

export interface Comment {
  id: string;
  locationId: string;
  username: string;
  level: number;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}
