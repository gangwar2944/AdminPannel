import React from 'react';
import styled from 'styled-components';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// Modal Container
const ModalContainer = styled.div`
  /* display: none; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* Semi-transparent background */
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of other elements */

  &.show {
    display: flex;
  }
`;

// Modal Content
const ModalContent = styled.div`
  background-color: #fff; /* White background */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Shadow for the modal */
  /* max-width: 80%;  */
  width: 50%;
  text-align: center;
  position: relative;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1001;
  &.entering,
  &.exiting {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &.entered {
    opacity: 1;
    transform: scale(1);
  }
`;

// Close Button
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

// Modal Overlay (the semi-transparent background outside the modal)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5);  */
  z-index: 999; /* Place it below the modal */
`;


function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <ModalContainer className="modal">
      <ModalContent className="modal-content">
        <CloseButton className="close-button" onClick={onClose}>
          <CloseOutlinedIcon/>
        </CloseButton>
        {children}
      </ModalContent>
      {/* <ModalOverlay className="modal-overlay" onClick={onClose}></ModalOverlay> */}
    </ModalContainer>
  );
}

export default Modal;
