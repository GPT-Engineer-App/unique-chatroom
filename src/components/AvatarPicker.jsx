import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Image, Box } from "@chakra-ui/react";

const AvatarPicker = ({ isOpen, onClose, setAvatar }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFile({ url: fileUrl, type: selectedFile.type });
      setAvatar(fileUrl);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose an Avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input type="file" accept="image/jpg, image/jpeg, image/gif, image/webp, video/mp4" onChange={handleFileChange} />
          {file && (file.type.startsWith("video") ? <Box as="video" src={file.url} autoPlay loop width="100%" /> : <Image src={file.url} alt="Avatar" width="100%" />)}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AvatarPicker;
