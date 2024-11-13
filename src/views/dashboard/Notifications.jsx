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

  const handleMarkNotiAsSeen = async (notiId) => {
    try {
      await markNotiAsSeenAPI(notiId);
      Toast("success", "Marked as read", "");
      await queryClient.invalidateQueries(["noti"]);
    } catch (err) {
      console.error('Error marking notification as seen:', err);
      Toast("error", "Failed to mark as read", "Please try again later.");
    }
  };
  
  const handleDeleteNoti = async (notiId) => {
    try {
      await deleteNotiAPI(notiId);
      Toast("success", "Notification deleted", "");
      await queryClient.invalidateQueries(["noti"]);
    } catch (err) {
      console.error('Error deleting notification:', err);
      Toast("error", "Failed to delete notification", "Please try again later.");
    }
  };

  return (
    <section className="py-5">
      <Container className="max-w-3xl mx-auto"> {/* Contenedor más estrecho */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-0 text-2xl font-normal">Notifications</h2> {/* Título más ligero */}
          <div className="d-flex gap-2">
            {unreadNotifications.length > 0 && (
              <span className="text-sm text-danger"> {/* Badge más sutil */}
                {unreadNotifications.length} new
              </span>
            )}
          </div>
        </div>

        {/* Eliminamos el Card para un diseño más limpio */}
        <div className="border-bottom mb-4"> {/* Separador sutil */}
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="border-0"
            style={{
              '--bs-nav-tabs-border-width': '0',
              '--bs-nav-tabs-link-active-color': '#000',
              '--bs-nav-tabs-link-active-bg': 'transparent',
              '--bs-nav-tabs-link-hover-border-color': 'transparent',
              '--bs-nav-link-color': '#6c757d',
              '--bs-nav-link-hover-color': '#000'
            }}
          >
            <Tab 
              eventKey="unread" 
              title={
                <span className="d-flex align-items-center gap-2 px-1">
                  Unread
                  {unreadNotifications.length > 0 && (
                    <span className="text-xs text-secondary">
                      {unreadNotifications.length}
                    </span>
                  )}
                </span>
              }
              className="border-0"
            >
              <ListGroup variant="flush" className="py-3">
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
                  <div className="text-center py-5 text-secondary">
                    No unread notifications
                  </div>
                )}
              </ListGroup>
            </Tab>
            <Tab 
              eventKey="read" 
              title={
                <span className="d-flex align-items-center gap-2 px-1">
                  Read
                  {readNotifications.length > 0 && (
                    <span className="text-xs text-secondary">
                      {readNotifications.length}
                    </span>
                  )}
                </span>
              }
              className="border-0"
            >
              <ListGroup variant="flush" className="py-3">
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
                  <div className="text-center py-5 text-secondary">
                    No read notifications
                  </div>
                )}
              </ListGroup>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </section>
  );
}

export default Notifications;