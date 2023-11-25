import { WorkTimeType } from "@types";

export type WorkTimeAction =
  | { type: "activate"; payload: string }
  | { type: "start"; payload: { day: string; text: string } }
  | { type: "end"; payload: { day: string; text: string } }
  | { type: "restStart"; payload: { day: string; text: string } }
  | { type: "restEnd"; payload: { day: string; text: string } };

export const reducer = (state: WorkTimeType[], action: WorkTimeAction) => {
  switch (action.type) {
    case "activate":
      if (!state.some((time) => time.day === action.payload)) {
        const selectedDay: WorkTimeType = {
          day: action.payload,
          start: 7,
          end: 23,
          rest: { start: 12, end: 15 },
        };

        return [...state, selectedDay];
      }
      return state.filter((item) => item.day !== action.payload);

    case "start":
      return state.map((time) =>
        time.day === action.payload.day ? { ...time, start: action.payload.text } : time
      );
    case "end":
      return state.map((time) =>
        time.day === action.payload.day ? { ...time, end: action.payload.text } : time
      );

    case "restStart":
      return state.map((time) =>
        time.day === action.payload.day
          ? { ...time, rest: { ...time.rest, start: action.payload.text } }
          : time
      );
    case "restEnd":
      return state.map((time) =>
        time.day === action.payload.day
          ? { ...time, rest: { ...time.rest, end: action.payload.text } }
          : time
      );

    default:
      return state;
  }
};
