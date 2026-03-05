import { Outlet } from 'react-router-dom';
import GuideNavBar from '../components/guide/GuideNavBar';

export default function GuideLayout() {
	return (
		<>
			<GuideNavBar />
			<Outlet />
		</>
	);
}
