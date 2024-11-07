import { PostItem } from "./postItem";

export const PostList = ({ posts }) => (
  <div className="row">
    {posts.slice(0, 4).map((post, index) => (
      <div key={index} className="col-md-6 col-12 mb-4 d-flex">
        <PostItem post={post} />
      </div>
    ))}
  </div>
);
