import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { ResponseMsg } from '../utils/types';
import { useAutoLoginQuery } from '../redux/services/userApi';
import { setUser } from '../redux/features/userSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  const location = useLocation();

  const { data: result, isLoading, isSuccess } = useAutoLoginQuery(null);

  useEffect(() => {
    if (user.run !== -1) {
      fetch(`${import.meta.env.VITE_SERVER_HOST}/api/auth/refresh`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(({ msg }: ResponseMsg) => {
          console.log(msg);
        })
        .catch(() => {
          console.log('Failed to fetch "refresh token"');
        });
    }
  }, [user.run, location]);

  useEffect(() => {
    if (isSuccess) {
      if (user.run === -1) {
        console.log('ProtectedRoute');
        dispatch(setUser(result.userData));
      }
      console.log(user);
    }
  }, [result?.userData, dispatch, isSuccess, user]);

  if (isLoading) {
    console.log('isLoading');
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if (isSuccess || user.run !== -1) {
    return (
      <>
        {children}
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={'/login'} />;
  }
}
