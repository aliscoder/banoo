import {
  Avatar,
  Button,
  Column,
  Input,
  List,
  Modal,
  Rating,
  Row,
  RowBetween,
  Touch,
} from "@components";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useAuth, useModal } from "@hooks";
import { useDeleteReplyCommentMutation, useReplyCommentMutation } from "@state/api/barber";
import { useDeleteCommentMutation } from "@state/api/client";
import { ReviewType } from "@types";
import moment from "jalali-moment";
import _, { isEqual } from "lodash";
import { Icon, Spinner, Text } from "native-base";
import React, { memo, useState } from "react";

type Props = {
  reviews: ReviewType[];
};
const ReviewList: React.FC<Props> = ({ reviews }) => {
  const { closeModal, openModal, isOpen } = useModal();
  const [comment, setComment] = useState<ReviewType>();
  const [reply, setReply] = useState<string>("");
  const { user, isBarber } = useAuth();
  const [postReply, { isLoading }] = useReplyCommentMutation();
  const [deleteReply, { isLoading: deleteReplyLoading }] = useDeleteReplyCommentMutation();
  const [commentLoadingId, setCommentLoadingId] = useState<string>();
  const [replyLoadingId, setReplyLoadingId] = useState<string>();
  const [deleteComment, { isLoading: deleteCommentLoading }] = useDeleteCommentMutation();

  return (
    <>
      <List
        data={reviews}
        contentContainerStyle={{ paddingVertical: 15 }}
        renderItem={({ item, index }) => {
          return (
            <Column mt={index !== 0 ? 5 : 0}>
              <RowBetween>
                <Row space={4}>
                  <Rating rating={item.rating} />
                  {!item.reply && isBarber && (
                    <Touch
                      onPress={() => {
                        setComment(item);
                        openModal();
                      }}
                    >
                      <Icon as={SimpleLineIcons} name="pencil" />
                    </Touch>
                  )}
                  {!isBarber && _.isEqual(item.rater._id?.toString(), user._id?.toString()) ? (
                    deleteCommentLoading && commentLoadingId === item._id ? (
                      <Spinner color="text.main" />
                    ) : (
                      <Touch
                        onPress={() => {
                          setCommentLoadingId(item._id!);
                          deleteComment({
                            barberId: user.barber,
                            reviewId: item._id!,
                          });
                        }}
                      >
                        <Icon as={Ionicons} name="trash-bin-sharp" color="danger" />
                      </Touch>
                    )
                  ) : (
                    <></>
                  )}
                </Row>
                <Row space={3}>
                  <Column>
                    <Text fontSize="md" color="text.muted">
                      {item.rater.name}
                    </Text>
                    <Text fontSize="sm" color="text.muted">
                      {moment.unix(item.date).format("D MMM")}
                    </Text>
                  </Column>
                  <Avatar size="md" uri={item.rater.avatar} />
                </Row>
              </RowBetween>
              <Text
                color="text.main"
                lineHeight={27}
                textAlign="justify"
                fontSize="md"
                mt={3}
                // mr={42}
                px={3}
              >
                {item.review}
              </Text>
              {item.reply && isBarber && (
                <Column paddingX={10} mt={4}>
                  <RowBetween>
                    {deleteReplyLoading && replyLoadingId === item._id! ? (
                      <Spinner color="text.main" />
                    ) : (
                      <Touch
                        onPress={() => {
                          setReplyLoadingId(item._id!);
                          deleteReply({ barberId: user._id, reviewId: item._id! });
                        }}
                      >
                        <Icon as={Ionicons} name="trash-bin-sharp" color="danger" />
                      </Touch>
                    )}
                    <Avatar size="sm" uri={user.avatar} alignSelf="flex-end" />
                  </RowBetween>
                  <Text textAlign="right" color="text.main" fontSize="sm" mt={3} mr={42}>
                    {item.reply}
                  </Text>
                </Column>
              )}
            </Column>
          );
        }}
      />

      <Modal isSheet isOpen={isOpen} onClose={closeModal}>
        <Column alignItems="center">
          <Input
            multiline
            isFullWidth
            value={reply}
            onChangeText={(text) => setReply(text)}
            // mt={5}
            placeholder="پاسخ شما"
          />
          <Button
            isLoading={isLoading}
            onPress={() => {
              closeModal();
              setReply("");
              postReply({ reply, reviewId: comment?._id!, barberId: user._id });
            }}
            mt={2}
            title="ارسال پاسخ"
            scheme="success"
          />
        </Column>
      </Modal>
    </>
  );
};

export default memo(ReviewList, isEqual);
