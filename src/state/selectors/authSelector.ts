import { RootState } from "@state/store";
import { BarberInterface } from "@types";
import moment from "jalali-moment";
import { createSelector } from "reselect";

export const authSelector = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.auth
);

export const stepSelector = createSelector(
  (state: RootState) => state,
  (state: RootState) => (state.auth.user as BarberInterface).steps
);

export const locationSelector = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.location
);
