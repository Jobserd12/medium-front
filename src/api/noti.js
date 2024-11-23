import apiInstance from "../utils/axios";

export const fetchNotiAPI = (userId)  => 
    apiInstance.get(`admin/noti-list/${userId}/`);

export const markNotiAsSeenAPI = (notiId) => 
    apiInstance.post("admin/noti-mark-seen/", { noti_id: notiId });

export const deleteNotiAPI = (notiId) => 
    apiInstance.delete(`admin/notifications/${notiId}/`);


