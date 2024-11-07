import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';

const ErrorPage = () => {
    return (
        <Container className="text-center mt-5">
                <Alert.Heading>¡Algo salió mal!</Alert.Heading>
                <p>Ocurrió un error al procesar tu solicitud. Por favor intenta de nuevo más tarde.</p>
        </Container>
    );
};

export default ErrorPage;
