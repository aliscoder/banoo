import { Button, Column, Input, Modal, Rating } from "@components";
import { useToast } from "@hooks";
import { useReviewBarberMutation } from "@state/api/client";
import { unix } from "@utils";
import { isEqual } from "lodash";
import { Flex } from "native-base";
import React, { memo, useCallback, useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  barberId: string;
  rater: {
    _id: string;
    name: string;
    avatar: string | null;
  };
  onClose: () => void;
};
const ReviewModal: React.FC<Props> = ({ isOpen, rater, barberId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { showError } = useToast();
  const [postComment, { isLoading, isError, isSuccess, data }] = useReviewBarberMutation();

  const handlePostComment = () => {
    review.length > 0 &&
      postComment({
        barberId,
        review: {
          rater,
          rating,
          review,
          date: unix(),
        },
      });
  };

  useEffect(() => {
    if (isError) {
      showError("خطا در برقراری ارتباط");
    }
    if (isSuccess) {
      setReview("");
      setRating(0);
      onClose();
    }
  }, [isSuccess, isError]);

  const handleRate = useCallback(
    (item: number) => {
      setRating(item);
    },
    [rating]
  );

  return (
    <Modal isSheet isOpen={isOpen} onClose={onClose}>
      <Flex p={3} w="full" background="primary" borderTopRightRadius={15} borderTopLeftRadius={15}>
        <Column alignItems="center">
          <Rating scheme="success" rating={rating} onRate={handleRate} large />
          <Input
            multiline
            isFullWidth
            value={review}
            onChangeText={(text) => setReview(text)}
            mt={5}
            placeholder="کامنت خود را بنویسید"
          />
          <Button
            isLoading={isLoading}
            onPress={handlePostComment}
            mt={2}
            title="ارسال نظر"
            scheme="success"
          />
        </Column>
      </Flex>
    </Modal>
  );
};

export default memo(ReviewModal, isEqual);
