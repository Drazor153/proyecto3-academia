import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import Modal from './Modal';

interface JustificationViewerProps {
	fileName: string;
	onClose: () => void;
}

export default function JustificationViewer({
	fileName,
	onClose,
}: JustificationViewerProps) {
	if (!fileName) return null;
	const url =
		import.meta.env.VITE_API_URL +
		'/pdf/' +
		(fileName.endsWith('.pdf') ? fileName : fileName + '.pdf');

	return (
		<Modal
			isOpen={() => url !== ''}
			onClick={() => onClose()}
			style={{ width: '600px' }}
		>
			<div className='pdf-viewer-container'>
				<Viewer
					fileUrl={url}
					defaultScale={SpecialZoomLevel.PageFit}
				/>
			</div>
		</Modal>
	);
}
