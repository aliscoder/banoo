import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CoordType } from "@types";
import { LocationObject } from "expo-location";

type LocationState = {
  lastLocation: CoordType | undefined;
  updatedLocation: CoordType | undefined;
};

const initialState: LocationState = {
  lastLocation: undefined,
  updatedLocation: undefined,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, { payload }: PayloadAction<CoordType>) => {
      state.lastLocation = payload;
    },
    updateLocation: (state, { payload }: PayloadAction<CoordType>) => {
      state.updatedLocation = payload;
    },
    resetUpdatedLocation: (state) => {
      state.updatedLocation = undefined;
    },
  },
});

export default locationSlice.reducer;
export const { setLocation, updateLocation, resetUpdatedLocation } = locationSlice.actions;
