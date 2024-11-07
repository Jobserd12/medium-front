import {NotificationItem} from "./notificationItem";


export const NotificationList = ({ notifications, handleMarkNotificationAsSeen }) => (
    <div className="custom-scrollbar h-350">
      {notifications.map((notification, index) => (
        <NotificationItem key={index} notification={notification} handleMarkNotificationAsSeen={handleMarkNotificationAsSeen} />
      ))}
    </div>
  );
  