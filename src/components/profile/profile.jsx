import React, { useState, useEffect } from "react";
import { Button, Tabs, Tab, Card, Pagination } from "react-bootstrap";
import Login from "../../views/auth/Login";
import Posts from "./posts";
import { followToggleUserAPI } from "../../api/user";
import useUserData from "../../plugin/useUserData";

// Datos ficticios para demostración
const likedPosts = [
    {
        id: 1,
        title: "Understanding Modern JavaScript",
        author: "Sarah Chen",
        date: "2024-03-15",
        likes: 45,
        bookmarked: true,
        excerpt: "JavaScript has Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, magnam.."
    },
    {
        id: 2,
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, magnam.",
        author: "John Chen",
        date: "2024-03-20",
        likes: 45,
        bookmarked: true,
        excerpt: "JavaScriptLorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, magnam. new features..."
    },
];


function Profile({ profileData, isOwnProfile, handleShowModal, fetchProfile }) {
    const [activeTab, setActiveTab] = useState('posts');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const ITEMS_PER_PAGE = 5;

    const defaultProfileData = {
        pk: profileData?.user || '',
        full_name: profileData?.full_name || '',
        image: profileData?.image || 'default/default-user.webp',
        bio: profileData?.bio || '',
        country: profileData?.country || '',
        followers: profileData?.followers || [],
        following: profileData?.following || []
    };

    const getPaginatedItems = (items) => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    };

    const totalPages = (items) => Math.ceil(items.length / ITEMS_PER_PAGE);

    const PaginationControl = ({ items }) => {
        if (totalPages(items) <= 1) return null;

        return (
            <Pagination className="justify-content-center mt-4">
                <Pagination.Prev 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages(items))].map((_, idx) => (
                    <Pagination.Item
                        key={idx + 1}
                        active={idx + 1 === currentPage}
                        onClick={() => setCurrentPage(idx + 1)}
                    >
                        {idx + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages(items)))}
                    disabled={currentPage === totalPages(items)}
                />
            </Pagination>
        );
    };

    // Componente para los posts con likes
    const LikedPostsContent = () => (
        <div className="py-4">
            {getPaginatedItems(likedPosts).map(post => (
                <Card key={post.id} className="border-0 mb-4">
                    <Card.Body className="p-0">
                        <div className="d-flex align-items-center mb-2">
                            <small className="text-muted me-2">{post.author}</small>
                            <small className="text-muted">· {post.date}</small>
                        </div>
                        <h5 className="mb-2" style={{ fontWeight: "700", letterSpacing: "-0.5px" }}>
                            {post.title}
                        </h5>
                        <p className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
                            {post.excerpt}
                        </p>
                        <div className="d-flex align-items-center">
                            <Button variant="link" className="text-muted p-0 me-3">
                                <i className="far fa-heart me-2"></i>
                                {post.likes}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            <PaginationControl items={likedPosts} />
        </div>
    );

    // Componente para los bookmarks
    const BookmarksContent = () => (
        <div className="py-4">
            {getPaginatedItems(likedPosts.filter(post => post.bookmarked)).map(post => (
                <Card key={post.id} className="border-0 mb-4">
                    <Card.Body className="p-0">
                        <div className="d-flex align-items-center mb-2">
                            <small className="text-muted me-2">{post.author}</small>
                            <small className="text-muted">· {post.date}</small>
                        </div>
                        <h5 className="mb-2" style={{ fontWeight: "700", letterSpacing: "-0.5px" }}>
                            {post.title}
                        </h5>
                        <p className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
                            {post.excerpt}
                        </p>
                        <Button variant="link" className="text-warning p-0">
                            <i className="fas fa-bookmark"></i>
                        </Button>
                    </Card.Body>
                </Card>
            ))}
            <PaginationControl items={likedPosts.filter(post => post.bookmarked)} />
        </div>
    );

    const followHandle = async () => {
        if (!profileData.currentUserUsername) { 
            setShowLoginModal(true);
            return; 
        } 
        setIsLoading(true);
        try {
            const res = await followToggleUserAPI(defaultProfileData.pk);
            fetchProfile();
        } catch(err) {
            console.error("Error al procesar la solicitud de follow:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid py-4" style={{ maxWidth: "1200px" }}>
            <div className="row">
                {/* Primera columna */}
                <div className="col-lg-9">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="h3 mb-0">{defaultProfileData.full_name}</h1>
                    </div>

                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => {
                            setActiveTab(k);
                            setCurrentPage(1); 
                        }}
                        className="mb-4 border-0"
                    >
                        <Tab 
                            eventKey="posts" 
                            title={
                                <span>
                                    <i className="fa-regular fa-newspaper me-2"></i>
                                    Post
                                </span>
                            }
                        >
                            <Posts />
                        </Tab>
                        <Tab 
                            eventKey="likes" 
                            title={
                                <span>
                                    <i className="far fa-heart me-2"></i>
                                    Likes
                                </span>
                            }
                        >
                            <LikedPostsContent />
                        </Tab>
                        <Tab 
                            eventKey="bookmarks" 
                            title={
                                <span>
                                    <i className="far fa-bookmark me-2"></i>
                                    Bookmarks
                                </span>
                            }
                        >
                            <BookmarksContent />
                        </Tab>
                    </Tabs>
                </div>

                {/* Segunda columna - Profile sidebar */}
                <div className="col-lg-3 p-0">
                    <div className="position-sticky" style={{ top: "2rem" }}>
                        <div className="mb-4 text-center">
                            <div className="position-relative d-inline-block">
                                <img
                                    src={defaultProfileData.image}
                                    alt="Profile"
                                    className="rounded-circle mb-3"
                                    style={{
                                        width: "95px",
                                        height: "95px",
                                        objectFit: "cover",
                                        border: "2px solid #eee"
                                    }}
                                />
                                <Button
                                    variant="light"
                                    className="position-absolute bottom-0 end-0 p-1 rounded-circle"
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                    }}
                                >
                                    <i className="fas fa-link text-muted small"></i>
                                </Button>
                            </div>

                            <h4 className="mb-2 fs-6 fw-bold">
                                {defaultProfileData.full_name}
                            </h4>
                            <p className="text-muted mb-3">
                                {defaultProfileData.followers.length} Followers · {defaultProfileData.following.length} Following
                            </p>

                            <div className="mb-4">
                                {defaultProfileData.bio && (
                                    <div className="bio-container p-3 bg-light rounded">
                                        <p className="mb-0 text-break" style={{
                                            lineHeight: '1.6',
                                            fontSize: '0.95rem',
                                            maxWidth: '100%',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word'
                                        }}>
                                            {defaultProfileData.bio}
                                        </p>
                                    </div>
                                )}
                                {defaultProfileData.country && (
                                    <p className="text-muted mb-2">
                                        <i className="fas fa-map-marker-alt me-2"></i>
                                        <small>{defaultProfileData.country}</small>
                                    </p>
                                )}
                            </div>

                            {isOwnProfile ? (
                                <Button
                                    variant="outline-success"
                                    className="rounded-pill"
                                    onClick={handleShowModal}
                                >
                                    <i className="fas fa-edit me-2"></i>
                                    Edit Profile
                                </Button>
                            ) : (
                                <Button
                                    onClick={followHandle}
                                    variant={isFollowing ? "outline-success" : "success"}
                                    className="rounded-pill"
                                    disabled={isLoading}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <Login show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
            </div>
        </div>
    );
}

export default Profile;
