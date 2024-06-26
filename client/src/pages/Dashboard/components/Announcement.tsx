import Avatar from 'react-avatar';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { t } from 'i18next';
import { AnnouncementType } from '../../../utils/types';

interface AnnouncementProps {
  announcement: AnnouncementType;
  // categories: { value: number; label: string }[];
}

function Announcement({ announcement }: AnnouncementProps) {
  const [expanded, setExpanded] = useState(false);

  const {
    title,
    content,
    author,
    category: { name },
    createdAt,
    image,
  } = announcement;

  const handlerClick = () => {
    setExpanded(!expanded);
  };

  const createdAtArg = createdAt ? createdAt : Date.now();

  return (
    <article className={`announcement ${expanded ? 'expanded' : ''}`}>
      <header>
        <div className="author">
          <Avatar
            className="avatar"
            title={author.name}
            round
            name={author.name}
            alt={author.name}
          />
          <p>{`${author.name} ${author.first_surname}`}</p>
        </div>
        <h2 className="title">{title}</h2>
      </header>
      <div className={`body ${expanded ? 'expanded' : ''}`}>
        <div className="content">
          {content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {image && (
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt={title}
          />
        )}
      </div>
      <hr />
      <footer>
        <p className="date">
          {`${t('published')}: ${new Date(createdAtArg).toLocaleDateString(
            'es-CL',
            {
              timeZone: 'UTC',
            },
          )}`}
          {/* {t('date')}
					{': '}
					{createdAt} */}
        </p>
        <p className="categories">
          {/* {categories.map((tag, index) => ( */}
          <span
            key={name}
            className="category"
          >
            {t(name)}
          </span>
          {/* ))} */}
        </p>
        <IoIosArrowDown
          onClick={handlerClick}
          className={`ioIosArrowDown ${expanded ? 'rotate' : ''}`}
        />
      </footer>
    </article>
  );
}

export default Announcement;
