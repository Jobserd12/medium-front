import React, { useEffect, useState } from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useAuthStore } from "../../store/auth";
import useUserData from "../../plugin/useUserData";
import apiInstance from "../../utils/axios";
import { Link, useLocation } from "react-router-dom";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({ image: null });
  const username = useUserData()?.username;
  const [imagePreview, setImagePreview] = useState("");
  const location = useLocation();

  const fetchProfile = () => {
    apiInstance.get(`user/profile/${username}/`).then((res) => {
      setProfileData(res.data);
    });
  };

  useEffect(() => {
    console.log(profileData)
    fetchProfile();
  }, []);
  
  const isActive = (path) => location.pathname === path;

  return (
    <Dropdown align="end">
        <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}>
        <Image
          src={imagePreview || profileData?.image}
          id="img-uploaded"
          className="avatar-xl rounded-circle"
          alt="avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </Dropdown.Toggle>

        <Dropdown.Menu> 
            <Link to={`/profile/@${username}`} className="dropdown-item d-flex align-items-center gap-3">
                <i className={isActive("/profile/@:") ? "fas fa-user " : "fa-regular fa-user"}></i>
                <span>Profile</span>
            </Link>
            <Link to="/library" className="dropdown-item d-flex align-items-center gap-3"> 
                <i className={isActive("/library") ? "fas fa-bookmark " : "fa-regular fa-bookmark"}></i> 
                <span>Librería</span> 
            </Link> 
            <Link to="/posts" className="dropdown-item d-flex align-items-center gap-3"> 
                <i className={isActive("/posts") ? "fa fa-newspaper" : "fa-regular fa-newspaper"}></i> 
                <span>Pots</span> 
            </Link> 
            <Link to="/stats" className="dropdown-item d-flex align-items-center gap-3"> 
                <i className={isActive("/stats") ? "fa fa-star" : "fa-regular fa-star"}></i> 
                <span>Stats</span> 
            </Link> 
            <Dropdown.Divider /> 
                <Link to="/settings" className="dropdown-item d-flex align-items-center gap-3"> <span>Configuración</span> 
            </Link> 
            <Link to="/help" className="dropdown-item d-flex align-items-center gap-3"> 
                <span>Ayuda</span> 
            </Link> 
            <Dropdown.Divider /> 
            <Link to="/logout" className="dropdown-item d-flex align-items-center gap-3"> 
                <i className="fas fa-sign-out-alt"></i> 
                <span>Sign Out</span> 
            </Link> 
        </Dropdown.Menu> 
    </Dropdown>
  );
};

export default UserProfile;
