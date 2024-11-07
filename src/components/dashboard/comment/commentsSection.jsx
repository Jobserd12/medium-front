import { Link } from "react-router-dom";
import { CommentList } from "./commentList";

export const CommentsSection = ({ comments, handleMarkNotificationAsSeen }) => (
  <section className="mb-4">
    <h2 className="mb-3">Comments ({comments.length})</h2>
    <CommentList
      comments={comments.slice(0, 3)}
      handleMarkNotificationAsSeen={handleMarkNotificationAsSeen}
    />
    <div className="d-flex justify-content-end">
      <Link to="/comments/" className="btn btn-secondary mt-3">
        View all Comments
      </Link>
    </div>
  </section>
);
