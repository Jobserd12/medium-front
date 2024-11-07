import React from 'react';
import ErrorPage from '../views/pages/ErrorPage';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        if (import.meta.env.VITE_APP_MODE === "development") {
            console.error("ErrorBoundary caught an error", error, errorInfo);
        } 
    }

    render() {
        if (this.state.hasError) {
            return import.meta.env.VITE_APP_MODE === "development" ? null : <ErrorPage />;
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;
