import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import SearchBar from '../../components/ui/searchBar';
import Login from '../auth/Login';
import UserProfile from '../../components/ui/userProfile';
import useNotificationStore from '../../store/useNotificationStore';
import useUserData from '../../plugin/useUserData';
import { useNotification } from '../../hooks/notification/useNotification';

function Header() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
    const [showLoginModal, setShowLoginModal] = useState(false);
    const unreadCount = useNotificationStore((state) => state.unreadCount); 
    const location = useLocation();
    const navigate = useNavigate();
    const userData = useUserData();
    const { refetch } = useNotification();

    const handleShowLoginModal = () => setShowLoginModal(!showLoginModal);
    const isActive = (path) => location.pathname === path ? 'active-link' : '';

    const handleSearch = (q) => {
        navigate(`/search?query=${q}`);
    };

    const handleWriteClick = () => { 
        if (isLoggedIn && userData) { 
            navigate('/new-post'); 
        } else { 
            setShowLoginModal(true); 
        } 
    };


    useEffect(() => { 
        refetch();
    },[isLoggedIn, userData?.user_id]);
    
    return (
        <header className="col-lg-12 bg-white rounded shadow-sm sticky-header">
            <nav className="navbar navbar-expand-lg p-0">
                <div className="container">
                    <div className='d-flex align-items-center'>
                        <Link className="navbar-brand" to="/">
                            <img className="navbar-brand-item" src="https://i.postimg.cc/XNQZdmJR/60736.png" alt="logo" width="30px" />
                        </Link>
                        <div className="d-flex align-items-center" style={{ flex: 1 }}>
                            <SearchBar onSearch={handleSearch} />
                        </div>
                    </div>
                    <button
                        className="navbar-toggler bg-secondary" style={{ border: "none" }}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarButtonsExample"
                        aria-expanded="false"
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse p-2" id="navbarButtonsExample">
                        <div className="d-flex align-items-center justify-content-end ms-auto">
                            <ul className="navbar-nav align-items-center gap-4 ml-auto">
                                <li className="nav-item">
                                    <span onClick={handleWriteClick} className={`nav-link text-black me-2 ${isActive('/new-post')}`} style={{ cursor: 'pointer' }}>Publish</span>
                                </li>
                                {isLoggedIn ? (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/notifications" className="btn position-relative">
                                                <i className={isActive("/notifications") ? "fa-solid fa-bell" : "fa-regular fa-bell"}></i>
                                                {unreadCount > 0 && ( <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"> {unreadCount} </span> )}
                                            </Link>
                                        </li>
                                        <li className="nav-item"> <UserProfile /> </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/register/" className="btn text-black fw-bold">Sign up</Link>
                                        </li>
                                        <li className="nav-item">
                                            <button onClick={handleShowLoginModal} className="btn bg-black text-white fw-bold me-2">Log in</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <Login show={showLoginModal} handleClose={handleShowLoginModal} />
        </header>
    );
}

export default Header;
