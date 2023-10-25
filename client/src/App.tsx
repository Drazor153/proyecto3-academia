import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom';
import { menuItems } from './utils/pages.tsx';
import Sidebar from './components/Sidebar.tsx';
import UserInfo from './components/UserInfo.tsx';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import LanguageSwap from './components/LanguageSwap.tsx';
import Login from './pages/Login';
import { useAutoLoginQuery } from './redux/services/userApi.ts';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { setUser } from './redux/features/userSlice.ts';

function App() {
	useTranslation();

	const user = useAppSelector(state => state.userReducer);
	const dispatch = useAppDispatch();

	const { data: result, isLoading, isSuccess } = useAutoLoginQuery(null);

	const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
		const location = useLocation();

		useEffect(() => {
			if (user.run !== -1 && result) {
				console.log('refresh');
				fetch(`${import.meta.env.VITE_SERVER_HOST}/api/auth/refresh`, {
					credentials: 'include',
				});
			}
		}, [location, user, result]);

		if (isLoading)
			return (
				<>
					<h1>Loading...</h1>
				</>
			);

		if (isSuccess)
			return (
				<>
					{children}
					<Outlet />
				</>
			);
		else
			return (
				<Navigate
					to={'/login'}
					replace
				/>
			);
	};

	const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
		if (isLoading)
			return (
				<>
					<h1>Loading...</h1>
				</>
			);

		if (isSuccess && result.userData.role === 'ADMIN')
			return (
				<>
					{children}
					<Outlet />
				</>
			);
		else
			return (
				<Navigate
					to={'/'}
					replace
				/>
			);
	};

	useEffect(() => {
		if (result && user.run === -1) {
			dispatch(setUser(result.userData));
		}
	}, [result]);

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
						{menuItems.map((item, index) => {
							return (
								<Route
									path={item.path}
									element={
										item.only.includes('ADMIN') ? (
											<ProtectedAdminRoute>
												{item.component}
											</ProtectedAdminRoute>
										) : (
											item.component
										)
									}
									key={index}
								/>
							);
						})}

						{/* {privilegedItems.map((item, index) => {
							return (
								<Route
									path={item.path}
									element={
										<ProtectedAdminRoute>{item.component}</ProtectedAdminRoute>
									}
									key={menuItems.length + index}
								/>
							);
						})} */}
					</Route>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="*"
						element={<h1>404</h1>}
					/>
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</div>
	);
}

export default App;
