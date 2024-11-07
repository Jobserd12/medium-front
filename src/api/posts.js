import apiInstance from "../utils/axios";

export const fetchPostsAPI = (page = 1)  => 
    apiInstance.get(`post/lists/?page=${page}`);

export const fetchCategoriesAPI = () => 
    apiInstance.get("post/category/list/");

export const fetchPopularPostsAPI = () =>
    apiInstance.get("post/list-popular/");

export const fetchPostsByCategoryAPI = (slug, page = 1) =>
    apiInstance.get(`post/category/posts/${slug}/?page=${page}`);

export const searchPostsAPI = (query, page = 1) => 
    apiInstance.get(`post/search/?query=${query}&page=${page}`);
 


  
