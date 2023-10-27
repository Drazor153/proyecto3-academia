import { Injectable } from '@nestjs/common';
import { AnnouncementsSanitized } from 'src/interfaces/announcements.sanitizer.interface';

@Injectable()
export class AnnouncementsSanitizersService {
  sanitizeAnnouncements(input: any): AnnouncementsSanitized[] {
    const announcements: AnnouncementsSanitized[] = input.map((val: any) => ({
      id: val.id,
      title: val.title,
      content: val.content,
      category: val.category,
      author: {
        name: val.user.name,
        first_surname: val.user.first_surname,
      },
      createdAt: val.created_at,
      updatedAt: val.updated_at,
      expiresAt: val.expires_at,
      target: val.send_to.map((send_to: any) => ({
        id: send_to.target.id,
        name: send_to.target.name,
      })),
      image: val.image.toString('base64'),
    }));

    return announcements;
  }
}
