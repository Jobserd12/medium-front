import { Link } from "react-router-dom";
import moment from "moment";

export const PostItem = ({ post }) => (
  <div className="card w-100">
    <img
      className="card-img-top"
      src={post.image}
      alt="Post image"
      style={{ height: "180px", objectFit: "cover", borderRadius: "10px" }}
    />
    <div className="card-body text-black ">
      <h5 className="card-title">
        <Link
          to={`/post/${post.id}`}
          className="text-decoration-none text-dark"
        >
          {post.title}
        </Link>
      </h5>
      <div className="d-flex justify-content-between">
        <p className="small text-muted">
          <i className="fas fa-calendar me-2"></i>
          {moment(post.date).format("DD MMM, YYYY")}
        </p>
        <div>
          <span className="small mb-0 me-2">
            <i className="fas fa-eye me-1"></i>
            {post.view} |
          </span>
          <span className="small mb-0 me-2">
            <i className="fas fa-thumbs-up me-1"></i>
            {post.likes?.length} |
          </span>
          <span className="small mb-0 me-2">
            <i className="bi bi-suit-heart-fill me-1"></i>
            {post.bookmarks?.length} |
          </span>
        </div>
      </div>
    </div>
  </div>
);
