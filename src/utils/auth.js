// Importing the useAuthStore hook from the '../store/auth' file to manage authentication state
import { useAuthStore } from "../store/auth";

// Importing the axios library for making HTTP requests

// Importing jwt_decode to decode JSON Web Tokens
import { jwtDecode } from "jwt-decode";
// Importing the Cookies library to handle browser cookies
import Cookies from "js-cookie";

// Importing Swal (SweetAlert2) for displaying toast notifications
import Swal from "sweetalert2";
import apiInstance from "./axios";

// Configuring global toast notifications using Swal.mixin
//! Sin usar
const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

// Function to handle user login
export const login = async (email, password) => {
    try {
        // Making a POST request to obtain user tokens
        const { data, status } = await apiInstance.post("user/token/", {
            email,
            password,
        }); 
        
        // If the request is successful (status code 200), set authentication user and display success toast
        if (status === 200) {
            setAuthUser(data.access, data.refresh);
            location.href = '/';
            // Displaying a success toast notification
        }

        // Returning data and error information
        return { data, error: null };
    } catch (err) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: err.response.data?.detail || "Something went wrong",
        };
    }
};

// Function to handle user registration
export const register = async (full_name, email, password, password2) => {
    try {
        // Making a POST request to register a new user
        const { data } = await apiInstance.post("user/register/", {
            full_name,
            email,
            password,
            password2,
        });

        // Logging in the newly registered user and displaying success toast
        await login(email, password);

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error.response.data || "Something went wrong",
        };
    }
};

// Function to handle user logout
export const logout = () => {
    // Removing access and refresh tokens from cookies, resetting user state, and displaying success toast
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    useAuthStore.getState().setUser(null);
};

// Function to set the authenticated user on page load
export const setUser = async () => {
    // Retrieving access and refresh tokens from cookies
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    // Checking if tokens are present
    if (!accessToken || !refreshToken) {
        return;
    }

    // If access token is expired, refresh it; otherwise, set the authenticated user
    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(accessToken, refreshToken);
    }
};

// Function to set the authenticated user and update user state
export const setAuthUser = (access_token, refresh_token) => {
    // Setting access and refresh tokens in cookies with expiration dates
    Cookies.set("access_token", access_token, {
        expires: 1, // Access token expires in 1 day
        secure: true,
    });

    Cookies.set("refresh_token", refresh_token, {
        expires: 7, // Refresh token expires in 7 days
        secure: true,
    });
    console.log("token2"+ jwtDecode(access_token))

    // Decoding access token to get user information
    const user = jwtDecode(access_token) ?? null;
    console.log("token")
    // If user information is present, update user state; otherwise, set loading state to false
    if (user) {
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
};

// Function to refresh the access token using the refresh token
export const getRefreshToken = async () => {
    // Retrieving refresh token from cookies and making a POST request to refresh the access token
    const refresh_token = Cookies.get("refresh_token");
    const response = await apiInstance.post("user/token/refresh/", {
        refresh: refresh_token,
    });

    // Returning the refreshed access token
    return response.data;
};

// Function to check if the access token is expired
export const isAccessTokenExpired = (accessToken) => {
    try {
        // Decoding the access token and checking if it has expired
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.exp < Date.now() / 1000;
    } catch (err) {
        // Returning true if the token is invalid or expired
        return true;
    }
};