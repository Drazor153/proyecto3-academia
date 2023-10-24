import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom';
import {
	menuItems,
	privilegedItems,
	privilegedItemsShortcuts,
} from './utils/pages.tsx';
import Sidebar from './components/Sidebar.tsx';
import UserInfo from './components/UserInfo.tsx';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import LanguageSwap from './components/LanguageSwap.tsx';
import Login from './pages/Login';
import { useAutoLoginQuery } from './redux/services/userApi.ts';
import { useEffect } from 'react';
import { setUser } from './redux/features/userSlice.ts';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function App() {
	useTranslation();

	const user = useAppSelector(state => state.userReducer);
	const dispatch = useAppDispatch();

	const { data: result, isLoading, isSuccess } = useAutoLoginQuery(null);

	const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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

	useEffect(() => {
		dispatch(setUser(result?.userData));
	}, [result, dispatch]);

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
						{(user.role == 'ADMIN'
							? [...menuItems, ...privilegedItems, ...privilegedItemsShortcuts]
							: menuItems
						).map((item, index) => (
							<Route
								path={item.path}
								element={item.component}
								key={index}
							/>
						))}
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
