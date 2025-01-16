export interface SavedLink {
  id: string;
  url: string;
  title: string;
  description?: string;
  thumbnail?: string;
  createdAt: number;
  tags?: string[];
  isRead: boolean;
} 