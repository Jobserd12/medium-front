import { useEffect, useState, Suspense} from 'react';
import PropTypes from 'prop-types';  
import { setUser } from '../utils/auth';
import Header from '../views/partials/Header';
import Footer from '../views/partials/Footer';

const MainWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handler = async () => {
            setLoading(true);

            await setUser();

            setLoading(false);
        };

        handler();
    }, []);

    return (
        <>
            {loading ? null : (
                <>
                    <Header />
                    <div style={{ padding: "100px" }}>
                        {children}
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
};

MainWrapper.propTypes = {
    children: PropTypes.node.isRequired, // Es un nodo requerido
};

export default MainWrapper;
