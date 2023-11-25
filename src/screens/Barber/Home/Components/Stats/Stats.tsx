import { Card, Column, Loading, Row, TextMuted, TextTitle } from "@components";
import { AntDesign } from "@expo/vector-icons";
import moment from "jalali-moment";
import { Icon, View } from "native-base";
import React from "react";
import useSchedule from "../useSchedule";

const StatContainer = () => {
  const { completed, income, isLoading } = useSchedule();

  return (
    <Card title="آمار">
      {isLoading ? (
        <Loading />
      ) : (
        <Column space={3}>
          <Row space={3}>
            <View p={2} flex={1}>
              <Column space={2}>
                <TextMuted>قرارهای تکمیل شده</TextMuted>
                <Row space={2} justifyContent="space-between">
                  <Icon color="success" name="caretup" as={AntDesign} />
                  <TextTitle>{completed.total?.length}</TextTitle>
                </Row>
                <TextMuted>{`${moment().format("dddd")} هفته قبل`}</TextMuted>
                <TextTitle textAlign="right">{completed.lastWeek?.length}</TextTitle>
              </Column>
            </View>
            <View p={2} flex={1}>
              <Column space={2}>
                <TextMuted>درامد</TextMuted>
                <Row space={2} justifyContent="space-between">
                  <Icon color="success" name="caretup" as={AntDesign} />
                  <TextTitle>{`${income.total} تومان`}</TextTitle>
                </Row>
                <TextMuted>{`${moment().format("dddd")} هفته قبل`}</TextMuted>
                <TextTitle textAlign="right">{`${income.lastWeek} تومان`}</TextTitle>
              </Column>
            </View>
          </Row>
        </Column>
      )}
    </Card>
  );
};

export default StatContainer;
