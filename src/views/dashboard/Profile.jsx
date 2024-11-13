import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Tabs, Tab, Dropdown, Card, CardBody } from "react-bootstrap";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import { fetchProfileAPI } from "../../api/user";
import EditProfileModal from "../../components/ui/editProfileModal";

// Datos ficticios para las listas guardadas
const savedLists = [
    {
        id: 1,
        title: "My Reading List",
        createAt: "2024-03-15",
        items: 12,
        access: false
    },
    {
        id: 2,
        title: "Tech Innovations",
        createAt: "2024-03-10",
        items: 8,
        access: true
    },
    {
        id: 3,
        title: "Design Inspiration",
        createAt: "2024-03-05",
        items: 15,
        access: false
    }
];

function Profile() {
    const [profileData, setProfileData] = useState({
        image: null,
        full_name: "",
        about: "",
        bio: "",
        facebook: "",
        twitter: "",
        country: "",
        followers: [],
        following: []
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const userId = useUserData()?.user_id;

    const handleShowModal = () => setShowEditModal(true);
    const handleCloseModal = () => setShowEditModal(false);
    
    const handleProfileUpdate = (updatedProfile) => {
        setProfileData(updatedProfile);
        fetchProfile();
    };

    const fetchProfile = async () => {
        try {
            const profileRes = await fetchProfileAPI(userId);
            setProfileData(profileRes.data);
        } catch (err) {
            console.error("There was an error fetching the data!", err.response.data);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [userId]);

    return (
        <div className="container-fluid py-4" style={{ maxWidth: "1200px" }}>
            <div className="row">
                {/* Primera columna */}
                <div className="col-lg-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="h3 mb-0">{profileData.full_name}</h1>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" className="border-0">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Share Profile</Dropdown.Item>
                                <Dropdown.Item>Design Profile</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    {/* Tabs */}
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="mb-4"
                    >
                        <Tab eventKey="home" title="Home">
                            <div className="py-3">
                                {savedLists.map(list => (
                                    <Card key={list.id} className="border mb-3 shadow-md">
                                        <div className="row no-gutters">
                                            <div className="col-md-8">
                                                <CardBody>
                                                    <div className="mb-3">
                                                        <h5 style={{ letterSpacing: '-2px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>{list.title}</h5>
                                                        <spa className="small">Saved on {list.createAt}</spa>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <p className="text-muted small mb-2">
                                                            {list.items} items &nbsp;&nbsp;&nbsp;
                                                            {list.access ? <i className="fa-solid fa-unlock-keyhole small"></i> : <i className="fa-solid fa-lock small"></i>}
                                                        </p>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="light" className="border-0">
                                                                <i className="fa-solid fa-ellipsis"></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item>Copy link</Dropdown.Item>
                                                                <Dropdown.Item>Edit list info</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </CardBody>
                                            </div>
                                            <div className="col-md-4">
                                                <img src="https://i.postimg.cc/zXyh46b7/dd.jpg" alt="img list" className="img-fluid h-100 w-100" style={{ objectFit: 'cover' }} />
                                            </div>
                                        </div>
                                    </Card>

                                ))}
                            </div>
                        </Tab>
                        <Tab eventKey="about" title="About">
                            <div className="pt-5 vh-100">
                                <div className="text-center small m-auto col-8 text-muted">
                                    <h5 style={{ fontWeight: "bold" }}>Tell the world about yourself</h5>
                                    <p className="text-center">Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.</p>
                                    <Button variant="outline-secondary rounded-"> Get Started </Button>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>

                {/* Segunda columna */}
                <div className="col-lg-4 ps-5">
                    <div className="position-sticky" style={{ top: "2rem" }}>
                        <div className="mb-4">
                            <img
                                src={profileData?.image}
                                alt="Profile"
                                className="rounded-circle mb-3"
                                style={{
                                    width: "95px",
                                    height: "95px",
                                    objectFit: "cover"
                                }}
                            />
                            <h4 className="mb-2 fs-6" style={{ fontWeight: "bold" }}>{profileData.full_name}</h4>
                            <p className="text-muted mb-3">
                                {(profileData.followers ? profileData.followers.length : 0)} Followers · {(profileData.following ? profileData.following.length : 0)} Following 
                            </p>
                            <div className="mb-4">
                                {profileData.bio && (
                                    <p className="mb-3">{profileData.bio}</p>
                                )}
                                {profileData.country && (
                                    <p className="text-muted mb-2">
                                        <small>{profileData.country}</small>
                                    </p>
                                )}
                            </div>
                            <span
                                style={{ color: 'limegreen', cursor: 'pointer' }}
                                onClick={handleShowModal}
                            >
                                Edit Profile
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileModal
                show={showEditModal}
                handleClose={handleCloseModal}
                userId={userId}
                currentProfile={profileData}
                onProfileUpdate={handleProfileUpdate}
            />
        </div>
    );
}

export default Profile;