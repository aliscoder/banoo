import { IInputProps, Input } from "native-base";
import React, { memo } from "react";

interface Props extends IInputProps {
  selected?: boolean;
}

const TimeInput: React.FC<Props> = ({ selected, ...rest }) => {
  return (
    <Input
      textAlign="center"
      color="text.main"
      keyboardType="numeric"
      w={24}
      h={8}
      borderColor={selected ? "success" : "text.muted"}
      borderWidth={selected ? 0.6 : 0.3}
      _focus={{
        borderColor: selected ? "success" : "text.muted",
      }}
      maxLength={2}
      {...rest}
    />
  );
};

export default memo(TimeInput);
