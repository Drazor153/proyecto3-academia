import { RouterProvider } from 'react-router-dom';
import { routes } from './utils/pages.tsx';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="layout">
      <RouterProvider router={routes} />
      <ToastContainer />
    </div>
  );
}

export default App;
