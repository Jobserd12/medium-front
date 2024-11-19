import React from 'react';


// Componente para el menú flotante de formato
const FloatingMenu = ({ position, onClose }) => {
    if (!position) return null;
  
    const handleFormat = (command, value = null) => {
      if (command === 'createLink') {
        const url = prompt('Introduce la URL del enlace:');
        if (url) {
          document.execCommand(command, false, url);
          // Seleccionar el enlace creado y añadir atributo target
          const selection = window.getSelection();
          const link = selection.focusNode.parentNode;
          if (link.tagName === 'A') {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            link.classList.add('text-blue-600', 'hover:underline', 'cursor-pointer');
          }
        }
      } else if (command === 'heading') {
        const selection = window.getSelection();
        const parentElement = selection.focusNode.parentNode;
        
        if (parentElement.tagName === 'H2') {
          document.execCommand('formatBlock', false, 'p');
        } else {
          document.execCommand('formatBlock', false, 'h2');
        }
      } else if (command === 'blockquote') {
        document.execCommand('formatBlock', false, 'blockquote');
      } else {
        document.execCommand(command, false, value);
      }
    };
  
    return (
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-2 flex items-center gap-2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translateY(-100%)',
        }}
      >
        <button
          onClick={() => handleFormat('bold')}
          className="p-2 hover:bg-gray-100 rounded transition-colors tooltip-wrapper"
          aria-label="Negrita"
        >
          <i className="fas fa-bold text-gray-700"></i>
          <span className="tooltip">Negrita</span>
        </button>
  
        <button
          onClick={() => handleFormat('italic')}
          className="p-2 hover:bg-gray-100 rounded transition-colors tooltip-wrapper"
          aria-label="Cursiva"
        >
          <i className="fas fa-italic text-gray-700"></i>
          <span className="tooltip">Cursiva</span>
        </button>
  
        <div className="w-px h-6 bg-gray-300"></div>
  
        <button
          onClick={() => handleFormat('heading')}
          className="p-2 hover:bg-gray-100 rounded transition-colors tooltip-wrapper"
          aria-label="Alternar título"
        >
          <i className="fas fa-heading text-gray-700"></i>
          <span className="tooltip">Alternar título</span>
        </button>
  
        <button
          onClick={() => handleFormat('createLink')}
          className="p-2 hover:bg-gray-100 rounded transition-colors tooltip-wrapper"
          aria-label="Añadir enlace"
        >
          <i className="fas fa-link text-gray-700"></i>
          <span className="tooltip">Añadir enlace</span>
        </button>
  
        <button
          onClick={() => handleFormat('blockquote')}
          className="p-2 hover:bg-gray-100 rounded transition-colors tooltip-wrapper"
          aria-label="Convertir a cita"
        >
          <i className="fas fa-quote-right text-gray-700"></i>
          <span className="tooltip">Convertir a cita</span>
        </button>
      </div>
    );
  };

export default FloatingMenu;