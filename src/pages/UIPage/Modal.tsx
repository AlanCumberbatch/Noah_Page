import {useState} from "react";
import Modal from '@/UIComponents/Modal';
import Button from '@/UIComponents/Button';

const ModalDemo = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Button label='Modal Btn' color='blue' onClick={handleOpenModal} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ModalDemo;