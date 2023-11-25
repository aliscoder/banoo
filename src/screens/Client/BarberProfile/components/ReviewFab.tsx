import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isEqual } from "lodash";
import { Fab, Icon } from "native-base";
import React, { memo } from "react";

type Props = {
  onOpen: () => void | undefined;
};
const ReviewFab: React.FC<Props> = ({ onOpen }) => {
  return (
    <Fab
      background="success"
      renderInPortal={false}
      shadow={5}
      size={16}
      onPress={onOpen}
      bottom={10}
      right={10}
      icon={
        <Icon
          color="text.light"
          as={MaterialCommunityIcons}
          name="comment-text-outline"
          size="md"
        />
      }
    />
  );
};

export default memo(ReviewFab, isEqual);
