import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import './editor.css';
import TextFormatMenu from '../../components/editor/textFormatMenu';
import UserProfile from '../../components/ui/userProfile';
import { Link } from 'react-router-dom';

const Editor = () => {
  const [title, setTitle] = useState('');
  const [menuPosition, setMenuPosition] = useState(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleContentChange = (e) => {
    setShowPlaceholder(contentRef.current.textContent.length === 0);
    // Simular autoguardado
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const { left, top } = range.getBoundingClientRect();
      setMenuPosition({
        x: left,
        y: top - 60
      });
    } else {
      setMenuPosition(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'editor-image';
        contentRef.current.focus();
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = document.createElement('div');
          container.className = 'image-container';
          container.appendChild(img);
          range.insertNode(container);
          range.collapse(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleYoutubeInsert = () => {
    const videoUrl = prompt('Enter YouTube video URL:');
    if (videoUrl) {
      const videoId = extractYoutubeId(videoUrl);
      if (videoId) {
        const embedHtml = `
          <div class="video-container">
            <iframe 
              src="https://www.youtube.com/embed/${videoId}" 
              allowfullscreen>
            </iframe>
          </div>
        `;
        document.execCommand('insertHTML', false, embedHtml);
      } else {
        alert('Invalid YouTube URL');
      }
    }
  };

  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelection);
    return () => {
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, []);

  const titleRef = useRef(null);

  // Función para ajustar automáticamente la altura del título
  const adjustTitleHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  // Manejador para el cambio en el título
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    adjustTitleHeight(e.target);
  };

  // Ajustar altura inicial del título cuando se monta el componente
  useEffect(() => {
    if (titleRef.current) {
      adjustTitleHeight(titleRef.current);
    }
  }, [title]);

  return (
    <div className="editor-wrapper">
      {/* Header Navigation */}
      <Navbar fixed="top" bg="white" className="editor-navbar">
        <Container fluid>
          <Link to="/stories" className="d-flex align-items-center">
            <i className="fas fa-chevron-left me-3 back-arrow"></i>
            <span className="draft-status">
              {isSaving ? 'Saving...' : 'Draft saved'}
            </span>
          </Link>
          <Nav className="ms-auto">
            <Button variant="outline-success" className="publish-button me-5">
              Publish
            </Button> 
            <UserProfile />
            &nbsp;&nbsp;&nbsp;
          </Nav>
        </Container>
      </Navbar>

      {/* Side Tools */}
      <div className="side-tools">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="d-none"
        />
        <Button 
          variant="light" 
          className="tool-button"
          onClick={() => fileInputRef.current.click()}
        >
          <i className="fas fa-image"></i>
        </Button>
        <Button 
          variant="light" 
          className="tool-button"
          onClick={handleYoutubeInsert}
        >
          <i className="fab fa-youtube"></i>
        </Button>
      </div>

      {/* Main Editor Area */}
      <Container className="editor-container">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <div className="title-wrapper">
              <textarea
                ref={titleRef}
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
                className="title-input"
                rows={1}
              />
            </div>
            <div className="editor-content-wrapper">
              <div
                ref={contentRef}
                contentEditable
                onInput={handleContentChange}
                className="editor-content"
                placeholder="Tell your story..."
              />
              {showPlaceholder && (
                <div className="content-placeholder">
                  Tell your story...
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <TextFormatMenu position={menuPosition} onClose={() => setMenuPosition(null)} />
    </div>
  );
};


export default Editor;