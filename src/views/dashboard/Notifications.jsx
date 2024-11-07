import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Card, ListGroup, Button, Badge } from "react-bootstrap";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";

function Notifications() {
  const [noti, setNoti] = useState([]);
  const userId = useUserData()?.user_id;

  const fetchNoti = async () => {
    const response = await apiInstance.get(
      `author/dashboard/noti-list/${userId}/`
    );
    setNoti(response.data);
  };

  useEffect(() => {
    fetchNoti();
    noti.forEach(n => console.log(n))
  }, []);

  const handleMarkNotiAsSeen = async (notiId) => {
    await apiInstance.post("author/dashboard/noti-mark-seen/", { noti_id: notiId });
    Toast("success", "Notification Seen", "");
    fetchNoti();
  };

  return (
    <section className="pt-5 pb-5">
      <Container>
        <div className="mb-5">
          <h1 className="display-4">Notifications</h1>
        </div>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              {noti.length > 0 ? (
                noti.map((n, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <div className="icon-lg bg-opacity-15 rounded-2 flex-shrink-0 me-3">
                        {n.type === "Like" && (
                          <i className="fas fa-thumbs-up text-primary fs-5"></i>
                        )}
                        {n.type === "Comment" && (
                          <i className="bi bi-chat-left-quote-fill text-success fs-5"></i>
                        )}
                        {n.type === "Bookmark" && (
                          <i className="fas fa-bookmark text-danger fs-5"></i>
                        )}
                      </div>
                      <div>
                        <h6 className="mb-0">{n.type}</h6>
                        <p className="mb-1">
                          {n.type === "Like" && (
                            <>{n.actor_username} liked your post <b>{n.post?.title?.slice(0, 30) + "..."}</b></>
                          )}
                          {n.type === "Comment" && (
                            <>{n.actor_username} a new comment on <b>{n.post?.title?.slice(0, 30) + "..."}</b></>
                          )}
                          {n.type === "Bookmark" && (
                            <>{n.actor_username} bookmarked your post <b>{n.post?.title?.slice(0, 30) + "..."}</b></>
                          )}
                        </p>
                        <Badge variant="secondary" className="small">5 min ago</Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleMarkNotiAsSeen(n.id)}
                    >
                      <i className="fas fa-check-circle"></i>
                    </Button>
                  </ListGroup.Item>
                ))
              ) : (
                <p className="text-center">No notifications yet</p>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default Notifications;
