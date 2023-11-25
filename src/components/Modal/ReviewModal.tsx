import React, { memo, useCallback, useEffect, useState } from "react";
import { TextArea, VStack } from "native-base";
import { isEqual } from "lodash";
import Rating from "../Rating/Rating";
import Button from "../Button/Button";
import Modal from "./Modal";
import { useToast } from "@hooks";
import { useReviewBarberMutation } from "@state/api/client";
import moment from "jalali-moment";
import { unix } from "@utils";
import { Column } from "../Column/Column";

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

  const handlePostComment = useCallback(() => {
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
  }, [review]);

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
    <Modal isOpen={isOpen} onClose={onClose} isSheet>
      {/* <KeyboardAvoidingView w="full" behavior="position" enabled> */}

      <Column alignItems="center">
        <Rating scheme="success" rating={rating} onRate={handleRate} large />
        <TextArea
          autoCompleteType
          value={review}
          onChangeText={(text) => setReview(text)}
          totalLines={6}
          borderWidth={1}
          borderColor="primary"
          mt={5}
          textAlign="right"
          color="text.dark"
          fontSize={18}
          placeholderTextColor="text.muted"
          borderRadius={5}
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

      {/* </KeyboardAvoidingView> */}
    </Modal>
  );
};

export default memo(ReviewModal, isEqual);
