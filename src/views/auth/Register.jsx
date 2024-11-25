import React, { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { register } from "../../utils/auth";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const NAME_REGEX = /^[a-zA-Z\s]{2,30}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/;

const Register = ({ show, handleClose, onSwitchToLogin }) => {
    const [formData, setBioData] = useState({
        full_name: "",
        email: "",
        password: "",
        password2: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const validateField = (name, value, allValues = formData) => {
        switch (name) {
            case 'full_name':
                if (!value) return 'Full name is required';
                if (!NAME_REGEX.test(value)) return 'Please enter a valid name (2-30 letters)';
                return '';
            case 'email':
                if (!value) return 'Email is required';
                if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email';
                return '';
            case 'password':
                if (!value) return 'Password is required';
                if (!PASSWORD_REGEX.test(value)) {
                    return 'Password must contain 8+ characters, uppercase, lowercase and numbers';
                }
                return '';
            case 'password2':
                if (!value) return 'Password confirmation is required';
                if (value !== allValues.password) return 'Passwords do not match';
                return '';
            default:
                return '';
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newFormData = {
            ...formData,
            [name]: value
        };
        
        setBioData(newFormData);
        
        // Validate the changed field
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value, newFormData)
        }));
        
        // Special case for password confirmation
        if (name === 'password' && formData.password2) {
            setErrors(prev => ({
                ...prev,
                password2: validateField('password2', formData.password2, newFormData)
            }));
        }
        
        setServerError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setServerError("");

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key], formData);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await register(
                formData.full_name,
                formData.email,
                formData.password,
                formData.password2
            );

            if (error) {
                setServerError(typeof error === 'string' ? error : 'Registration failed. Please try again.');
            } else {
                handleClose();
            }
        } catch (err) {
            setServerError("An error occurred during registration. Please try again.");
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
                    <i className="fas fa-user-plus me-2 small"></i>
                    Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 py-4">
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-muted small">Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className={`border-0 bg-light ${errors.full_name ? 'is-invalid' : ''}`}
                            required
                        />
                        {errors.full_name && (
                            <Form.Text className="text-danger small">
                                {errors.full_name}
                            </Form.Text>
                        )}
                    </Form.Group>

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

                    <Form.Group className="mb-3">
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

                    <Form.Group className="mb-4">
                        <Form.Label className="text-muted small">Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password2"
                            value={formData.password2}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className={`border-0 bg-light ${errors.password2 ? 'is-invalid' : ''}`}
                            required
                        />
                        {errors.password2 && (
                            <Form.Text className="text-danger small">
                                {errors.password2}
                            </Form.Text>
                        )}
                    </Form.Group>

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
                                <i className="fas fa-user-plus me-2"></i>
                                Sign Up
                            </>
                        )}
                    </Button>

                    <div className="text-center mt-3">
                        <small className="text-muted">
                            Already have an account?{" "}
                            <Button 
                                variant="link" 
                                className="p-0 text-dark text-decoration-none small"
                                onClick={() => {
                                    handleClose();
                                    onSwitchToLogin();
                                }}
                            >
                                Sign In
                            </Button>
                        </small>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default Register;