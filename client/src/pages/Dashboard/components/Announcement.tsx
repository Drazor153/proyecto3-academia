import Avatar from 'react-avatar';
import { AnnouncementType } from '../types';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { t } from 'i18next';

interface AnnouncementProps {
	announcement: AnnouncementType;
	index: number;
	children?: React.ReactNode;
}

function Announcement({ announcement, index }: AnnouncementProps) {
	const [expanded, setExpanded] = useState(false);

	const { title, content, author, tags, createdAt, image } = announcement;

	const handlerClick = () => {
		setExpanded(!expanded);
	};

	return (
		<article
			className={`announcement ${expanded ? 'expanded' : ''}`}
			test-n={index}
		>
			<header>
				<div className="author">
					<Avatar
						className="avatar"
						title={author}
						round
						name={author}
						alt={author}
					/>
					<p>{author}</p>
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
						src={image}
						alt={title}
					/>
				)}
			</div>
			<hr />
			<footer>
				<p className="date">
					{t('date')}
					{': '}
					{createdAt.toLocaleDateString('es-CL', {
						timeZone: 'UTC',
					})}
				</p>
				<p className="tags">
					{tags.map((tag, index) => (
						<span
							key={index}
							className="tag"
						>
							{tag}
						</span>
					))}
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
