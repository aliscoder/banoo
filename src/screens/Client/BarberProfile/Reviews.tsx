import { Error, Loading } from "@components";
import { useAuth, useModal } from "@hooks";
import { useGetBarberReviewsQuery } from "@state/api/client";
import { isEqual } from "lodash";
import { View } from "native-base";
import React, { memo } from "react";
import ReviewFab from "./components/ReviewFab";
import ReviewList from "./components/ReviewList";
import ReviewModal from "./components/ReviewModal";

interface Props {
  id: string;
}
const Reviews: React.FC<Props> = ({ id }) => {
  const { user } = useAuth();
  const { isLoading, isError, data: reviews } = useGetBarberReviewsQuery(id);
  const { isOpen, openModal, closeModal } = useModal();

  return isLoading ? (
    <Loading />
  ) : isError || !reviews ? (
    <Error />
  ) : (
    <View py={2} h="full">
      <ReviewFab onOpen={openModal} />
      <ReviewList reviews={reviews} />
      <ReviewModal
        isOpen={isOpen}
        barberId={id}
        onClose={closeModal}
        rater={{ _id: user._id, name: user.name, avatar: user.avatar }}
      />
    </View>
  );
};

export default memo(Reviews, isEqual);
