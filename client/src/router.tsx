import SearchPage from './pages/main/Search';
import ContactPage from './pages/main/Contact';
import ProfilePage from './pages/main/Profile';
import AboutPage from './pages/main/About';
import NotFoundPage from './pages/NotFoundPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuideLayout from './layouts/Guide';
import MainLayout from './layouts/Main';
import ComponentGuidePage from './pages/guide/common/ComponentGuidePage';
import PopupGuidePage from './pages/guide/common/PopupGuidePage';
import GlobalPopupGuidePage from './pages/guide/global/GlobalPopupGuidePage';
import SheetGuidePage from './pages/guide/common/SheetGuidePage';
import PostEditPage from './pages/post/detail';
import SubLayout from './layouts/Sub';
import HomePage from './pages/main/Home';

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />
			},
			{
				path: '/search',
				element: <SearchPage />
			},
			{
				path: '/contact',
				element: <ContactPage />
			},
			{
				path: '/profile',
				element: <ProfilePage />
			},
			{
				path: '/about',
				element: <AboutPage />
			}
		]
	},
	{
		element: <SubLayout />,
		children: [
			{
				path: '/detail/:id',
				element: <PostEditPage />
			}
		]
	},
	{
		element: <GuideLayout />,
		path: '/guide',
		children: [
			{
				path: 'common/component',
				element: <ComponentGuidePage />
			},
			{
				path: 'common/popup',
				element: <PopupGuidePage />
			},
			{
				path: 'common/sheet',
				element: <SheetGuidePage />
			},
			{
				path: 'global/popup',
				element: <GlobalPopupGuidePage />
			}
		]
	},
	{
		path: '*',
		element: <NotFoundPage />
	}
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
