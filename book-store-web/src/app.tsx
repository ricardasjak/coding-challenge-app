import { StoresPage } from './stores-page/stores-page.component';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <StoresPage />
        </QueryClientProvider>
    );
};
