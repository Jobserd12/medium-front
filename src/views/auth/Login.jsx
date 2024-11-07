import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { login } from "../../utils/auth";

function Login({ show, handleClose }) {
    const [bioData, setBioData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleBioDataChange = (event) => {
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });
        setError(""); 
    };

    const resetForm = () => {
        setBioData({ email: "", password: "" });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(""); 

        
        if (!bioData.email || !bioData.password) {
            setError("Por favor, complete todos los campos obligatorios.");
            setIsLoading(false);
            return; 
        }
        try {
            await login(bioData.email, bioData.password);
            handleClose(); 
        } catch(err) {
            console.log(err)
            setError("Error de inicio de sesión: " + err); 
            resetForm();
        }

        setIsLoading(false);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={bioData.email}
                            onChange={handleBioDataChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={bioData.password}
                            onChange={handleBioDataChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>} 
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <span className="mr-2">Processing...</span>
                            <i className="fas fa-spinner fa-spin" />
                        </>
                    ) : (
                        <>
                            <span className="mr-2">Sign In</span>
                            <i className="fas fa-sign-in-alt" />
                        </>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Login;
