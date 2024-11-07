export const NotificationItem = ({ notification, handleMarkNotificationAsSeen }) => {

  const renderNotificationContent = () => {
    switch (notification.type) {
      case 'Like':
        return 'Your post received a like!';
      case 'Comment':
        return 'Someone commented on your post!';
      case 'Bookmark':
        return 'Your post was bookmarked!';
      case 'Save':
        return 'Your post was saved!';
      default:
        return 'You have a new notification.';
    }
  };

  const renderIconBadge = () => {
    switch (notification.type) {
      case 'Like':
        return <i className="fas fa-thumbs-up text-primary fs-5" />;
      case 'Comment':
        return <i className="far fa-comment text-warning fs-5" />;
      case 'Bookmark':
        return <i className="bi bi-suit-heart-fill me-1"></i>;
      case 'Save':
        return <i className="fa-solid fa-floppy-disk me-1"></i>;
      default:
        return null;
    }
  };

  return (
    <div className="col-12 shadow px-4">
      <div className="d-flex justify-content-between position-relative">
        <div className="d-flex align-items-center bg-secondary">
          <div className="p-2">
            <div className="d-flex justify-content-between mb-1">
              <h6 className="mb-0">{notification.type}</h6>
              {renderIconBadge()}
            </div>
            <p className="mb-0">
              {renderNotificationContent()}
            </p>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="small">5 min ago</span>
              <button
                onClick={() => handleMarkNotificationAsSeen(notification.id)}
                className="btn btn-secondary mt-2"
              >
                <i className="fas fa-check-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-3" />
    </div>
  );
};
