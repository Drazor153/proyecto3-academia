import { RouterProvider } from 'react-router-dom';
import { routes } from './utils/pages.tsx';
import { ToastContainer } from 'react-toastify';
import { Worker } from '@react-pdf-viewer/core';

function App() {
	return (
		<div className='layout'>
			<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
				<RouterProvider router={routes} />
			</Worker>
			<ToastContainer autoClose={1000} />
		</div>
	);
}

export default App;
