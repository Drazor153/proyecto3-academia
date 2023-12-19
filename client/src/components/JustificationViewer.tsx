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
			title=''
			isOpen={() => url !== ''}
			onClick={() => onClose()}
			footer={<></>}
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
