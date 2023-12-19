import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { ResponseMsg } from '../utils/types';
import { useAutoLoginQuery } from '../redux/services/userApi';
import { setUser } from '../redux/features/userSlice';
import Loading from './Loading';

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
			fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
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
		return <Loading />;
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
