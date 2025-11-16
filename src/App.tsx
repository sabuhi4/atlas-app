import { useSupabaseAuthSync } from '@/hooks/useSupabaseAuthSync';
import { AppRoutes } from '@/routes';

function App() {
    useSupabaseAuthSync();

    return <AppRoutes />;
}

export default App;