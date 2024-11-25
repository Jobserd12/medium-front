import apiInstance from "../utils/axios";

export const fetchCommentAPI = async () => {
    return apiInstance.get("admin/post/comments/");
}

export const handleCommentPostAPI = (jsonData) => {
  return apiInstance.post("admin/post/comments/", {
      post_id: jsonData.post_id, 
      content: jsonData.content
  });
};
export const handleCommentUpdateAPI = (jsonData) => {
    return apiInstance.put("admin/post/comments/", {
        comment_id: jsonData.comment_id,
        content: jsonData.content
    });
};

export const handleDeleteCommentAPI = (commentId) => {
    return apiInstance.delete(`admin/post/comments/?comment_id=${commentId}`);
};


// REPLIES

export const fetchRepliesAPI = async (comment) => {
    return apiInstance.post("admin/post/reply-comments/", {comment_id: comment.id});
}

export const handleSubmitReplyAPI = async (comment) => {
    return apiInstance.post("admin/post/reply-comments/", {
        comment_id: comment.id,
        content: comment.content
    });
}

export const handleEditReplyAPI = async (replyId, newContent) => {
    return apiInstance.put('admin/post/reply-comments/', {
        reply_id: replyId,
        content: newContent
    });
};


export const handleDeleteReplyAPI = async (replyId) => {
    apiInstance.delete('admin/post/reply-comments/', {reply_id: replyId});
};
