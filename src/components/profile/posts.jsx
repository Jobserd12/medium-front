import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Badge } from 'react-bootstrap';
import { Link, useLocation, useParams } from "react-router-dom";
import moment from "moment";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import defaultImagePost from '../../assets/default-image-post.webp';

function Posts() {
    const [posts, setPosts] = useState([]);
    const { username } = useParams();
    const userData = useUserData();
    const location = useLocation();

    const fetchPosts = async () => {
        try {
            const _username = username.substring(1);
            const res = await apiInstance.get(`admin/posts/${_username}/`);
            setPosts(res.data);
        } catch (err) {
            console.error("Error fetching posts:", err);
            setPosts([]);
        }
    };

    useEffect(() => {
        if (username){
            fetchPosts();
        }
    }, [username]); 

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (query === "") {
            fetchPosts();
        } else {
            const filtered = posts.filter((p) => {
                return p.title.toLowerCase().includes(query);
            });
            setPosts(filtered);
        }
    };

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        let sortedPosts = [...posts];
        
        if (sortValue === "Newest") {
            sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortValue === "Oldest") {
            sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortValue === "") {
            fetchPosts();
        }
        
        setPosts(sortedPosts);
    };

    return (
        <div className="py-3">
            {/* Search and Filter Section */}
            <Row className="mb-4 g-3">
                <Col md={8}>
                    <Form.Control
                        type="search"
                        placeholder="Search stories..."
                        onChange={handleSearch}
                        className="border-0 bg-light"
                    />
                </Col>
                <Col md={4}>
                    <Form.Select 
                        onChange={handleSortChange}
                        className="border-0 bg-light"
                    >
                        <option value="">Sort by</option>
                        <option value="Newest">Newest first</option>
                        <option value="Oldest">Oldest first</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Posts List */}
            <Row className="g-4">
                {posts?.map((post) => (
                    <Col xs={12} key={post.id}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body className="p-4">
                                <Row className="align-items-center">
                                    <Col md={7}>
                                        <Link to={`/post/${post.slug}/`}>
                                            <img
                                                src={post.image || defaultImagePost}
                                                className="img-fluid rounded"
                                                alt={post.title}
                                                style={{ 
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Link>
                                    </Col>
                                    <Col md={5} className="d-flex justify-content-center">
                                       <div>
                                       <Link 
                                            to={`/detail/${post.slug}/`}
                                            className="text-decoration-none text-dark"
                                        >
                                            <h4 className="fw-bold mb-3">{post.title}</h4>
                                            <p>{post.preview}</p>
                                        </Link>
                                        <div className="d-flex align-items-center mb-3 text-muted">
                                            <small>{moment(post.date).format("MMM DD, YYYY")}</small>
                                            <small>{post.view} views</small>
                                            <Badge bg="light" text="dark" className="fw-normal">
                                                {post.category?.title}
                                            </Badge>
                                        </div>
                                        {userData && (
                                            <div className="d-flex gap-2">
                                                <Link 
                                                    to={`/edit-post/${post.id}/`}
                                                    className="btn btn-light btn-sm"
                                                >
                                                    <i className="fas fa-edit me-2"></i>
                                                    Edit
                                                </Link>
                                                <button className="btn btn-light btn-sm">
                                                    <i className="fas fa-trash-alt me-2"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                       </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Posts;