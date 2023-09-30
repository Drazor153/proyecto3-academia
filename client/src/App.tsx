import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { menuItems, privilegedItems, privilegedItemsShortcuts } from './utils/pages.tsx';
import Sidebar from './components/Sidebar.tsx';
import UserInfo from './components/UserInfo.tsx';
import { useAppSelector } from './redux/hooks.ts';
import LanguageSwap from './components/LanguageSwap.tsx';

function App() {
  const user = useAppSelector(state => state.userReducer)
  return (
    <div className='layout'>
      <UserInfo />
      <LanguageSwap />
      <BrowserRouter>
        <Sidebar>
          <Routes>
            {/* just a little reference */}
            {(user.role == 'SUPERUSER' ? [...menuItems, ...privilegedItems, ...privilegedItemsShortcuts] : menuItems).map((item, index) => (
              <Route path={item.path} element={item.component} key={index} />
            ))}
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  )
}

export default App
