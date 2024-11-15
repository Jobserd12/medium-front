import apiInstance from "../utils/axios";

export const fetchProfileAPI = (username) => 
    apiInstance.get(`user/profile/${username}/`);

