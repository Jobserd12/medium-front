import React, { useEffect, useState } from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useAuthStore } from "../../store/auth";
import useUserData from "../../plugin/useUserData";
import apiInstance from "../../utils/axios";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    image: null,
    full_name: "",
    about: "",
    bio: "",
    facebook: "",
    twitter: "",
    country: "",
  });
  const userId = useUserData()?.user_id;
  const [imagePreview, setImagePreview] = useState("");
  const location = useLocation();

  const fetchProfile = () => {
    apiInstance.get(`user/profile/${userId}/`).then((res) => {
      setProfileData(res.data);
    });
  };

  useEffect(() => {
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
            <Dropdown.Item href="/profile" className="d-flex align-items-center gap-3"> 
                <i className={isActive("/profile") ? "fas fa-user " : "fa-regular fa-user"}></i> <span>Perfil</span> 
            </Dropdown.Item> 
            <Dropdown.Item href="/library" className="d-flex align-items-center gap-3"> 
                <i className={isActive("/library") ? "fas fa-bookmark " : "fa-regular fa-bookmark"}></i> 
                <span>Librería</span> 
            </Dropdown.Item> 
            <Dropdown.Item href="/posts" className="d-flex align-items-center gap-3"> 
                <i className={isActive("/posts") ? "fa fa-newspaper" : "fa-regular fa-newspaper"}></i> 
                <span>Pots</span> 
            </Dropdown.Item> 
            <Dropdown.Item href="/stats" className="d-flex align-items-center gap-3"> 
                <i className={isActive("/stats") ? "fa fa-star" : "fa-regular fa-star"}></i> 
                <span>Stats</span> 
            </Dropdown.Item> 
            <Dropdown.Divider /> 
                <Dropdown.Item href="/settings" className="d-flex align-items-center gap-3"> <span>Configuración</span> 
            </Dropdown.Item> 
            <Dropdown.Item href="/help" className="d-flex align-items-center gap-3"> 
                <span>Ayuda</span> 
            </Dropdown.Item> 
            <Dropdown.Divider /> 
            <Dropdown.Item href="/logout" className="d-flex align-items-center gap-3"> 
                <i className="fas fa-sign-out-alt"></i> 
                <span>Sign Out</span> 
            </Dropdown.Item> 
        </Dropdown.Menu> 
    </Dropdown>
  );
};

export default UserProfile;
