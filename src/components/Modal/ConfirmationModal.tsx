import { Center, HStack, Icon, VStack } from "native-base";
import React, { memo } from "react";
import { isEqual } from "lodash";
import { AntDesign } from "@expo/vector-icons";
import Button from "../Button/Button";
import Modal from "./Modal";
import { Column } from "../Column/Column";
import { Row } from "../Row/Row";

type Props = {
  isOpen: boolean;
  onReject: () => void;
  onConfirm: () => void;
  onClose: () => void;
  children: React.ReactNode;
};
const ConfirmationModal: React.FC<Props> = ({ isOpen, onReject, onConfirm, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isSheet>
      <Column space={4} px={6} alignItems="center" pt={3}>
        <Icon as={AntDesign} name="warning" size="4xl" color="warning" />

        {children}

        {/* <Center my={3}> */}
        <Row w="full" space={5} justifyContent="center">
          <Button size="1/2" title="لغو" onPress={onReject} scheme="danger" />
          <Button size="1/2" title="بله" onPress={onConfirm} scheme="success" />
        </Row>
        {/* </Center> */}
      </Column>
    </Modal>
  );
};

export default memo(ConfirmationModal, isEqual);
