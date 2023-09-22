import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { menuItems, privilegedItems } from './utils/pages.tsx';
import Sidebar from './components/Sidebar.tsx';
import UserInfo from './components/UserInfo.tsx';
import { useAppSelector } from './redux/hooks.ts';

function App() {
  const user = useAppSelector(state => state.userReducer)
  return (
    <div className='layout'>
      <UserInfo />
      <BrowserRouter>
        <Sidebar>
          <Routes>
            {/* just a little reference */}
            {(user.role == 'SUPERUSER' ? [...menuItems, ...privilegedItems] : menuItems).map((item, index) => (
              <Route path={item.path} element={item.component} key={index} />
            ))}
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  )
}

export default App
