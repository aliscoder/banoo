import { Button, ConfirmationModal, Container, Row, TextTitle } from "@components";
import { useAuth, useBarberNavigator, useModal, useToast } from "@hooks";
import { useCompleteShopScheduleMutation } from "@state/api/barber";
import { WorkTimeType } from "@types";
import { isEqual } from "lodash";
import React, { memo, useCallback, useEffect, useState } from "react";
import DailySchedule from "./DailySchedule";
import WorkTimeProvider, { useWorktimeContext } from "./workTimeContext";

type PostDataType = {
  barberId: string;
  workTimes: WorkTimeType[];
};
const SubmittionArea = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: PostDataType) => void;
  isLoading: boolean;
}) => {
  const { state } = useWorktimeContext();
  const { user } = useAuth();

  return (
    <Row
      justifyContent="flex-end"
      width="100%"
      borderTopWidth={1}
      borderTopColor="dash"
      background="primary"
      px={3}
      py={3}
    >
      <Button
        isLoading={isLoading}
        title="ذخیره تغییرات"
        w="1/3"
        p={1.5}
        scheme="success"
        onPress={() => onSubmit({ workTimes: state, barberId: user._id })}
      />
    </Row>
  );
};
const Schedule = () => {
  const [completeSchedule, { isSuccess, isError, isLoading }] = useCompleteShopScheduleMutation();
  const { showError } = useToast();
  const { navigateInShop } = useBarberNavigator();
  const { closeModal, isOpen, openModal } = useModal();
  const [postData, setPostData] = useState<PostDataType>();

  const handlePostSchedule = useCallback((data: PostDataType) => {
    if (data.workTimes.length > 0) {
      let checkCounter = 0;
      data.workTimes.forEach((workTime) => {
        if (workTime.start > workTime.end || workTime.rest.start > workTime.rest.end) {
          showError("زمان شروع باید کمتر از زمان پایان کار باشد");
        } else if (
          workTime.rest.start < workTime.start ||
          workTime.rest.start > workTime.end ||
          workTime.rest.end < workTime.start ||
          workTime.rest.end > workTime.end
        ) {
          showError("ساعات استراحت با ساعات کاری ناهماهنگ است");
        } else if (workTime.rest.start == workTime.rest.end || workTime.start == workTime.end) {
          showError("ساعات کاری شروع و پایان مانند هم هستند");
        } else if (
          workTime.start == "" ||
          workTime.end == "" ||
          workTime.rest.start == "" ||
          workTime.rest.end == ""
        ) {
          showError("زمان شروع و پایان باید تکمیل باشد");
        } else {
          checkCounter += 1;
          if (checkCounter === data.workTimes.length) {
            setPostData(data);
            openModal();
          }
        }
      });
    } else {
      showError("ساعات کار را تکمیل کنید");
    }
  }, []);

  useEffect(() => {
    if (isError) {
      showError("خطا در برقراری ارتباط");
    }
    if (isSuccess) {
      navigateInShop({ screen: "Entry" });
    }
  }, [isSuccess, isError]);

  return (
    <Container headerTitle="برنامه کاری هفتگی">
      <WorkTimeProvider>
        <DailySchedule />
        <SubmittionArea isLoading={isLoading} onSubmit={handlePostSchedule} />
      </WorkTimeProvider>

      <ConfirmationModal
        onClose={closeModal}
        isOpen={isOpen}
        onReject={closeModal}
        onConfirm={() => {
          closeModal();
          completeSchedule(postData!);
        }}
      >
        <TextTitle textAlign="right" color="text.dark" fontFamily="YekanBold">
          توجه داشته باشید که در صورت تغییر زمان کاری نوبت هایی که در بازه جدید قرار نگرفته باشند
          برای همیشه لغو خواهند شد، آیا مطمئن هستید؟{" "}
        </TextTitle>
      </ConfirmationModal>
    </Container>
  );
};

export default memo(Schedule, isEqual);
