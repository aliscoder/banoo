import {
  Checkbox,
  Column,
  Container,
  List,
  Row,
  RowBetween,
  TextMuted,
  TextTitle,
  Touch,
} from "@components";
import { useAuth, useBarberNavigator, useSteps } from "@hooks";
import React, { useCallback } from "react";
import { ShopStepType } from "../../utils";

const Shop = () => {
  const { navigateInShop } = useBarberNavigator();
  const { user } = useAuth();

  const STEPS = useSteps();

  const StepItem = useCallback(
    ({ item }: { item: ShopStepType }) => {
      const notInConstruction = item.title !== "مراقبت از نوبت";
      return (
        <Touch onPress={() => navigateInShop({ screen: item.screen as any })}>
          <Row space={2} my={3} justifyContent="flex-end">
            <Column>
              <TextTitle>{item.title}</TextTitle>
              <TextMuted>{notInConstruction ? item.subtitle : "در حال توسعه ..."}</TextMuted>
            </Column>

            <Checkbox active={user.steps.includes(item.screen)} changable={false} />
          </Row>
        </Touch>
      );
    },
    [user]
  );

  return (
    <Container headerTitle="تنظیمات آرایشگاه" px={4}>
      <RowBetween my={3} px={2}>
        <Row>
          <TextTitle fontSize="2xl" color="secondary">
            {user.steps.length}
          </TextTitle>
          <TextMuted fontSize="lg"> / {STEPS.length}</TextMuted>
        </Row>
        <TextTitle color="text.main">آرایشگاه خود را طراحی کنید</TextTitle>
      </RowBetween>

      <List data={STEPS} keyExtractor={(step) => step.title} renderItem={StepItem} />
    </Container>
  );
};

export default Shop;
