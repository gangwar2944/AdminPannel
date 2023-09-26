import React, { useState } from 'react';
import Modal from './Model';
import styled from 'styled-components';

const OpenModal = styled.button`
  position: absolute;
  /* top: 10px;
  right: 10px; */
  background: #7f66ec;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  border-radius: 5px;
  /* color: aqua; */
`;

function UserEditPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <OpenModal onClick={openModal}>Open Modal</OpenModal>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Modal Title</h2>
        <p>This is the modal content.</p>
      </Modal>
    </div>
  );
}

export default UserEditPage;
