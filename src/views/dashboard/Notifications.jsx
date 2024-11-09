import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Button, Badge } from "react-bootstrap";
import useUserData from "../../plugin/useUserData";
import { useNotification } from "../../hooks/notification/useNotification";
import { useQueryClient } from "@tanstack/react-query";
import { markNotiAsSeenAPI } from "../../api/noti";
import Toast from "../../plugin/Toast";
import { Link } from "react-router-dom";

function Notifications() {
  const userId = useUserData()?.user_id;
  const { data: noti = [] } = useNotification(userId);
  const queryClient = useQueryClient();

  const handleMarkNotiAsSeen = (notiId) => {
    markNotiAsSeenAPI(notiId)
      .then(() => {
        Toast("success", "Notification Seen", "");
        queryClient.invalidateQueries(["noti"]);
      })
      .catch((err) => {
        Toast(
          "error",
          "Failed to mark notification as seen",
          "Please try again later."
        );
      });
  };

  useEffect(() => {
    noti.forEach((n) => {
      console.log(n);
    });
    console.log(noti.length)
  });
  return (
    <section className="pb-5">
      <Container>
        <div className="mb-4">
          <h2 style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Notifications</h2>
        </div>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              {noti.length > 0 ? (
                noti.map((n, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex align-items-center justify-content-between  mt-2"
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
                        <p className="mb-1">
                          {n.type === "Like" && (
                            <>
                              {n.actor_username} <b>liked</b> your post{" "}
                            </>
                          )}
                          {n.type === "Comment" && (
                            <>
                              {n.actor_username} <b>commented</b> on your post{" "}
                            </>
                          )}
                          {n.type === "Bookmark" && (
                            <>
                              {n.actor_username} <b>bookmarked</b> your post{" "}
                            </>
                          )}
                        </p>
                        <p className="m-0">{n.post?.title}</p>
                        {n.type === "Comment" && (
                          <Link to="/comments/">Ver comentarios</Link>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="small me-4"> {new Date(n.date).toLocaleTimeString()} </span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleMarkNotiAsSeen(n.id)}
                      >
                        <i className="fas fa-check-circle"></i>
                      </Button>
                    </div>
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
