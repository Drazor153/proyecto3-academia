export interface AnnouncementsRaw {
  id: number;
  run: number;
  title: string;
  content: string;
  image: Buffer;
  send_to: string[];
  category: string;
  created_at: Date;
  updated_at: Date;
  expires_at: Date;
  user: {
    name: string;
    first_surname: string;
  };
}

export interface AnnouncementsSanitized {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  target: string[];
  image: string;
  author: {
    name: string;
    first_surname: string;
  };
}
