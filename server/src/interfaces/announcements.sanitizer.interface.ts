export interface AnnouncementsSanitized {
  id: number;
  title: string;
  content: string;
  category: {
    id: number;
    name: string;
  };
  author: {
    name: string;
    first_surname: string;
  };
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  target: {
    id: number;
    name: string;
  }[];
  image: string;
}
