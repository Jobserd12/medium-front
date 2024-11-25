import React, { useEffect, useState } from "react";
import { Dropdown, Image } from "react-bootstrap";
import useUserData from "../../plugin/useUserData";
import { Link, useLocation } from "react-router-dom";
import { fetchProfileAPI } from "../../api/user";
import defaultUser from '../../assets/default-user.webp';

const UserProfile = () => {
  const username = useUserData()?.username;
  const [imagePreview, setImagePreview] = useState("");
  const location = useLocation();

  const updateHeaderImage = (newImageUrl) => {
    setImagePreview(newImageUrl);
  };

  const fetchProfile = () => {
    fetchProfileAPI(username).then((res) => {
      setImagePreview(res.data.image)
    });
  };

  useEffect(() => {
    // Escuchar evento personalizado para actualización de imagen
    window.addEventListener('profile-image-updated', (event) => {
      updateHeaderImage(event.detail.newImageUrl);
    });

    fetchProfile();

    // Limpiar el event listener
    return () => {
      window.removeEventListener('profile-image-updated', updateHeaderImage);
    };
  }, []);
  
  const isActive = (path) => location.pathname === path;

  return (
    <Dropdown align="end">
        <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}>
        <Image
          src={imagePreview || defaultUser }
          id="img-uploaded"
          className="avatar-xl text-muted rounded-circle"
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
                <i className={isActive(`/profile/@${username}`) ? "fas fa-user " : "fa-regular fa-user"}></i>
                <span>Profile</span>
            </Link>
            <Link to="/stats" className="dropdown-item d-flex align-items-center gap-3"> 
                <i className={isActive("/stats") ? "fa fa-star" : "fa-regular fa-star"}></i> 
                <span>Stats</span> 
            </Link> 
            <Dropdown.Divider /> 
                <Link to="#" className="dropdown-item d-flex align-items-center gap-3"> <span>Configuración</span> 
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
