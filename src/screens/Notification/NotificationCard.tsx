import { Avatar, Card, Column, Rating, Row, RowBetween, TextMuted, TextNormal } from "@components";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth, useBarberNavigator } from "@hooks";
import { apptClient } from "@screens/Barber/utils";
import { useSeenNotifMutation } from "@state/api/shared";
import { NotifInterface } from "@types";
import { CONVERTER } from "@utils";
import moment from "jalali-moment";
import { Flex, Icon, Pressable, View } from "native-base";
import React, { useCallback } from "react";

interface Props {
  item: NotifInterface;
  index: number;
}

const ApptNotifCard = ({ item }: { item: NotifInterface }) => {
  return (
    <Column>
      <RowBetween>
        <Column>
          <TextNormal>{moment.unix(item.appt.date).format("dddd D MMM")}</TextNormal>
          <TextMuted>
            {CONVERTER(item.appt.startTime)} - {CONVERTER(item.appt.endTime)}
          </TextMuted>
        </Column>

        <Row space={2}>
          <TextNormal>{apptClient(item.appt).name}</TextNormal>
          <Avatar size="sm" uri={item.appt.client?.avatar} />
        </Row>
      </RowBetween>
      <View mt={2} pr={10}>
        {item.appt.services.map((service) => (
          <TextMuted>{service.name}</TextMuted>
        ))}
      </View>
    </Column>
  );
};

const MessageNotifCard = ({ item }: { item: NotifInterface }) => {
  return (
    <Column>
      <RowBetween>
        <TextMuted>{moment.unix(item.message?.timeSent).fromNow()}</TextMuted>
        <Row space={2}>
          <TextNormal>{item.message.barber?.name}</TextNormal>
          <Avatar size="sm" uri={item.message.barber?.avatar} />
        </Row>
      </RowBetween>
      <TextMuted pr={10}>{item.message.body}</TextMuted>
    </Column>
  );
};

const StatusNotifCard = ({ item }: { item: NotifInterface }) => {
  return (
    <RowBetween>
      <Icon name="check" as={MaterialCommunityIcons} color="success" size="lg" />
      <Row space={2}>
        <Column>
          <TextNormal>{item.appt.client?.name}</TextNormal>
          <View mt={2}>
            {item.appt.services.map((service) => (
              <TextMuted>{service.name}</TextMuted>
            ))}
          </View>
          <TextMuted>
            {CONVERTER(item.appt.startTime)} - {CONVERTER(item.appt.endTime)}
          </TextMuted>
        </Column>
        <Avatar size="sm" uri={item.appt.client?.avatar} />
      </Row>
    </RowBetween>
  );
};

const ReviewNotifCard = ({ item }: { item: NotifInterface }) => {
  return (
    <Column>
      <RowBetween>
        <Rating rating={item.review.rating} scheme="success" />
        <Row space={2}>
          <TextNormal>{item.review.rater?.name}</TextNormal>
          <Avatar size="sm" uri={item.review.rater?.avatar} />
        </Row>
      </RowBetween>
      <TextMuted pr={10}>{item.review.review}</TextMuted>
    </Column>
  );
};

const NotificationCard: React.FC<Props> = ({ item: notif, index }) => {
  const isNewAppt = notif.type === "appt";
  const isNewMessage = notif.type === "message";
  const isNewStatus = notif.type === "status";
  const isNewReview = notif.type === "review";

  const generateTitle = useCallback(() => {
    return isNewAppt
      ? "نوبت جدید"
      : isNewMessage
      ? "پیام جدید"
      : isNewStatus
      ? "تغییر وضعیت نوبت"
      : isNewReview
      ? "نظر جدید"
      : "";
  }, []);

  const generateIcon = useCallback(() => {
    const icon = isNewAppt
      ? "clipboard"
      : isNewMessage
      ? "mail-unread"
      : isNewStatus
      ? "construct"
      : isNewReview
      ? "text"
      : "";
    return <Icon as={Ionicons} name={icon} size="md" color="success" />;
  }, []);

  const { navigateToAppt } = useBarberNavigator();
  const { user } = useAuth();
  const [seeNotif, {}] = useSeenNotifMutation();

  return (
    <Pressable
      onPress={
        isNewAppt || isNewStatus
          ? () => {
              seeNotif({ notifId: notif._id, userId: user._id });
              navigateToAppt(notif.appt._id);
            }
          : undefined
      }
    >
      <Flex>
        <Card
          opacity={notif.recievers.find((reciever) => reciever.userId === user._id)?.seen ? 0.4 : 1}
          title={generateTitle()}
          leftTitleElement={generateIcon()}
          mt={index === 0 ? 0 : 5}
        >
          {isNewAppt && <ApptNotifCard item={notif} />}
          {isNewMessage && <MessageNotifCard item={notif} />}
          {isNewStatus && <StatusNotifCard item={notif} />}
          {isNewReview && <ReviewNotifCard item={notif} />}
        </Card>
      </Flex>
    </Pressable>
  );
};

export default NotificationCard;
