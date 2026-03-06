import FeedPage from './pages/main/FeedPage';
import SearchPage from './pages/main/SearchPage';
import MessagePage from './pages/main/MessagePage';
import ProfilePage from './pages/main/ProfilePage';
import AboutPage from './pages/main/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuideLayout from './layouts/GuideLayout';
import MainLayout from './layouts/MainLayout';
import ComponentGuidePage from './pages/guide/common/ComponentGuidePage';
import PopupGuidePage from './pages/guide/common/PopupGuidePage';
import GlobalPopupGuidePage from './pages/guide/global/GlobalPopupGuidePage';
import SheetGuidePage from './pages/guide/common/SheetGuidePage';
import PostDetailPage from './pages/post/detail';
import SubLayout from './layouts/SubLayout';

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <FeedPage />
			},
			{
				path: '/search',
				element: <SearchPage />
			},
			{
				path: '/message',
				element: <MessagePage />
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
				element: <PostDetailPage />
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
