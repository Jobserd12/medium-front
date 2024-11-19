import React, { useState, useRef, useEffect } from 'react';


const TextFormatMenu = ({ position, onClose }) => {
    if (!position) return null;
  
    const handleFormat = (command, value = null) => {
      if (command === 'createLink') {
        const url = prompt('Enter the URL:');
        if (url) {
          document.execCommand(command, false, url);
        }
      } else {
        document.execCommand(command, false, value);
      }
    };
  
    return (
      <div
        className="format-menu"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <button
          onClick={() => handleFormat('bold')}
          className="format-button"
          title="Bold"
        >
          <i className="fas fa-bold"></i>
        </button>
        <button
          onClick={() => handleFormat('italic')}
          className="format-button"
          title="Italic"
        >
          <i className="fas fa-italic"></i>
        </button>
        <button
          onClick={() => handleFormat('formatBlock', 'h2')}
          className="format-button"
          title="Heading"
        >
          <i className="fas fa-heading"></i>
        </button>
        <button
          onClick={() => handleFormat('createLink')}
          className="format-button"
          title="Link"
        >
          <i className="fas fa-link"></i>
        </button>
        <button
          onClick={() => handleFormat('formatBlock', 'blockquote')}
          className="format-button"
          title="Quote"
        >
          <i className="fas fa-quote-right"></i>
        </button>
      </div>
    );
  };
export default TextFormatMenu;