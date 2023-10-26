import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
	children: React.ReactNode;
	footer: React.ReactNode;
	isOpen: () => boolean;
	onClick?: () => void;
	title: string;
}

// {children, footer, setIsOpen, title}: ModalProps

function Modal({ children, footer, isOpen, onClick, title }: ModalProps) {
	return (
		<>
			<div
				className={`darkBG ${isOpen() ? 'open' : ''}`}
				onClick={onClick}
			/>
			<div className={`modal ${isOpen() ? 'open' : ''}`}>
				<div className="modal-container">
					<div className="modal-header">
						<h2 className="modal-title">{title}</h2>
						<button
							className="modal-close"
							onClick={onClick}
						>
							<AiOutlineClose />
						</button>
					</div>
					<div className="modal-body">{children}</div>
					<div className="modal-footer">{footer}</div>
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
