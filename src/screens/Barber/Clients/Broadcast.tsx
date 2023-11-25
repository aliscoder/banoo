import { Button, Card, Column, Container, Input, List, TextNormal, TextTiny } from "@components";
import { useAuth, useToast } from "@hooks";
import { useBroadcastMessageMutation, useGetMessagesQuery } from "@state/api/barber";
import { Message } from "@types";
import { DEVICE } from "@utils";
import moment from "jalali-moment";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from 'native-base'

const Broadcast = () => {
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();

  const [broadcast, { isLoading: sendLoading, isError: sendError, isSuccess: sendSuccess }] =
    useBroadcastMessageMutation();
  const { data: messages, isLoading, isError, isSuccess } = useGetMessagesQuery(user._id);

  const broadcastMessage = useCallback(() => {
    if (message.length < 1) {
      showError("پیام نامعتبر است");
    } else if (user.clients.length < 1) {
      showError("شما هیچ مشتری فعالی در لیست ندارید");
    } else {
      broadcast({ barber: user._id, body: message });
    }
  }, [message]);

  useEffect(() => {
    if (sendError) {
      showError("خطا در برقراری ارتباط");
    }
    if (sendSuccess) {
      setMessage("");

      showSuccess("پیام با موفقیت برای مشتریان ارسال شد");
    }
  }, [sendError, sendSuccess]);

  const Message = ({ item, index }: { item: Message; index: number }) => {
    return (
      <Column mt={index === 0 ? 0 : 8}>
        <TextTiny color="success" mb={2}>
          {moment.unix(item.timeSent).fromNow()}
        </TextTiny>
        <TextNormal>{item.body}</TextNormal>
      </Column>
    );
  };

  return (
    <Container headerTitle="ارسال پیام به مشتریان">
       <ScrollView showsVerticalScrollIndicator={false}>
      <Card
        transparent
        title="ارسال پیام به مشتریان"
        subtitle="مشتریان شما بعد از دریافت پیام مطلع خواهند شد"
        pb={3}
      >
        <Column space={3}>
          <Input label="پیام شما" multiline value={message} onChangeText={(t) => setMessage(t)} />
          <Button
            isLoading={sendLoading}
            onPress={broadcastMessage}
            scheme="success"
            title="ارسال پیام"
          />
        </Column>
      </Card>
      {messages && messages.length > 0 && (
        <Card my={3} flex={1} title="پیام های ارسال شده">
          <List
            isLoading={isLoading}
            isError={isError}
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => <Message item={item} index={index} />}
          />
        </Card>
      )}
         </ScrollView>
    </Container>
  );
};

export default Broadcast;
