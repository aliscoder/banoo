import { BackIcon } from "@components";
import { HStack, Text, VStack } from "native-base";
import React, { memo } from "react";

type Props = {
  name: string;
  address: string | undefined;
};
const HeaderSection: React.FC<Props> = ({ name, address }) => {
  return (
    <HStack justifyContent="space-between" alignItems="center" p={3}>
      <BackIcon />
      <VStack>
        <Text fontSize="md" color="text.main">
          {name}
        </Text>
        {address && (
          <Text fontSize="sm" color="text.muted">
            {address}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default memo(HeaderSection);
