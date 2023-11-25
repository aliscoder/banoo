import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import barberApi from "@state/api/barber";
import clientApi from "@state/api/client";
import sharedApi from "@state/api/shared";
import { AuthUserInterface, BarberInterface, ClientInterface } from "@types";
import { theme } from "@utils";
import { ITheme } from "native-base";

export interface AuthProps {
  user: AuthUserInterface;
  theme: ITheme;
  isBarber: boolean;
}
const initialState: AuthProps = {
  user: null,
  theme: theme,
  isBarber: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (
      state,
      {
        payload,
      }: PayloadAction<
        | (ClientInterface &
            BarberInterface & {
              isBarber: boolean;
            })
        | null
      >
    ) => {
      state.user = payload ? payload : null;
      state.theme = theme;
      state.isBarber = payload ? payload.isBarber : false;
    },
    updateUser: (
      state,
      {
        payload,
      }: PayloadAction<
        ClientInterface &
          BarberInterface & {
            isBarber: boolean;
          }
      >
    ) => {
      state.user = payload;
      state.isBarber = payload ? payload.isBarber : false;
    },

    logoutUser: (state) => {
      state.user = null;
      state.theme = theme;
    },
  },

  extraReducers: (builder) => {
    /*
    UPDATE CLIENT PROFILE MATCHER
    */

    builder.addMatcher(clientApi.endpoints.updateProfile.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });

    /*
    ADD SAMPLE 
    */

    // builder.addMatcher(sharedApi.endpoints.addSample.matchFulfilled, (state, { payload }) => {
    //   state.user?.samples?.unshift(payload);
    // });

    /*
    REMOVE SAMPLE 
    */

    // builder.addMatcher(sharedApi.endpoints.deleteSample.matchFulfilled, (state, { payload }) => {
    //   //@ts-ignore
    //   state.user.samples = state.user?.samples.filter((sample) => sample !== payload);
    // });

    /*
    ADD MEDAL 
    */

    // builder.addMatcher(sharedApi.endpoints.addMedal.matchFulfilled, (state, { payload }) => {
    //   state.user?.medals?.unshift(payload);
    // });

    /*
    REMOVE MEDAL 
    */

    // builder.addMatcher(sharedApi.endpoints.deleteMedal.matchFulfilled, (state, { payload }) => {
    //   //@ts-ignore
    //   state.user.medals = state.user?.medals.filter((medal) => medal !== payload);
    // });

    builder.addMatcher(
      barberApi.endpoints.completeShopDetails.matchFulfilled,
      (state, { payload }) => {
        //@ts-ignore
        state.user = payload;
      }
    );

    builder.addMatcher(
      barberApi.endpoints.completeShopSchedule.matchFulfilled,
      (state, { payload }) => {
        //@ts-ignore
        state.user = payload;
      }
    );

    builder.addMatcher(barberApi.endpoints.addCoworker.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user = payload;
    });

    builder.addMatcher(barberApi.endpoints.editCoworker.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user = payload;
    });

    builder.addMatcher(barberApi.endpoints.deleteCoworker.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user = payload;
    });

    // builder.addMatcher(barberApi.endpoints.addClient.matchFulfilled, (state, { payload }) => {
    //   //@ts-ignore
    //   state.user.clients.push(payload);
    // });

    builder.addMatcher(barberApi.endpoints.updateShopBio.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user = payload;
    });

    builder.addMatcher(barberApi.endpoints.addDiscount.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user = payload;
    });
    builder.addMatcher(barberApi.endpoints.toggleDiscount.matchFulfilled, (state, { payload }) => {
      //@ts-ignore
      state.user = payload;
    });
    // builder.addMatcher(barberApi.endpoints.replyComment.matchFulfilled, (state, { payload }) => {
    //   //@ts-ignore
    //   state.user = payload;
    // });
    // builder.addMatcher(
    //   barberApi.endpoints.deleteReplyComment.matchFulfilled,
    //   (state, { payload }) => {
    //     //@ts-ignore
    //     state.user = payload;
    //   }
    // );
  },
});

export const { loginUser, logoutUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
