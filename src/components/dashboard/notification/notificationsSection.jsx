import { Link } from "react-router-dom";
import { NotificationList } from "./notificationList";

export const NotificationsSection = ({
  notifications,
  handleMarkNotificationAsSeen,
}) => (
  <section className="mb-4">
    <h2 className="mb-3">Notifications</h2>
    <NotificationList
      notifications={notifications.slice(0, 3)}
      handleMarkNotificationAsSeen={handleMarkNotificationAsSeen}
    />
    <div className="d-flex justify-content-end">
      <Link to="/notifications/" className="btn btn-secondary mt-3">
        View all Notifications
      </Link>
    </div>
  </section>
);
