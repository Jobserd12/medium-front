import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const PrivateRoute = () => {
    // Use the 'useAuthStore' hook to check the user's authentication status. 
    const loggedIn = useAuthStore((state) => state.isLoggedIn)();

    return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;