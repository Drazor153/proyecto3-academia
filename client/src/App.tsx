import { BrowserRouter, Route, Routes } from 'react-router-dom';
import menuItems from './pages.tsx';
import Sidebar from './components/Sidebar.tsx';
import UserInfo from './components/UserInfo.tsx';


function App() {

  return (
    <div className='layout'>
      <UserInfo name='dummyUser' role='dummyRole' />
      <BrowserRouter>
        <Sidebar>
          <Routes>
            {menuItems.map((item, index) => (
              <Route path={item.path} element={item.component} key={index} />
            ))}
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  )
}

export default App
