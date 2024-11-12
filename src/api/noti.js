import apiInstance from "../utils/axios";

export const fetchNotiAPI = (userId)  => 
    apiInstance.get(`author/dashboard/noti-list/${userId}/`);

export const markNotiAsSeenAPI = (notiId) => 
    apiInstance.post("author/dashboard/noti-mark-seen/", { noti_id: notiId });

export const deleteNotiAPI = (notiId) => 
    apiInstance.delete(`notifications/${notiId}/`);


