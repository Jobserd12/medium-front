import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import MinimalModal from "../ui/minimalModal";
import { Link } from "react-router-dom";

function NotificationItem({ notification, onMarkSeen, onDelete, isSeen }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getIcon = (type) => {
    const icons = {
      Like: <i className="fas fa-thumbs-up text-primary fs-5"></i>,
      Comment: <i className="bi bi-chat-left-quote-fill text-success fs-5"></i>,
      Bookmark: <i className="fas fa-bookmark text-danger fs-5"></i>
    };
    return icons[type] || null;
  };

  const getMessage = (n) => {
    const messages = {
      Like: `${n.actor_username} liked your post`,
      Comment: `${n.actor_username} commented on your post`,
      Bookmark: `${n.actor_username} bookmarked your post`
    };
    return messages[n.type] || "";
  };

  return (
    <>
      <ListGroup.Item className="d-flex align-items-center justify-content-between p-3 border-bottom hover-bg-light">
        <div className="d-flex align-items-center flex-grow-1">
          <div className="icon-lg bg-opacity-15 rounded-2 flex-shrink-0 me-3">
            {getIcon(notification.type)}
          </div>
          <div>
            <p className="mb-1 fw-bold">{getMessage(notification)}</p>
            {notification.type === "Comment" && (
              <Link to="/comments/" className="btn btn-link btn-sm p-0">
                Ver comentarios <i className="fas fa-arrow-right ms-1"></i>
              </Link>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center">
          <small className="text-muted me-3">
            {new Date(notification.date).toLocaleString()}
          </small>
          {isSeen ? (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              className="btn-icon"
              title="Delete notification"
            >
              <i className="fas fa-trash"></i>
            </Button>
          ) : (
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => onMarkSeen(notification.id)}
              className="btn-icon"
              title="Mark as read"
            >
              <i className="fas fa-check-circle"></i>
            </Button>
          )}
        </div>
      </ListGroup.Item>

      <MinimalModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        body="Are you sure you want to delete this item?"
        onConfirm={() => onDelete(notification.id)}
      />
    </>
  );
}

export default NotificationItem;