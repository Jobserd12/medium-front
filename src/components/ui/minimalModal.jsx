import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const MinimalModal = ({ show, onHide, title, body, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="py-4 px-5">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
        </div>
        <p className="my-3">{body}</p>
        <div className="d-flex justify-content-end">
          <Button variant="link" className="text-muted me-3" onClick={onHide}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MinimalModal;