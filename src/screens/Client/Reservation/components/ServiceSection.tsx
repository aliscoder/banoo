import { Card, Column, Row, RowBetween, TextMuted, TextNormal, TextTiny } from "@components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ServiceType } from "@types";
import { price } from "@utils";
import { isEqual } from "lodash";
import { Icon, Pressable } from "native-base";
import React, { Fragment, memo, useCallback } from "react";

type Props = {
  services: ServiceType[];
  onChangeService: (item: ServiceType) => void;
  selected: ServiceType[];
};
const ServiceSection: React.FC<Props> = ({ services, selected, onChangeService }) => {
  const changeService = useCallback((item: ServiceType) => {
    onChangeService(item);
  }, []);

  const renderServices = useCallback(
    ({ item }: { item: ServiceType }) => (
      <Pressable onPress={() => changeService(item)}>
        <Column>
          <RowBetween my={1}>
            <TextNormal color="text.secondary">{price(item.price)} تومان</TextNormal>
            <Row space={2}>
              <Column space={1}>
                <TextNormal color="text.main">{item.name}</TextNormal>
                <TextTiny color="text.muted">{item.time} دقیقه</TextTiny>
              </Column>
              <Icon
                as={MaterialCommunityIcons}
                name={
                  selected.find((service) => service.name === item.name)
                    ? "checkbox-marked"
                    : "checkbox-blank-outline"
                }
                color="text.secondary"
                size="md"
              />
            </Row>
          </RowBetween>

          {item.description && (
            <TextMuted mr={8} fontSize="xs">
              {item.description}
            </TextMuted>
          )}
        </Column>
      </Pressable>
    ),
    [selected]
  );

  const keyExtractHandler = useCallback((item: ServiceType) => {
    return item.name;
  }, []);

  return (
    <Card transparent title="انتخاب نوع خدمات" subtitle="نوع خدمت مورد نظر را انتخاب کنید">
      {services.map((item) => (
        <Fragment key={item._id}>{renderServices({ item })}</Fragment>
      ))}
    </Card>
  );
};

export default memo(ServiceSection, isEqual);
