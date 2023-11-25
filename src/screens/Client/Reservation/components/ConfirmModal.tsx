import { Button, Column, Row } from "@components";
import { AntDesign } from "@expo/vector-icons";
import { isEqual } from "lodash";
import { Actionsheet, Icon, KeyboardAvoidingView } from "native-base";
import React, { memo } from "react";

type Props = {
  isOpen: boolean;
  onReject: () => void;
  onConfirm: () => void;
  onClose: () => void;
  children: React.ReactNode;
};
const ConfirmModal: React.FC<Props> = ({ isOpen, onReject, onConfirm, onClose, children }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} useRNModal>
      <KeyboardAvoidingView w="full" behavior="position" enabled>
        <Actionsheet.Content _dragIndicator={{ background: "text.dark" }} backgroundColor="white">
          <Column space={4} px={6} alignItems="center" pt={3}>
            <Icon as={AntDesign} name="warning" size="4xl" color="warning" />

            {children}

            <Row w="1/2" my={3} space={5}>
              <Button title="لغو" onPress={onReject} scheme="danger" />
              <Button title="بله" onPress={onConfirm} scheme="success" />
            </Row>
          </Column>
        </Actionsheet.Content>
      </KeyboardAvoidingView>
    </Actionsheet>
  );
};

export default memo(ConfirmModal, isEqual);
