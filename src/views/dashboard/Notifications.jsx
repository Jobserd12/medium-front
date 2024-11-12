import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Button, Badge, Tab, Tabs } from "react-bootstrap";
import useUserData from "../../plugin/useUserData";
import { useNotification } from "../../hooks/notification/useNotification";
import { useQueryClient } from "@tanstack/react-query";
import { deleteNotiAPI, markNotiAsSeenAPI } from "../../api/noti";
import Toast from "../../plugin/Toast";
import { Link } from "react-router-dom";
import NotificationItem from "../../components/dashboard/notificationItem";


function Notifications() {
  const userId = useUserData()?.user_id;
  const { data: notifications = [] } = useNotification(userId);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('unread');

  const unreadNotifications = notifications.filter(n => !n.seen);
  const readNotifications = notifications.filter(n => n.seen);

  const handleMarkNotiAsSeen = (notiId) => {
    markNotiAsSeenAPI(notiId)
      .then(() => {
        Toast("success", "Marked as read", "");
        queryClient.invalidateQueries(["noti"]);
      })
      .catch((err) => {
        Toast("error", "Failed to mark as read", "Please try again later.");
      });
  };

  const handleDeleteNoti = (notiId) => {
    deleteNotiAPI(notiId)
      .then(() => {
        Toast("success", "Notification deleted", "");
        queryClient.invalidateQueries(["noti"]);
      })
      .catch((err) => {
        Toast("error", "Failed to delete notification", "Please try again later.");
      });
  };

  return (
    <section className="pb-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold m-0">Notifications</h2>
          <div className="d-flex gap-2">
            {unreadNotifications.length > 0 && (
              <Badge bg="danger" pill>
                {unreadNotifications.length} new
              </Badge>
            )}
          </div>
        </div>

        <Card className="shadow-sm">
          <Card.Body className="p-0">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3 px-3 pt-3"
            >
              <Tab 
                eventKey="unread" 
                title={
                  <span>
                    Unread <Badge bg="danger">{unreadNotifications.length}</Badge>
                  </span>
                }
              >
                <ListGroup variant="flush">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkSeen={handleMarkNotiAsSeen}
                        onDelete={handleDeleteNoti}
                        isSeen={false}
                      />
                    ))
                  ) : (
                    <ListGroup.Item className="text-center py-5">
                      No unread notifications
                    </ListGroup.Item>
                    )}
                </ListGroup>
              </Tab>
              <Tab 
                eventKey="read" 
                title={
                  <span>
                    Read <Badge bg="secondary">{readNotifications.length}</Badge>
                  </span>
                }
              >
                <ListGroup variant="flush">
                  {readNotifications.length > 0 ? (
                    readNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkSeen={handleMarkNotiAsSeen}
                        onDelete={handleDeleteNoti}
                        isSeen={true}
                      />
                    ))
                  ) : (
                    <ListGroup.Item className="text-center py-5">
                      No read notifications
                    </ListGroup.Item>
                    )}
                </ListGroup>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default Notifications;
