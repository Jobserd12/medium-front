import { useState } from 'react';
import { Card, Image, Form, Button, Collapse } from 'react-bootstrap';
import moment from 'moment';
import Toast from '../../plugin/Toast';
import defaultUser from '../../assets/default-user.webp';
import apiInstance from '../../utils/axios';
import { fetchRepliesAPI, handleDeleteReplyAPI, handleEditReplyAPI, handleSubmitReplyAPI } from '../../api/comment';

const Comment = ({
    comment,
    isAuthor,
    onEdit,
    onDelete,
    userData
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [showReplies, setShowReplies] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [replies, setReplies] = useState(comment.replies || []);
    const [isLoadingReplies, setIsLoadingReplies] = useState(false);

    const handleCommentEdit = async () => {
        try {
            await onEdit({
                commentId: comment.id,
                content: editedContent
            });
            setIsEditing(false);
        } catch (err) {
            Toast("error", "Error updating comment", "");
        }
    };

    const handleCommentDelete = async () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await onDelete(comment.id);
                Toast("success", "Comment successfully deleted", "");
            } catch (error) {
                Toast("error", "Error deleting comment", "");
            }
        }
    };

    //** REPLIES
    
    const fetchReplies = async () => {
        try {
            setIsLoadingReplies(true);
            const res = await fetchRepliesAPI(comment);
            setReplies(res.data);
        } catch (err) {
            console.error("Error loading answers");
        } finally {
            setIsLoadingReplies(false);
        }
    };

    const handleSubmitReply = async () => {
        if (!userData) {
            return Toast("error", "Authentication required", "Please log in to reply comment.");
        }
  
        try {
            const res = await handleSubmitReplyAPI(comment);
            setReplies([...replies, res.data]);
            setReplyContent('');
        } catch (err) {
            Toast("error", "Error sending reply", "");
        }
    };

    const handleEditReply = async (replyId, newContent) => {
        try {
            const res = await handleEditReplyAPI(replyId, newContent);
            const updatedReplies = replies.map(reply => 
                reply.id === replyId ? res.data : reply
            );
            setReplies(updatedReplies);
        } catch (err) {
            Toast("error", "Error updating response", "");
        }
    };

    const handleDeleteReply = async (replyId) => {
        if (window.confirm('Are you sure you want to delete this answer?')) {
            try {
                await handleDeleteReplyAPI(replyId);
                const filteredReplies = replies.filter(reply => reply.id !== replyId);
                setReplies(filteredReplies);
                Toast("success", "Response successfully deleted", "");
            } catch (error) {
                Toast("error", "Error deleting the answer", "");
            }
        }
    };

    const toggleReplies = () => {
        if (!showReplies && replies.length === 0) {
            fetchReplies();
        }
        setShowReplies(!showReplies);
    };

    const hasReplies = replies.length > 0;

    return (
        <Card className="mb-3 shadow-sm rounded">
            <Card.Body className="d-flex">
                <Image
                    src={comment.author_profile_image || defaultUser}
                    roundedCircle
                    fluid
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    alt="profile"
                    className="me-3"
                />
                <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong>{comment.author_name || "Anonymous"}</strong>
                        <div className="d-flex align-items-center gap-2">
                            <span className="text-muted small">
                                {moment(comment.created_at).format("DD MMM, YYYY")}
                            </span>
                            {(userData?.user_id === comment.author || isAuthor) && (
                                <div className="btn-group">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={handleCommentDelete}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {isEditing ? (
                        <Form className="mt-2">
                            <Form.Group>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                />
                            </Form.Group>
                            <div className="d-flex gap-2 mt-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleCommentEdit}
                                >
                                    Guardar
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditedContent(comment.content);
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </Form>
                    ) : (
                        <>
                            <p className="mb-1">{comment.content}</p>
                            <div className="mt-2">
                                <Button
                                    variant="link"
                                    className="text-muted p-0"
                                    onClick={toggleReplies}
                                >
                                    <i className={`fas fa-reply me-1`}></i>
                                    {hasReplies ? `${replies.length} respuestas` : "Responder"}
                                </Button>
                            </div>

                            <Collapse in={showReplies}>
                                <div className="mt-3">
                                    {isLoadingReplies ? (
                                        <div className="text-center">
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Cargando respuestas...
                                        </div>
                                    ) : (
                                        <>
                                            {hasReplies && (
                                                <div className="ms-4 mb-3">
                                                    {replies.map((reply) => (
                                                        <ReplyCard
                                                            key={reply.id}
                                                            reply={reply}
                                                            userData={userData}
                                                            onEdit={handleEditReply}
                                                            onDelete={handleDeleteReply}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            <div className="ms-4">
                                                <Form>
                                                    <Form.Group className="mb-2">
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={2}
                                                            placeholder="Escribe una respuesta..."
                                                            value={replyContent}
                                                            onChange={(e) => setReplyContent(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={handleSubmitReply}
                                                        disabled={!replyContent.trim()}
                                                    >
                                                        Responder
                                                    </Button>
                                                </Form>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Collapse>
                        </>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

// Componente auxiliar para mostrar las respuestas
const ReplyCard = ({ reply, userData, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(reply.content);

    const handleSaveEdit = async () => {
        await onEdit(reply.id, editedContent);
        setIsEditing(false);
    };

    return (
        <Card className="mb-2 border-0 bg-light">
            <Card.Body className="py-2 px-3">
                <div className="d-flex align-items-start">
                    <Image
                        src={reply.author_profile_image || defaultUser}
                        roundedCircle
                        fluid
                        style={{ width: "30px", height: "30px", objectFit: "cover" }}
                        alt="profile"
                        className="me-2"
                    />
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong className="me-2">{reply.author_name}</strong>
                                <small className="text-muted">
                                    {moment(reply.created_at).format("DD MMM, YYYY")}
                                </small>
                            </div>
                            {(userData?.user_id === reply.author || userData?.user_id === reply.post.author) && (
                                <div className="btn-group">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => onDelete(reply.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        {isEditing ? (
                            <Form className="mt-2">
                                <Form.Group>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                    />
                                </Form.Group>
                                <div className="d-flex gap-2 mt-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleSaveEdit}
                                    >
                                        Guardar
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditedContent(reply.content);
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </Form>
                        ) : (
                            <p className="mb-0 mt-1">{reply.content}</p>
                        )}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Comment;