import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import apiInstance from "../../utils/axios";
import Toast from "../../plugin/Toast";

function EditProfileModal({ show, handleClose, userId, currentProfile, onProfileUpdate }) {
    const [profileData, setProfileData] = useState({
        image: null,
        full_name: "",
        about: "",
        bio: "",
        facebook: "",
        twitter: "",
        country: "",
    });
    const charLimit = 160;
    const [imagePreview, setImagePreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null)
    // Count caracters bio
    const [bio, setBio] = useState(profileData.bio || ''); 

    useEffect(() => {
        if (currentProfile) {
            setProfileData(currentProfile);
            setImagePreview(currentProfile.image || "");
        }
    }, [currentProfile, show]);

    const handleProfileChange = (event) => {
        const { name, value } = event.target; 
        if (name === 'bio' && value.length > charLimit) { return; }

        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setProfileData({
            ...profileData,
            image: selectedFile,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleDeleteImage = () => { 
        setProfileData({ ...profileData, image: null }); 
        if (fileInputRef.current) { 
            fileInputRef.current.value = null; 
        } 
        setImagePreview("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        
        // Solo agregar la imagen si ha cambiado
        if (profileData.image && typeof profileData.image !== 'string') {
            formData.append("image", profileData.image);
        }
        
        formData.append("full_name", profileData.full_name);
        formData.append("about", profileData.about);
        formData.append("bio", profileData.bio);
        formData.append("facebook", profileData.facebook);
        formData.append("twitter", profileData.twitter);
        formData.append("country", profileData.country);

        try {
            const res = await apiInstance.patch(`user/profile/${userId}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            Toast("success", "Profile updated successfully", "");
            onProfileUpdate(res.data);
            handleClose();
        } catch (error) {
            console.error("Error updating profile:", error);
            Toast("error", "An Error Occurred", "");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="md" centered>
            <Modal.Header closeButton className="border-0 m-2">
                <Modal.Title className="fs-5 text-center" style={{ fontWeight: "bold" }}>Profile Information</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                    {/* Profile Image Section */}
                    <div className="mb-4">
                        <p className="mb-3 small text-muted">Photo</p>
                        <div className="d-flex align-items-start gap-4">
                        <div>
                            <img
                            src={imagePreview || profileData?.image}
                            alt="Profile"
                            className="rounded-circle"
                            style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                border: "2px solid #eee"
                            }}
                            />
                        </div>

                        <div className="d-flex flex-column">
                            <div className="mb-2 small d-flex gap-3">
                                <label 
                                    htmlFor="photoUpload" 
                                    style={{ 
                                    color: '#2E7D32', 
                                    cursor: 'pointer',
                                    marginBottom: '8px',
                                    display: 'block'
                                    }}
                                >
                                    Update
                                </label>
                                <Form.Control
                                    type="file"
                                    id="photoUpload"
                                    name="image"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="d-none"
                                    ref={fileInputRef}
                                />
                                <span 
                                    onClick={handleDeleteImage}
                                    style={{ 
                                    color: '#D32F2F',
                                    cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </span>
                            </div>

                            <small className="text-muted" style={{ fontSize: '12px', maxWidth: '250px' }}>
                            Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                            </small>
                        </div>
                        </div>
                    </div>

                    <Row className="g-3">
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label className="small">Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="full_name"
                                    value={profileData.full_name}
                                    onChange={handleProfileChange}
                                    placeholder="Your full name"
                                />
                            </Form.Group>
                        </Col>

                        {/* About */}
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label className="small">About</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="about"
                                    value={profileData.about}
                                    onChange={handleProfileChange}
                                    rows={3}
                                    placeholder="Tell us about yourself"
                                />
                            </Form.Group>
                        </Col>

                        {/* Bio */}
                        <Col xs={12}>
                            <Form.Group className="position-relative">
                                <Form.Label className="small">Bio</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleProfileChange}
                                    rows={3}
                                    maxLength={charLimit}
                                    style={{ borderColor: bio.length === charLimit ? 'red' : '',resize: 'none' , boxShadow: 'none' }}
                                />
                                <div className="text-right small text-muted" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
                                    <span style={{ fontWeight: "bold" }}>{bio.length}&nbsp;</span>/{charLimit}
                                </div>
                            </Form.Group>
                            <style>
                                {`
                                    textarea:focus {
                                        border-color: black !important;
                                        box-shadow: none !important;
                                    }
                                `}
                            </style>
                        </Col>

                        {/* Country */}
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label className="small">Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={profileData.country}
                                    onChange={handleProfileChange}
                                />
                            </Form.Group>
                        </Col>

                        {/* Socials Media */}
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="small">Facebook</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="facebook"
                                    value={profileData.facebook}
                                    onChange={handleProfileChange}
                                    placeholder="Facebook profile URL"
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="small">Twitter</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="twitter"
                                    value={profileData.twitter}
                                    onChange={handleProfileChange}
                                    placeholder="Twitter profile URL"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button
                    onClick={handleClose}
                    className="border-1 text-lime rounded-pill"
                    style={{ borderColor: 'limegreen', color: 'limegreen', backgroundColor: 'transparent' }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-4 rounded-pill"
                    style={{ backgroundColor: 'limegreen', color: 'white', borderColor: 'limegreen' }}
                >
                    {isLoading ? "Saving..." : "Save"}
                </Button>
            </Modal.Footer>

        </Modal>
    );
}

export default EditProfileModal;