import React, { useEffect, useState } from 'react';
import { logout } from '../../utils/auth';
import Login from './Login';

const LogoutPage = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="bg-light d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-md-10 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="text-center mt-4">
                <div className="mx-auto rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-sign-out-alt fa-2x text-primary"></i>
                </div>
              </div>
              
              <div className="card-body text-center">
                <h3 className="fw-bold mb-2">Session Closed</h3>
                <p className="text-muted mb-4">
                    Thank you for visiting our platform, we look forward to seeing you soon!
                </p>
                
                <div className="d-grid gap-3">
                  <span onClick={() => setShowLoginModal(true)} className="btn btn-secondary btn-lg position-relative">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Iniciar Sesión
                  </span>
                  <span className="btn btn-outline-secondary btn-lg position-relative"
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Crear Cuenta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Login show={showLoginModal} handleClose={() => setShowLoginModal(false)} />

    </div>
  );
};

export default LogoutPage;