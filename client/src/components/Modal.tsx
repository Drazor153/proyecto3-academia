import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
	children: React.ReactNode;
	footer: React.ReactNode;
	isOpen: () => boolean;
	onClick?: () => void;
	title: string;
	className?: string;
}

// {children, footer, setIsOpen, title}: ModalProps

function Modal({
	children,
	footer,
	isOpen,
	onClick,
	title,
	className,
}: ModalProps) {
	const darkBgClasses = ['darkBG', ...(isOpen() ? ['open'] : [])];
	const modalClasses = [
		'modal',
		...(className ? [className] : []),
		...(isOpen() ? ['open'] : []),
	];
	return (
		<>
			<div
				// className={`darkBG ${isOpen() ? 'open' : ''}`}
				className={darkBgClasses.join(' ')}
				onClick={onClick}
			/>
			{/* <div className={`modal ${className ?? ''} ${isOpen() ? 'open' : ''}`}> */}
			<div className={modalClasses.join(' ')}>
				<div className='modal-container'>
					<div className='modal-header'>
						<h2 className='modal-title'>{title}</h2>
						<button
							className='modal-close'
							onClick={onClick}
						>
							<AiOutlineClose />
						</button>
					</div>
					<div className='modal-body'>{children}</div>
					<div className='modal-footer'>{footer}</div>
				</div>
			</div>
		</>
	);
}

// interface FooterModalProps {
// 	buttons: { text: string; onClick: () => void }[];
// 	children?: React.ReactNode;
// }

// export function FooterModal({ children }: { children: React.ReactNode }) {
// 	return <div className="modal-footer">{children}</div>;
// }

export default Modal;
