import { AuthReturnType, BarberInterface, ClientInterface, GenderType } from "@types";
import Api from ".";

export interface RegisterFormInterface {
  phone: string;
  name: string;
  enteredCode: string;
  barberId?: string;
}

export interface LoginFormInterface {
  phone: string;
  enteredCode: string;
  password: string;
}

const authApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    GET PHOTOS
    */

    getShop: builder.query<Partial<BarberInterface>, string>({
      query: (shopId) => ({
        url: `/auth/get_shop/${shopId}`,
        method: "GET",
      }),
    }),

    /*
    REFRESH AUTH TOKEN
    */

    refreshToken: builder.mutation<AuthReturnType, string>({
      query: (id) => ({
        url: "/auth/refresh_token",
        method: "POST",
        body: { id },
      }),
    }),

    /*
    SEND VERIFICATION CODE
    */

    checkPhoneExistance: builder.mutation<
      { status: "registered" | "new"; type?: "barber" | "client" },
      { phone: string; appId: string }
    >({
      query: (body) => ({
        url: "/auth/send_code",
        method: "POST",
        body,
      }),
    }),

    /*
    LOGIN USER
    */

    login: builder.mutation<AuthReturnType, Partial<LoginFormInterface>>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    /*
    REGISTER USER
    */

    register: builder.mutation<AuthReturnType, Partial<RegisterFormInterface>>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    /*
    CHANGE PASSWORD
    */

    changePass: builder.mutation<
      { barberId: string; newPassword: string; currentPassword: string },
      any
    >({
      query: (body) => ({
        url: "/auth/changePass",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useRefreshTokenMutation,
  useLoginMutation,
  useRegisterMutation,
  useCheckPhoneExistanceMutation,
  useChangePassMutation,
  useGetShopQuery,
} = authApi;

export default authApi;
