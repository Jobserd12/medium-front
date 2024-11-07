import { CommentItem } from "./commentItem";



export const CommentList = ({ comments, handleMarkNotificationAsSeen }) => (
    <div className="row">
      {comments.map((comment, index) => (
        <CommentItem key={index} comment={comment} handleMarkNotificationAsSeen={handleMarkNotificationAsSeen} />
      ))}
    </div>
  );

