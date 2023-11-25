import { Avatar, Input, Row, Touch } from "@components";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@hooks";
import { AppointmentInterface, ChatType } from "@types";
import { unix } from "@utils";
import moment from "jalali-moment";
import { Icon, Text, View } from "native-base";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FlatList, Keyboard } from "react-native";
import { socketContext } from "../AppointmentProvider";

const ChatSection = ({ appointment }: { appointment: AppointmentInterface }) => {
  const listRef = useRef<FlatList>(null);
  const { user, isBarber } = useAuth();
  const [localChats, setLocalChats] = useState(appointment?.chat || []);
  const [message, setMessage] = useState("");

  const socket = useContext(socketContext);

  const CLIENT = isBarber ? undefined : user;
  const BARBER = !isBarber ? undefined : user;

  useEffect(() => {
    socket.on("broadcast-message", (chat: ChatType) => {
      setLocalChats((prev) => [...prev, chat]);
    });
  }, [socket]);

  function handleSendMessage() {
    if (message.length > 0) {
      const chat = {
        client: CLIENT?._id,
        barber: BARBER?._id,
        message,
        timeSent: unix(),
      };

      setMessage("");
      setLocalChats((prev) => [...prev, { ...chat, client: CLIENT, barber: BARBER }]);
      Keyboard.dismiss();

      socket.emit("send-message", { chat, room: appointment?._id });
      let userId = isBarber ? appointment?.client?._id! : appointment?.barber?._id!;
    }
  }

  const renderItem = useCallback(({ item }: { item: ChatType }) => {
    const SENDER_ID = item.client ? item.client._id : item.barber?._id;
    return (
      <Row
        my={2}
        alignItems="center"
        justifyContent={SENDER_ID !== user._id ? "flex-start" : "flex-end"}
      >
        <Row space={4}>
          {SENDER_ID !== user._id && <Avatar uri={BARBER?.avatar} size="xs" />}
          <View
            width="56"
            background={SENDER_ID === user._id ? "success" : "gray.500"}
            borderRadius={5}
            py={1}
            px={2}
          >
            <Text textAlign="right" fontSize="md" color="text.light">
              {item.message}
            </Text>
            <Text textAlign="left" color="text.light" mt={4} fontSize="xs">
              {moment.unix(item.timeSent).fromNow()}
            </Text>
          </View>
          {item.client === user._id && <Avatar uri={user.avatar} size="xs" />}
        </Row>
      </Row>
    );
  }, []);
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        ref={listRef}
        inverted
        onContentSizeChange={() =>
          localChats.length > 0 && listRef.current?.scrollToIndex({ index: 0, animated: true })
        }
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        data={[...localChats].reverse()}
        renderItem={renderItem}
      />

      <View
        bottom={0}
        right={0}
        left={0}
        width="100%"
        borderTopWidth={1}
        borderTopColor="border.sharp"
        background="primary"
      >
        <Input
          borderWidth={0}
          // autoCompleteType
          textAlign="right"
          fontSize="lg"
          value={message}
          multiline
          _focus={{ borderWidth: 0 }}
          onChangeText={(text) => setMessage(text)}
          leftElement={
            message.length > 0 ? (
              <Touch onPress={handleSendMessage}>
                <Icon ml={4} size="md" as={AntDesign} name="caretleft" color="text.main" />
              </Touch>
            ) : undefined
          }
          borderRadius={0}
          placeholder="گفتگو کنید"
          placeholderTextColor="text.muted"
        />
      </View>
    </>
  );
};

export default ChatSection;
