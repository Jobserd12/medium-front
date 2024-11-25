import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Tooltip, OverlayTrigger } from 'react-bootstrap'; 
import useUserData from "../../plugin/useUserData";
import apiInstance from "../../utils/axios";
import Toast from "../../plugin/Toast";
import { useQueryClient } from "@tanstack/react-query";
import defaultImagePost from '../../assets/default-image-post.webp';
import '../../views/styles/postCard.css';

function PostCard({ post }) {
    const userData = useUserData();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const handleBookmarkPost = async (postId) => {
        if (!userData) {
            return Toast("error", "Authentication required", "Please log in to bookmark posts.");
        }
        const jsonData = { user_id: userData?.user_id, post_id: postId };
        try {
            const res = await apiInstance.post("admin/post/bookmark-post/", jsonData);
            queryClient.invalidateQueries(['posts']);  // Invalidate posts query to refetch the data
            if (res.data.message){
                Toast("success", res.data.message, "");
            }
        } catch (err) {
            console.error("Error bookmarking post:", err.response);
        }
    };
  
  

    const navigateToDetail = () => {
        navigate(`/post/${post.slug}`); 
    };

    const hasBookmark = post.bookmarks?.some(bookmark => bookmark.user.id === userData?.user_id);

    // Tooltip component
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Bookmark
        </Tooltip>
    );


    return (
        <div className="col-sm-6 col-lg-4 mb-4">
            <div className="card shadow post-card user-select-auto" role="button" onClick={navigateToDetail}>
                <div className="card-header p-0 border-0 m-0">
                    <img className="card-img" src={post.image || defaultImagePost} alt={post.title} />
                </div>
                <div className="card-body p-3" style={{ height: "150px" }}>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="small text-muted">{post.preview}</p>
                </div>
                <div className="card-footer mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                            <Link to={`/profile/@${post.user.username}`} onClick={(e) => e.stopPropagation() } style={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: "20px" }}>
                                <img src={post.profile.image} alt="Sal" style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "20px" }} />
                            </Link>
                            <div className="d-flex flex-column">
                                <Link className="small text-dark link-hover" to={`/profile/@${post.user.username}`} onClick={(e) => e.stopPropagation() } >{post.user.username}</Link>
                                <small>
                                    <time dateTime={moment(post.date).format("YYYY-MM-DD")}>
                                        {moment(post.date).format("DD MMM, YYYY")}
                                    </time>
                                </small>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <OverlayTrigger placement="top" overlay={renderTooltip}>
                                <button 
                                    type="button" 
                                    className={`btn btn-link ${hasBookmark ? 'text-light' : 'text-secondary'}`}
                                    onClick={(e) => { e.stopPropagation(); handleBookmarkPost(post.id); }}
                                >
                                    <i className={`fa-${hasBookmark ? "solid" : "regular"} fa-bookmark`} style={{ margin: "auto", color: "#000" }}></i>
                                    <span className="text-black ms-1">+</span> 
                                </button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
