import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import Modal from './Modal';

interface JustificationViewerProps {
	fileName: string;
	onClose: () => void;
}

export default function fileName({
	fileName,
	onClose,
}: JustificationViewerProps) {
	if (!fileName) return null;
	const url = import.meta.env.VITE_SERVER_HOST + '/pdf/' + fileName;

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
