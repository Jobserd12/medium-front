import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useParams } from "react-router-dom";

import apiInstance from "../../utils/axios";
import moment from "moment";
import Toast from "../../plugin/Toast";
import useUserData from "../../plugin/useUserData";

function Detail() {
  const [post, setPost] = useState([]);
  const [tags, setTags] = useState([]);
  const userData = useUserData();
  const [createComment, setCreateComment] = useState({
    full_name: "",
    email: "",
    comment: "",
  });

  const param = useParams();
  const MINIMUM_TIME_ON_PAGE = 5000;

  const fetchPost = async () => {
    try {
      const response = await apiInstance.get(`post/detail/${param.slug}/`);
      setPost(response.data);
      console.log(response.data);
      const tagArray = response.data?.tags?.split(",");
      setTags(tagArray);
    } catch(err) {
      console.log(err)
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
      await apiInstance.post(`post/increment-view/${param.slug}/`);
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
    const jsonData = {
      post_id: post?.id,
      name: createComment.full_name,
      email: createComment.email,
      comment: createComment.comment,
      user_id: userData?.user_id
    };

    const response = await apiInstance.post(`post/comment-post/`, jsonData);
    fetchPost();
    Toast("success", "Comment Posted.", "");
    setCreateComment({
      full_name: "",
      email: "",
      comment: "",
    });
  };

  const handleLikePost = async (postId) => {
      if (!userData) {
          return Toast("error", "Authentication required", "Please log in to like posts.");
      }
      const jsonData = { user_id: userData?.user_id, post_id: postId };
      try {
          const res = await apiInstance.post("post/like-post/", jsonData);
          fetchPost();
          Toast("success", res.data.message, "");
      } catch (err) {
          console.error("Error liking post:", err);
      }
  };

  const handleBookmarkPost = async (postId) => {
      if (!userData) {
          return Toast("error", "Authentication required", "Please log in to bookmark posts.");
      }
      const jsonData = { user_id: userData?.user_id, post_id: postId };
      try {
          const res = await apiInstance.post("post/bookmark-post/", jsonData);
          fetchPost();
          Toast("success", res.data.message, "");
      } catch (err) {
          console.error("Error bookmarking post:", err);
      }
  };


  const hasLiked = post.likes?.some(like => like.id === userData?.user_id);
  const hasBookmark = post.bookmarks?.some(bookmark => bookmark.user.id === userData?.user_id);

  return (
    <>
      <section className="pt-4">
        <div className="container position-relative" data-sticky-container="">
          <div className="row">
      
            <div className="col-lg-10 col-md-12 m-auto mb-2">
                <ul className="list-inline list-unstyled d-flex flex-wrap gap-2 justify-content-around">
                  <li className="list-inline-item my-lg-2 text-start">
                    <i className="fas fa-calendar"></i>{" "}
                    {moment(post.date).format("DD MMM, YYYY")}
                  </li>
                  <li className="list-inline-item my-lg-2 text-start">
                    <i className="fas fa-eye me-1" /> {post.view} Visitas
                  </li>
                  <span className="mx-2 d-none d-md-block">|</span>
                  <div className="w-100 d-block d-md-none"></div>
                  <li className="list-inline-item my-lg-2 text-start">
                    <button type="button" className="px-2" onClick={() => handleBookmarkPost(post.id)}>
                      <i className={`fa-${hasBookmark ? "solid" : "regular"} fa-bookmark`} style={{ margin: "auto", color: "#000" }}></i>
                        <small>{post.bookmarks?.length}</small> 
                        <span className="ms-1">Favoritos</span> 
                    </button>
                  </li>
                  <li className="list-inline-item my-lg-2 text-start">
                    <button type="button" className="px-2" onClick={() => handleLikePost(post.id)} style={{ marginLeft: "7px"}}>
                        <i className={hasLiked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"} style={{ color: hasLiked ? "#5a63ee" : "gray", marginRight: "2px"}}></i>
                        <small>{post.likes?.length}</small>
                        <span className="ms-1">Likes</span> 
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <h1 className="text-center">{post.title}</h1>
            <br />
              <p>{post.description} </p>
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
                
              <hr />
              <div className="d-flex d-lg-none py-4">
                <a href="#">
                  <div className="avatar avatar-xxl me-4">
                    <img
                      className="avatar-img rounded-circle"
                      src={post.profile?.image}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      alt="perfil"
                    />
                  </div>
                </a>
                <div>
                  <div className="d-sm-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="m-0">{post.profile?.full_name}</h4>
                      <small>{post.profile?.bio}</small>
                    </div>
                  </div>
                  <p className="my-1">{post.profile?.about}</p>
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

              <div>
                <h5>
                  <i className="fa-solid fa-comment-dots me-2"></i>
                  {post.comments?.length} Comentarios
                </h5>
              <div className="shadow-sm p-4 rounded shadow">
                <form onSubmit={handleCreateCommentSubmit}>
                  <div className="col-12">
                    <textarea
                      onChange={handleCreateCommentChange}
                      name="comment"
                      value={createComment.comment}
                      className="form-control"
                      rows={4}
                      placeholder="Tu comentario aquí..."
                      required
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-secondary">
                      Comentar <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>

                {post.comments?.map((c, index) => (
                  <div
                    key={index}
                    className="my-4 d-flex shadow p-3 mb-3 rounded"
                  >
                    <img
                      className="avatar avatar-md rounded-circle float-start me-3"
                      src={c.user_profile.image}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      alt="perfil"
                    />
                    <div className="w-100">
                      <div className="col-12 mb-2 d-flex align-items-center justify-content-between">
                        <h5 className="m-0">{c.name || "Anónimo"}</h5>
                        <span className="me-3 small">
                          {moment(c.date).format("DD MMM, YYYY")}
                        </span>
                      </div>
                      <p className="fw-bold">{c.comment}</p>

                      {c.reply !== null && (
                        <div className="mt-2 bg-light p-2 rounded">
                          <p className="m-0 fw-bold text-dark">
                            <small>Respuesta:</small>
                          </p>
                          <p className="text-dark">{c.reply}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
        </div>
      </section>
    </>
  );
}

export default Detail;
