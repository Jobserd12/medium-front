import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import useUserData from '../../plugin/useUserData';
import EditProfileModal from '../../components/ui/editProfileModal';
import Profile from '../../components/Profile';
import { fetchProfileAPI } from '../../api/user';
import NotFound from '../pages/NotFound';

function ProfileLayout() {
    const { username } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const userData = useUserData();
    
    const isOwnProfile = userData?.username === username.substring(1);

    const handleShowModal = () => setShowEditModal(true);
    const handleCloseModal = () => setShowEditModal(false);

   
    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const cleanUsername = username.substring(1);
            const profileRes = await fetchProfileAPI(cleanUsername);
            const profileWithCurrentUser = {
                ...profileRes.data,
                currentUserUsername: userData?.username
            };
            setProfileData(profileWithCurrentUser);
        } catch (err) {
            setError('Error loading profile');
        } finally {
            setLoading(false);
        }
    };


    const handleProfileUpdate = (updatedProfile) => {
        setProfileData(updatedProfile);
        fetchProfile();
    };

    useEffect(() => {
        if (username) {
            fetchProfile();
        }
    }, [username]);

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    if (error || !profileData) {
        return <NotFound />;
    }


    return (
        <>
            <Profile
                profileData={profileData}
                isOwnProfile={isOwnProfile}
                handleShowModal={handleShowModal}
                fetchProfile={fetchProfile}
            />
            {isOwnProfile && (
                <EditProfileModal
                    show={showEditModal}
                    handleClose={handleCloseModal}
                    username={userData?.username}
                    currentProfile={profileData}
                    onProfileUpdate={handleProfileUpdate}
                />
            )}
        </>
    );
}

export default ProfileLayout;