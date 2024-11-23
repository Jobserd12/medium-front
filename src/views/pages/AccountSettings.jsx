import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../styles/settings.css';

const AccountSettings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = () => {
    // Lógica para guardar cambios
    console.log('Cambios guardados');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h5" className="text-center">Configuración de la Cuenta</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} controlId="formPlaintextUsername">
                  <Form.Label column sm="2">
                    <i className="fas fa-user"></i> Nombre de Usuario
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control 
                      type="text" 
                      placeholder="Nombre de Usuario" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail" className="mt-3">
                  <Form.Label column sm="2">
                    <i className="fas fa-envelope"></i> Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control 
                      type="email" 
                      placeholder="Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword" className="mt-3">
                  <Form.Label column sm="2">
                    <i className="fas fa-lock"></i> Contraseña
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control 
                      type="password" 
                      placeholder="Contraseña" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextConfirmPassword" className="mt-3">
                  <Form.Label column sm="2">
                    <i className="fas fa-lock"></i> Confirmar Contraseña
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control 
                      type="password" 
                      placeholder="Confirmar Contraseña" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                  </Col>
                </Form.Group>

                <Row className="mt-4">
                  <Col className="text-center">
                    <Button variant="primary" onClick={handleSaveChanges}>
                      <i className="fas fa-save"></i> Guardar Cambios
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountSettings;
