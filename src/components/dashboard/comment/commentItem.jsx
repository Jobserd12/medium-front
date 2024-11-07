import { Link } from "react-router-dom";

import moment from 'moment';

export const CommentItem = ({ comment, handleMarkNotificationAsSeen }) => (
    <div className="col-12 shadow">
      <div className="d-flex align-items-center position-relative">
        {/* <Avatar avatarUrl={comment.avatar} /> */}
        <img src={comment.avatar} alt="" />
        <div className="ms-3">
          <p className="mb-1">
            <Link to="#" className="h6 stretched-link text-decoration-none text-dark">
              {comment.name}
            </Link>
          </p>
          <div className="d-flex justify-content-between">
            <p className="small mb-0">
              <i>by</i> {comment.name} <br />
              <i>Date</i> {moment(comment.date).format("DD MMM, YYYY")}
            </p>
          </div>
        </div>
      </div>
      <hr className="my-3" />
    </div>
  );
  