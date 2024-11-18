import apiInstance from "../utils/axios";

export const fetchProfileAPI = (username) => 
    apiInstance.get(`user/profile/${username}/`);

export const followToggleUserAPI = (pk) => 
    apiInstance.post(`follow-toggle/${pk}/`);

