import { NotifInterface } from "@types";
import Api from ".";

const notifApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotifs: builder.query<NotifInterface[], string>({
      query: (userId) => ({
        url: `notif/${userId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 30,
    }),
  }),
});

export const { useGetUserNotifsQuery } = notifApi;
export default notifApi;
