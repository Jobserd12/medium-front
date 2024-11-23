import { useState, useEffect } from "react";
import { Form, Button, Card, Image } from 'react-bootstrap';
import { Link, Navigate, useParams } from "react-router-dom";
import '../styles/post-content.css'
import apiInstance from "../../utils/axios";
import moment from "moment";
import Toast from "../../plugin/Toast";
import useUserData from "../../plugin/useUserData";
import { useQueryClient } from "@tanstack/react-query";
import { fetchPostsDetailAPI, handleBookmarkPostAPI, handleCommentPostAPI, handleLikePostAPI } from "../../api/posts";
import Login from "../auth/Login";

function Detail() {
  const [post, setPost] = useState([]);
  const [tags, setTags] = useState([]);
  const userData = useUserData();
  const queryClient = useQueryClient();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [createComment, setCreateComment] = useState({
    comment: "",
  });
  const { slug } = useParams();
  const MINIMUM_TIME_ON_PAGE = 5000;

  const fetchPost = async () => {
    try {
      const res = await fetchPostsDetailAPI(slug);
      setPost(res.data);
      console.log(res.data)
      const tagArray = res.data?.tags?.split(",");
      setTags(tagArray);
    } catch(err) {
      Navigate("*")
    }
  };

  useEffect(() => {
    fetchPost();

    const timer = setTimeout(() => {
      incrementViewCount();
    }, MINIMUM_TIME_ON_PAGE);

    return () => clearTimeout(timer);
  }, []);

  const incrementViewCount = async () => {
    try {
      await apiInstance.post(`post/increment-view/${slug}/`);
    } catch (error) {
      console.error("Error incrementando la vista:", error);
    }
  };

  const handleCreateCommentChange = (event) => {
    setCreateComment({
      ...createComment,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userData) {
      return setShowLoginModal(true)
    }
    const jsonData = {
      post_id: post?.id,
      name: post.profile.full_name,
      email: post.user.email,
      comment: createComment.comment,
      user_id: userData?.user_id
    };
    
    try {
      const res = await handleCommentPostAPI(jsonData);
      fetchPost();
      Toast("success", "Comment Posted.", "");
      setCreateComment({
        comment: "",
      });
    } catch(err) {

    }
  };

  const handleLikePost = async (postId) => {
      if (!userData) {
          return setShowLoginModal(true)
      }
      const jsonData = { user_id: userData?.user_id, post_id: postId };
      try {
          const res = await handleLikePostAPI(jsonData);
          fetchPost();
          queryClient.invalidateQueries(['posts']);  
          if (res.data.message) {
            Toast("success", res.data.message, "");
          }
      } catch (err) {
          console.error("Error liking post:", err);
      }
  };
  
  const handleBookmarkPost = async (postId) => {
      if (!userData) {
        return setShowLoginModal(true)
      }
      const jsonData = { user_id: userData?.user_id, post_id: postId };
      try {
          const res = await handleBookmarkPostAPI(jsonData);
          queryClient.invalidateQueries(['posts']);  
          fetchPost();
          if (res.data.message) {
            Toast("success", res.data.message, "");
          }
      } catch (err) {
          console.error("Error bookmarking post:", err);
      }
  };


  const hasLiked = post.likes?.some(like => like.id === userData?.user_id);
  const hasBookmark = post.bookmarks?.some(bookmark => bookmark.user.id === userData?.user_id);

  
  return (
    <>
      <section className="pt-4">
      <style jsx>{` .btn-no-hover:hover { background-color: inherit !important; color: inherit !important; border-color: inherit !important; } `}</style>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-12 mx-auto mb-4">
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 text-muted">
                <div className="d-flex align-items-center me-2">
                  <i className="fas fa-calendar-alt  me-2"></i>
                  <span className="small">{moment(post.date).format("DD MMM, YYYY")}</span>
                </div>

                <div className="d-flex align-items-center me-2">
                  <i className="fas fa-eye text-secondary me-2"></i>
                  <span className="small">{post.view} Visitas</span>
                </div>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center btn-no-hover"
                  onClick={() => handleBookmarkPost(post.id)}
                >
                  <i
                    className={`fa-${hasBookmark ? "solid" : "regular"} fa-bookmark me-2`}
                    style={{ color: hasBookmark ? "#6c757d" : "inherit" }}
                  ></i>
                  <span className="small">{post.bookmarks?.length} Favoritos</span>
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center btn-no-hover"
                  onClick={() => handleLikePost(post.id)}
                >
                  <i
                    className={`${hasLiked ? "fa-solid" : "fa-regular"} fa-thumbs-up me-2`}
                    style={{ color: hasLiked ? "#6c757d" : "inherit" }}
                  ></i>
                  <span className="small">{post.likes?.length} Likes</span>
                </button>
              </div>
            </div>
          </div>
            <h1 className="text-center">{post.title}</h1>
            <br />
              <div className="post-content">
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="inline-content" />
              </div>
              <ul className="list-inline text-primary-hover mt-0 mt-lg-3 text-start">
                  {tags?.map((t, index) => (
                    <li className="list-inline-item">
                      <strong>#{t}</strong>
                    </li>
                  ))}
                <a href="#" className="badge bg-secondary mb-2 text-decoration-none">
                  <span className="fw-bold">
                    {post.category?.title}
                  </span>
                </a>
              </ul>
              <br />
              <hr />
              <div className="d-flex py-4 col-8">
                <Link to={`/profile/@${post.user?.username}`} onClick={(e) => e.stopPropagation() } style={{ width: "120px", height: "120px", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: "20px" }}>
                  <div className="avatar avatar-xxl me-4">
                    <img
                      className="avatar-img rounded-circle"
                      src={post.profile?.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      alt="perfil"
                    />
                  </div>
                </Link>
                <div className="">
                  <div className="d-sm-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="m-0">{post.profile?.full_name}</h4>
                      <small>{post.profile?.bio}</small>
                    </div>
                  </div>
                  {/* Social */}
                  <ul className="nav">
                    {post.profile?.facebook !== null && (
                      <li className="nav-item">
                        <a
                          className="nav-link ps-0 pe-2 fs-5"
                          target="_blank"
                          href={post.facebook}
                        >
                          <i className="fab fa-facebook-square" />
                        </a>
                      </li>
                    )}
                    {post.profile?.twitter !== null && (
                      <li className="nav-item">
                        <a
                          className="nav-link px-2 fs-5"
                          target="_blank"
                          href={post.twitter}
                        >
                          <i className="fab fa-twitter-square" />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <hr />
              <br />
              <div>
                <h5>
                  <i className="fa-solid fa-comment-dots me-2"></i>
                  {post.comments?.length} Comentarios
                </h5>
                <div>
            <Card className="shadow-sm p-4 mb-4 rounded">
                <p> Feel free to leave a comment. The author will get back to you shortly. </p> 
                <Form onSubmit={handleCreateCommentSubmit}>
                    <Form.Group controlId="commentForm.ControlTextarea">
                        <Form.Control
                            as="textarea"
                            rows={4}
                            onChange={handleCreateCommentChange}
                            name="comment"
                            value={createComment.comment}
                            placeholder="Your comment here..."
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-3">
                        <Button type="submit" variant="secondary" size="sm">
                            Comment <i className="fas fa-paper-plane"></i>
                        </Button>
                    </div>
                </Form>
            </Card>

            {post.comments?.map((c, index) => (
                <Card key={index} className="mb-3 shadow-sm rounded">
                    <Card.Body className="d-flex">
                        <Image
                            src={c.user_profile.image}
                            roundedCircle
                            fluid
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            alt="profile"
                            className="me-3"
                        />
                        <div className="w-100">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>{c.name || "Anonymous"}</strong>
                                <span className="text-muted small">{moment(c.date).format("DD MMM, YYYY")}</span>
                            </div>
                            <p className="mb-1">{c.comment}</p>
                            {c.reply && (
                                <Card className="mt-2 bg-light p-2 rounded">
                                    <Card.Body>
                                        <p className="mb-0 fw-bold text-dark">Reply:</p>
                                        <p className="text-dark">{c.reply}</p>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
        </div>

        </div>
      <Login show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
      </section>
    </>
  );
}

export default Detail;
