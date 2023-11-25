import { useCallback, useState } from "react";

const useModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [isOpen]);

  const openModal = useCallback(() => {
    setOpen(true);
  }, [isOpen]);

  const showFullImage = useCallback(
    (uri: string) => {
      setModalImage(uri);
      openModal();
    },
    [modalImage]
  );

  return { isOpen, openModal, closeModal, showFullImage, modalImage };
};

export default useModal;
