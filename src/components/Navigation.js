import React, { useEffect, useRef, useState } from 'react';

// Navigation component
// Props:
// - currentPage, setCurrentPage: page navigation state
// - isDark, setIsDark: theme state (optional)
// The component computes and animates a highlight bar under the active pill.
const Navigation = ({ currentPage, setCurrentPage }) => {
  const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef(null);
  const pillRefs = useRef([]);

  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'experiments', label: 'Experiments' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' }
  ];

  const updateHighlight = () => {
    const currentIndex = pages.findIndex(page => page.id === currentPage);
    if (currentIndex !== -1 && pillRefs.current[currentIndex] && navRef.current) {
      const currentPill = pillRefs.current[currentIndex];
      const navContainer = navRef.current;
      const pillRect = currentPill.getBoundingClientRect();
      const navRect = navContainer.getBoundingClientRect();
      const left = pillRect.left - navRect.left;
      const width = pillRect.width;
      setHighlightStyle({ left, width });
    }
  };

  useEffect(() => {
    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [currentPage]);

  const handleNavClick = (pageId) => {
    if (pageId === 'contact') {
      const footer = document.getElementById('contact-footer');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentPage(pageId);
    }
  };

  return (
    <div className="nav-container">
      <nav className="floating-nav">
        <div className="nav-pills" ref={navRef}>
          <div
            className="nav-highlight"
            style={{
              transform: `translateX(${highlightStyle.left - 8}px)`, // slight left offset for visual alignment
              width: `${highlightStyle.width}px`,
              position: 'absolute',
              top: 0,
              height: '40px',
              borderRadius: '20px',
              transition: 'transform 0.25s, width 0.25s'
            }}
          ></div>

          {pages.map((page, index) => (
            <button
              key={page.id}
              ref={el => (pillRefs.current[index] = el)}
              onClick={() => handleNavClick(page.id)}
              className={`nav-pill ${currentPage === page.id && page.id !== 'contact' ? 'active' : ''}`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
