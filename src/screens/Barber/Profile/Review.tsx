import { Error, Loading } from "@components";
import { useAuth } from "@hooks";
import ReviewList from "@screens/Client/BarberProfile/components/ReviewList";
import { useGetBarberReviewsQuery } from "@state/api/client";
import { View } from "native-base";
import React, { FC } from "react";

interface Props {
  id: string;
}

const Review: FC<Props> = ({ id }) => {
  const { isLoading, isError, data: reviews } = useGetBarberReviewsQuery(id);

  return isLoading ? (
    <Loading />
  ) : isError || !reviews ? (
    <Error />
  ) : (
    <View py={2} h="full">
      <ReviewList reviews={reviews} />
    </View>
  );
};

export default Review;
