import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [showTextFields, setShowTextFields] = useState(false);
  const commentBoxRef = useRef(null);

  const addTextArea = () => {
    setShowTextFields(true);
  };

  const addNewTextArea = () => {
    const commentBox = commentBoxRef.current;

    // Utwórz divy dla każdej textarea
    const interimContainer = document.createElement('div');
    interimContainer.className = 'Comment-container';
    commentBox.appendChild(interimContainer);

    const newInterimTextArea = document.createElement('textarea');
    newInterimTextArea.style.width = '300px';
    newInterimTextArea.style.height = '200px';
    newInterimTextArea.style.backgroundColor = '#999';
    newInterimTextArea.disabled = true;
    newInterimTextArea.textContent = 'preview of your text will go here...';
    interimContainer.appendChild(newInterimTextArea);

    // Utwórz divy dla każdej textarea
    const destContainer = document.createElement('div');
    destContainer.className = 'Comment-container';
    commentBox.appendChild(destContainer);

    const newDestTextArea = document.createElement('textarea');
    newDestTextArea.style.width = '300px';
    newDestTextArea.style.height = '200px';
    newDestTextArea.style.backgroundColor = '#fff';
    newDestTextArea.style.margin = '5px';
    newDestTextArea.placeholder = 'your actual text will go here...';
    newDestTextArea.style.overflow = 'auto';
    destContainer.appendChild(newDestTextArea);
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (showTextFields && !e.target.closest('.comment-box')) {
        setShowTextFields(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [showTextFields]);

  const commentBoxStyle = {
    width: '350px',
    backgroundColor: '#333',
    zIndex: '99',
    position: 'absolute',
    top: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
  };

  const showButtonStyle = {
    margin: '10px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '10px'
  };

  return (
    <div>
      <div ref={commentBoxRef} style={commentBoxStyle} className="comment-box">
        <div style={buttonContainerStyle}>
          <button style={showButtonStyle} onClick={addTextArea}>
            Show comments
          </button>
          {showTextFields && (
            <button onClick={addNewTextArea}>Dodaj kolejne pola</button>
          )}
        </div>

        {showTextFields && (
          <>
            {/* Wrappery dla textarea */}
            <div className="Comment-container">
              <textarea
                style={{ width: '300px', height: '200px', backgroundColor: '#999' }}
                disabled
                value="preview of your text will go here..."
              />
            </div>

            <div className="Comment-container">
              <textarea
                style={{
                  width: '300px',
                  height: '200px',
                  backgroundColor: '#fff',
                  margin: '5px',
                  overflow: 'auto',
                }}
                placeholder="your actual text will go here..."
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
