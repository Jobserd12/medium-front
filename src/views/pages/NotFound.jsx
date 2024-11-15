import { Link } from 'react-router-dom';

const NotFound = () => {
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-gray-600 text-lg mb-2 uppercase tracking-wide small">
          PAGE NOT FOUND
        </h1>

        <h2 className="fs-1 leading-none font-serif text-secondary">
          404
        </h2>

        <h2 className="text-3xl font-serif mt-6 mb-4 text-gray-800">
          Out of nothing, something.
        </h2>

        <p className="text-gray-600 text-xl mb-8">
          Apparently even a page that doesn't exist.
        </p>

        <Link
          to="/"
          className="text-lg hover:text-gray-600 underline underline-offset-4 transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;