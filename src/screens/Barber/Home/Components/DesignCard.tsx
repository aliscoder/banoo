import { Avatar, Card, Column, Row, RowBetween, TextMuted, TextTitle } from "@components";
import { useAuth, useSteps } from "@hooks";
import { isEqual } from "lodash";
import { Pressable, Progress } from "native-base";
import React, { memo } from "react";

interface Props {
  onPress: () => void;
}
const DesignCard: React.FC<Props> = ({ onPress }) => {
  const { user } = useAuth();
  const STEPS = useSteps();
  return (
    <Pressable onPress={onPress}>
      <Card title="آرایشگاه خود را طراحی کنید" bordered>
        <RowBetween space={3}>
          <Avatar uri={user.avatar} />
          <Column flexGrow={1} space={1}>
            <RowBetween>
              <Row>
                <TextTitle fontSize="lg" color="secondary">
                  {user.steps.length}
                </TextTitle>
                <TextMuted fontSize="md"> / {STEPS.length}</TextMuted>
              </Row>
              <TextMuted>توضیحات</TextMuted>
            </RowBetween>
            <Progress
              value={(user.steps.length / STEPS.length) * 100}
              h={1}
              bg="bgMuted"
              _filledTrack={{ bg: "secondary" }}
            />
          </Column>
        </RowBetween>
      </Card>
    </Pressable>
  );
};

export default memo(DesignCard, isEqual);
