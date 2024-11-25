import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { login } from "../../utils/auth";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function Login({ show, handleClose, onSwitchToRegister }) {
    const [formData, setFormData] = useState({ 
        email: "", 
        password: "" 
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) return 'Email is required';
                if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email';
                return '';
            case 'password':
                if (!value) return 'Password is required';
                return '';
            default:
                return '';
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value)
        }));
        setServerError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setServerError("");

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            await login(formData.email, formData.password);
            handleClose();
        } catch (err) {
            setServerError("Invalid credentials. Please try again.");
        }

        setIsLoading(false);
    };

    return (
        <Modal 
            show={show} 
            onHide={handleClose}
            centered
            className="fade"
            contentClassName="border-0 shadow-lg"
        >
            <Modal.Header closeButton className="border-0 bg-light py-2">
                <Modal.Title className="fs-5 fw-light d-flex align-items-center">
                    <i className="fas fa-user me-2 small"></i>
                    Sign In
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 py-4">
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className={`border-0 bg-light ${errors.email ? 'is-invalid' : ''}`}
                            required
                        />
                        {errors.email && (
                            <Form.Text className="text-danger small">
                                {errors.email}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="text-muted small">Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className={`border-0 bg-light ${errors.password ? 'is-invalid' : ''}`}
                            required
                        />
                        {errors.password && (
                            <Form.Text className="text-danger small">
                                {errors.password}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Check 
                            type="checkbox" 
                            label="Remember me" 
                            className="text-muted small"
                        />
                        <a href="#" className="text-dark text-decoration-none small">
                            Forgot password?
                        </a>
                    </div>

                    {serverError && (
                        <div className="alert alert-danger py-2 small" role="alert">
                            <i className="fas fa-exclamation-circle me-2"></i>
                            {serverError}
                        </div>
                    )}

                    <Button 
                        type="submit"
                        className="w-100 py-2 text-white"
                        variant="dark"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin me-2"></i>
                                Processing...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt me-2"></i>
                                Sign In
                            </>
                        )}
                    </Button>

                    <div className="text-center mt-3">
                        <small className="text-muted">
                            Don't have an account?{" "}
                            <Button 
                                variant="link" 
                                className="p-0 text-dark text-decoration-none small"
                                onClick={() => {
                                    handleClose();
                                    onSwitchToRegister();
                                }}
                            >
                                Sign Up
                            </Button>
                        </small>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Login;