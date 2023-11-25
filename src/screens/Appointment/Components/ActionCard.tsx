import { Card, ColumnCentered, RowBetween, Touch } from "@components";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useAuth } from "@hooks";
import { AppStatusType } from "@types";
import { Icon, Text } from "native-base";
import React from "react";

interface Props {
  onChangeStatus: (status: AppStatusType) => void;
  apptStatus: "approved" | "pending" | "rejected" | undefined;
  isTimePassed: boolean;
}
export const ActionCard: React.FC<Props> = ({ onChangeStatus, apptStatus, isTimePassed }) => {
  const isConfirmed = apptStatus === "approved";
  const isRefused = apptStatus === "rejected";
  const inPending = apptStatus === "pending";

  const { isBarber } = useAuth();

  const barberCanApprove = isBarber && (isRefused || inPending) && !isTimePassed;
  const barberCanReject = isBarber && (isConfirmed || inPending) && !isTimePassed;
  const barberCanComplete = isBarber && (isConfirmed || isRefused) && isTimePassed;
  const clientCanCancel = !isBarber && (inPending || isConfirmed) && !isTimePassed;
  const cardShown = barberCanApprove || barberCanReject || barberCanComplete || clientCanCancel;

  return (
    cardShown && (
      <Card>
        <RowBetween>
          {barberCanApprove && (
            <Touch onPress={() => onChangeStatus("approved")}>
              <ColumnCentered space={2}>
                <Icon as={SimpleLineIcons} name="check" size="lg" color="success" />
                <Text color="success">{inPending ? "موافقت" : "تغییر و موافقت"}</Text>
              </ColumnCentered>
            </Touch>
          )}
          {barberCanReject && (
            <Touch onPress={() => onChangeStatus("rejected")}>
              <ColumnCentered space={2}>
                <Icon as={SimpleLineIcons} name="close" size="lg" color="danger" />
                <Text color="danger">{inPending ? "عدم موافقت" : "تغییر و عدم موافقت"}</Text>
              </ColumnCentered>
            </Touch>
          )}
          {barberCanComplete && (
            <Touch onPress={() => onChangeStatus("completed")}>
              <ColumnCentered space={2}>
                <Icon as={SimpleLineIcons} name="credit-card" size="lg" color="secondary" />
                <Text color="secondary">تکمیل نوبت</Text>
              </ColumnCentered>
            </Touch>
          )}
          {clientCanCancel && (
            <Touch onPress={() => onChangeStatus("cancelled")}>
              <ColumnCentered space={2}>
                <Icon as={SimpleLineIcons} name="close" size="lg" color="danger" />
                <Text color="danger">لغو نوبت</Text>
              </ColumnCentered>
            </Touch>
          )}
        </RowBetween>
      </Card>
    )
  );
};
