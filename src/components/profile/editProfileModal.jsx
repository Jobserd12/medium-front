import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import apiInstance from "../../utils/axios";
import Toast from "../../plugin/Toast";
import defaultUser from '../../assets/default-user.webp';
import useUserData from "../../plugin/useUserData";

function EditProfileModal({ show, handleClose, username, currentProfile, onProfileUpdate }) {
    const [profileData, setProfileData] = useState({
        image: null,
        full_name: "",
        bio: "",
        facebook: "",
        twitter: "",
        country: "",
    });
    const charLimit = 160;
    const [imagePreview, setImagePreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null)
    const userData = useUserData()
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

    const capitalizeWords = (str) => {
        if (!str) return '';
        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();

        const isImageChanged = profileData.image || profileData.image === null 

        if (isImageChanged) {
            formData.append("image", profileData.image);
        } else {
            formData.append("image", 'null');
        }
            
        formData.append("full_name", profileData.full_name);
        formData.append("bio", profileData.bio);
        formData.append("facebook", profileData.facebook);
        formData.append("twitter", profileData.twitter);
        formData.append("country", profileData.country);

        try {
            const res = await apiInstance.patch(`user/profile/${username}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (isImageChanged) {
                window.dispatchEvent(new CustomEvent('profile-image-updated', {
                detail: { newImageUrl: res.data.image }
                }));
            }

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
        <Modal 
            show={show} 
            onHide={handleClose} 
            size="lg" 
            centered 
            className="custom-profile-modal"
        >
            <Modal.Header 
                closeButton 
                className="border-0 p-4 pb-0"
            >
                <Modal.Title className="w-100 text-center fs-5 fw-bold text-dark">
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4 pt-2">
                <Form onSubmit={handleSubmit}>
                    {/* Profile Image Section */}
                    <div className="mb-4 d-flex align-items-center">
                        <img
                            src={imagePreview || profileData?.image || defaultUser}
                            alt="Profile"
                            className="rounded-circle me-4 object-fit-cover"
                            style={{
                                width: "80px", 
                                height: "80px", 
                                border: "2px solid #e0e0e0"
                            }}
                        />
                        <div>
                            <div className="d-flex gap-3 mb-2">
                                <label 
                                    htmlFor="photoUpload" 
                                    className="text-success cursor-pointer"
                                >
                                    Change Photo
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
                                    className="text-danger cursor-pointer"
                                >
                                    Remove
                                </span>
                            </div>
                            <small className="text-muted d-block" style={{ fontSize: '0.75rem', maxWidth: '250px' }}>
                                Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                            </small>
                        </div>
                    </div>

                    <Row className="g-3">
                        {/* Full Name */}
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label className="small text-muted">Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="full_name"
                                    value={capitalizeWords(profileData.full_name)}
                                    onChange={handleProfileChange}
                                    placeholder="Enter your full name"
                                    className="border-0 border-bottom rounded-0 px-0"
                                />
                            </Form.Group>
                        </Col>

                        {/* Bio with Character Count */}
                        <Col xs={12}>
                            <Form.Group className="position-relative">
                                <Form.Label className="small text-muted">Bio</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleProfileChange}
                                    rows={3}
                                    maxLength={charLimit}
                                    placeholder="Short bio (optional)"
                                    className="border-0 border-bottom rounded-0 px-0 resize-none"
                                />
                                <div className="position-absolute bottom-0 end-0 text-muted small">
                                    {profileData.bio.length}/{charLimit}
                                </div>
                            </Form.Group>
                        </Col>

                        {/* Other Fields */}
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label className="small text-muted">Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={profileData.country}
                                    onChange={handleProfileChange}
                                    placeholder="Your country"
                                    className="border-0 border-bottom rounded-0 px-0"
                                />
                            </Form.Group>
                        </Col>

                        {/* Social Media */}
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="small text-muted">Facebook</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="facebook"
                                    value={profileData.facebook}
                                    onChange={handleProfileChange}
                                    placeholder="Facebook profile URL"
                                    className="border-0 border-bottom rounded-0 px-0"
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="small text-muted">Twitter</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="twitter"
                                    value={profileData.twitter}
                                    onChange={handleProfileChange}
                                    placeholder="Twitter profile URL"
                                    className="border-0 border-bottom rounded-0 px-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="border-0 p-4 pt-0">
                <Button
                    variant="outline-secondary"
                    onClick={handleClose}
                    className="rounded-pill px-4"
                >
                    Cancel
                </Button>
                <Button
                    variant="success"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="rounded-pill px-4"
                >
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </Modal.Footer>

            <style jsx>{`
                .custom-profile-modal .modal-content {
                    border:0;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.5);
                }
                .cursor-pointer {
                    cursor: pointer;
                }
                .resize-none {
                    resize: none;
                }
                .object-fit-cover {
                    object-fit: cover;
                }
            `}</style>
        </Modal>
    );
}

export default EditProfileModal;