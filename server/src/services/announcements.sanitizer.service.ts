import { Injectable } from '@nestjs/common';
import {
  AnnouncementsRaw,
  AnnouncementsSanitized,
} from 'src/interfaces/announcements.sanitizer.interface';

@Injectable()
export class AnnouncementsSanitizersService {
  sanitizeAnnouncements(input: AnnouncementsRaw[]): AnnouncementsSanitized[] {
    const announcements: AnnouncementsSanitized[] = input.map((val) => ({
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
      target: val.send_to,
      image: val.image.toString('base64'),
    }));

    return announcements;
  }
}
