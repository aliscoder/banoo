import { Flex } from "native-base";
import React from "react";
import Image from "../Image/Image";
import Modal from "./Modal";

interface Props {
  uri: string;
  isOpen: boolean;
  onClose: () => void;
}
const ImageModal: React.FC<Props> = ({ uri, onClose, isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Flex justifyContent="center" alignItems="center">
        <Image radius={20} size={350} uri={uri} />
      </Flex>
    </Modal>
  );
};

export default ImageModal;
