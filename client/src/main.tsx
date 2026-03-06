import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/assets/styles/base/_reset.scss';
import '@/assets/styles/base/_typography.scss';
import '@/assets/styles/base/_layout.scss';
import '@/assets/styles/utils/_transition.scss';
import '@/assets/styles/base/_css_variables.scss';
import '@/assets/styles/base/tailwind.css';
import Router from './router';
import Wrapper from './Wrapper';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<HelmetProvider>
			<Wrapper>
				<Router />
			</Wrapper>
		</HelmetProvider>
	</QueryClientProvider>
);
