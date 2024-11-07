import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const PublicRoute = () => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn)();

    return loggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
