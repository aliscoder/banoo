import { WorkTimeType } from "@types";
import { unix } from "@utils";
import moment from "jalali-moment";
import { useMemo } from "react";

export default function useReservationDays(
  length: number,
  workTime?: WorkTimeType[] | undefined,
  hasLastDays?: boolean
) {
  const reservationDays = useMemo(() => {
    const daysArray = [];
    for (let i = 0; i < length; i++) {
      const futureDate = unix(moment().add(i, "days"));

      daysArray.push(futureDate);
    }

    if (hasLastDays) {
      for (let i = 1; i < 4; i++) {
        const lastDate = unix(moment().subtract(i, "days"));
        daysArray.unshift(lastDate);
      }
    }

    if (workTime) {
      return daysArray.filter((day) =>
        workTime.map((time) => time.day).includes(moment.unix(day).format("dddd"))
      );
    }
    return daysArray;
  }, [workTime]);

  return reservationDays;
}
