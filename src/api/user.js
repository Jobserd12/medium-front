import apiInstance from "../utils/axios";

export const fetchProfileAPI = (userId) => 
    apiInstance.get(`user/profile/${userId}/`);

