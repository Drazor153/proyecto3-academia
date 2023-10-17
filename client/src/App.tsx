import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import {
  menuItems,
  privilegedItems,
  privilegedItemsShortcuts,
} from "./utils/pages.tsx";
import Sidebar from "./components/Sidebar.tsx";
import UserInfo from "./components/UserInfo.tsx";
import { useAppDispatch, useAppSelector } from "./redux/hooks.ts";
import LanguageSwap from "./components/LanguageSwap.tsx";
import Login from "./pages/Login";
import { useLazyAutoLoginQuery } from "./redux/services/userApi.ts";
import { useEffect } from "react";
import { setUser } from "./redux/features/userSlice.ts";

function App() {
  const user = useAppSelector((state) => state.userReducer);
  const [getCredentials, result] = useLazyAutoLoginQuery();

  const dispatch = useAppDispatch();

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (user.run === -1 && !result.isUninitialized) {
      return <Navigate to={"/login"} replace />;
    }
    return (
      <>
        {children}
        <Outlet />
      </>
    );
  };

  if (!result.isUninitialized) {
    if (result.isError) {
      console.log(result.error);
    } else {
      dispatch(setUser(result.data?.userData));
    }
  }

  useEffect(() => {
    getCredentials(null);
  }, []);

  return (
    <div className="layout">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <UserInfo />
                <LanguageSwap />
                <Sidebar />
              </ProtectedRoute>
            }
          >
            {(user.role == "SUPERUSER"
              ? [...menuItems, ...privilegedItems, ...privilegedItemsShortcuts]
              : menuItems
            ).map((item, index) => (
              <Route path={item.path} element={item.component} key={index} />
            ))}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
