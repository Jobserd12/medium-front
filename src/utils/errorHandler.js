
export const handleError = (err) => {

    if (import.meta.env.VITE_MODE === 'development') {
        console.error("Detailed Error:", err);
    } else {
        window.location.href = '/error';
    }
};
