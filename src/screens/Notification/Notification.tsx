import { Container, List } from "@components";
import { useAuth } from "@hooks";
import { useGetUserNotifsQuery } from "@state/api/notif";
import { NotifInterface } from "@types";
import React, { useCallback } from "react";
import NotificationCard from "./NotificationCard";

const Notification = () => {
  const { user } = useAuth();
  const { data: notifications, isLoading, isError, refetch } = useGetUserNotifsQuery(user._id);

  const renderNotif = useCallback((props: { item: NotifInterface; index: number }) => {
    return <NotificationCard {...props} />;
  }, []);

  return (
    <Container headerTitle="تابلو اعلانات">
      <List
        onRefetch={refetch}
        data={notifications}
        isLoading={isLoading}
        isError={isError}
        renderItem={renderNotif}
        keyExtractor={(item) => item._id}
      />
    </Container>
  );
};

export default Notification;
