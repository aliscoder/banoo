import Api from ".";

const sharedApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getBarberFreeTimes: builder.mutation<
      { start: number; end: number; inRest: boolean; isLong: boolean }[],
      { barberId: string; selectedDayUnix: number; serviceTime: number; isManual?: boolean }
    >({
      query: (body) => ({
        url: `/shared/barber_free_times`,
        method: "POST",
        body,
      }),
    }),

    /*
    ADD  PHOTO SAMPLE
    */

    addSample: builder.mutation<any, any>({
      query: (body) => ({
        url: `/shared/samples`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Samples"],
    }),

    /*
    DELETE  PHOTO SAMPLE
    */

    deleteSample: builder.mutation<any, { sampleUrl: string; userId: string }>({
      query: (body) => ({
        url: `/shared/samples`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Samples"],
    }),

    /*
    ADD  PHOTO SAMPLE
    */

    addMedal: builder.mutation<any, any>({
      query: (body) => ({
        url: `/shared/medals`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Medals"],
    }),

    /*
    DELETE  PHOTO SAMPLE
    */

    deleteMedal: builder.mutation<any, { medalUrl: string; userId: string }>({
      query: (body) => ({
        url: `/shared/medals`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Medals"],
    }),

    seenNotif: builder.mutation<any, { notifId: string; userId: string }>({
      query: (body) => ({
        url: `/shared/notif/seen`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetBarberFreeTimesMutation,
  useAddSampleMutation,
  useDeleteSampleMutation,
  useSeenNotifMutation,
  useAddMedalMutation,
  useDeleteMedalMutation,
} = sharedApi;
export default sharedApi;
