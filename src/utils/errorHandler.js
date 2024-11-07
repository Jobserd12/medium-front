
export const handleError = (err) => {

    if (import.meta.env.VITE_APP_MODE === 'development') {
        console.error("Detailed Error:", err);
    } else {
        window.location.href = '/error';
    }
};
