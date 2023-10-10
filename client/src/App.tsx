import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { menuItems, privilegedItems, privilegedItemsShortcuts } from './utils/pages.tsx';
import Sidebar from './components/Sidebar.tsx';
import UserInfo from './components/UserInfo.tsx';
import { useAppSelector } from './redux/hooks.ts';
import LanguageSwap from './components/LanguageSwap.tsx';
import Login from './pages/Login';

function App() {
  const user = useAppSelector(state => state.userReducer)

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    if (user.run === -1) {
      return <Navigate to={'/login'} replace />
    }

    return (
      <>
        {children}
        <Outlet />
      </>
    )
  }

  return (
    <div className='layout'>
      <BrowserRouter>
        <Routes>
          {/* just a little reference */}
          <Route element={<ProtectedRoute>
            <UserInfo />
            <LanguageSwap />
            <Sidebar />
          </ProtectedRoute>}>
            {
              (user.role == 'SUPERUSER' ? [...menuItems, ...privilegedItems, ...privilegedItemsShortcuts] : menuItems).map(
                (item, index) => (
                  <Route path={item.path} element={item.component} key={index} />
                )
              )
            }
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
