import React, { useState } from "react";
import { ListGroup, Button, Image } from "react-bootstrap";
import MinimalModal from "../ui/minimalModal";
import { Link } from "react-router-dom";
import './notifications.style.css';

function NotificationItem({ notification, onMarkSeen, onDelete, isSeen }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getIcon = (type) => {
        const icons = {
            Like: <i className="fa-solid fa-thumbs-up"></i>,
            Comment: <i className="fa-solid fa-comment"></i>,
            Bookmark: <i className="fa-solid fa-bookmark"></i>,
            Follow: <i className="fa-solid fa-user-plus"></i>,
        };
        return icons[type] || null;
    };

    const getMessage = (type) => {
        const messages = {
            Like: "liked your post",
            Comment: "commented on your post",
            Bookmark: "bookmarked your post",
            Follow: "started following you"
        };
        return messages[type] || "";
    };

    return (
        <>
            <ListGroup.Item className="d-flex align-items-center justify-content-between p-3">
                <div className="d-flex align-items-center">
                    {getIcon(notification.type)}
                    <Link to={`/profile/@${notification.actor_username}`} className="text-decoration-none d-flex align-items-center">
                      <Image 
                          src={notification.actor_profile} 
                          roundedCircle 
                          className="ms-4 me-2" 
                          style={{ width: "40px", height: "40px" }} 
                      />
                      <div>
                              <strong>{notification.actor_full_name || notification.actor_username}</strong>
                          <p className="mb-0 small text-muted">
                              {getMessage(notification.type)}
                          </p>
                      </div>
                    </Link>
                </div>
                <div className="d-flex align-items-center">
                    <span className="text-muted me-4 small">
                        {new Date(notification.date).toLocaleString()}
                    </span>
                    {isSeen ? (
                        <>
                            <Button variant="outline-danger" size="sm" onClick={() => setShowDeleteModal(true)} className="btn-icon" title="Delete notification">
                                <i className="fa-solid fa-trash"></i>
                            </Button> &nbsp;&nbsp;&nbsp;
                            <Button variant="outline-primary" size="sm" onClick={() => onMarkSeen(notification.id)} className="btn-icon" title="Delete viewed">
                                <i class="fa-solid fa-arrow-right-arrow-left"></i>
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline-success" size="sm" onClick={() => onMarkSeen(notification.id)} className="btn-icon" title="Mark as read">
                            <i className="fa-solid fa-check"></i>
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
