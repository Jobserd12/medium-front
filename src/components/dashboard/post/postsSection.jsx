import { Link } from "react-router-dom";
import { PostList } from "./postList";

export const PostsSection = ({ posts }) => (
  <section className="mb-4">
    <h2 className="mb-3">Posts ({posts.length})</h2>
    <PostList posts={posts} />
    <div className="d-flex justify-content-end">
      <Link to="/posts/" className="btn btn-secondary">
        View all Posts
      </Link>
    </div>
  </section>
);
