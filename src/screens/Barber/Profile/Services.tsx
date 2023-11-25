import { Column, Error, List, Loading, RowBetween, TextNormal, TextTiny } from "@components";
import { useAuth } from "@hooks";
import { useGetBarberServicesQuery } from "@state/api/client";
import { View } from "native-base";
import React, { FC } from "react";

interface Props {
  id: string;
}

const Services: FC<Props> = ({ id }) => {
  const { isLoading, isError, data: services, refetch } = useGetBarberServicesQuery(id);
  const { user } = useAuth();
  return isLoading ? (
    <Loading />
  ) : isError || !services ? (
    <Error />
  ) : (
    <View p={2} h="full">
      <List
        showsVerticalScrollIndicator={false}
        data={services}
        renderItem={({ item, index }) => (
          <Column mt={index !== 0 ? 9 : 0}>
            <RowBetween>
              <TextNormal color="text.secondary">{item.price.toLocaleString()} تومان</TextNormal>
              <Column alignItems="flex-end">
                <TextNormal color="text.main">{item.name}</TextNormal>
                <TextTiny color="text.muted">{item.time} دقیقه</TextTiny>
              </Column>
            </RowBetween>
            <TextTiny mt={2} color="text.muted">
              {item.description}
            </TextTiny>
          </Column>
        )}
      />
    </View>
  );
};

export default Services;
