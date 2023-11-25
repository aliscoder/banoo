import { BarberInterface, ClientInterface, ReviewType, ServiceType } from "@types";
import Api from ".";

const clientApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    GET SPECIFIC BARBER
    */

    getBarber: builder.query<BarberInterface, string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}`,
        method: "GET",
      }),
    }),

    /*
    GET BARBER INFO
    */

    getBarberInfo: builder.query<Partial<BarberInterface>, string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}/info`,
        method: "GET",
      }),
    }),

    /*
    GET BARBER SERVICES
    */

    getBarberServices: builder.query<ServiceType[], string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}/services`,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),

    /*
    GET BARBER REVIEWS
    */

    getBarberReviews: builder.query<ReviewType[], string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}/reviews`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    /*
    REVIEW A BARBER
    */

    reviewBarber: builder.mutation<
      { comment: ReviewType },
      { barberId: string; review: ReviewType }
    >({
      query: ({ barberId, review }) => ({
        url: `/client/barbers/${barberId}/reviews`,
        method: "POST",
        body: { review },
      }),
      invalidatesTags: ["Reviews"],
    }),

    /*
    DELETE COMMENT
    */

    deleteComment: builder.mutation<
      Partial<ClientInterface>,
      { barberId: string; reviewId: string }
    >({
      query: (body) => ({
        url: `/client/delete_comment`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),

    /*
    GET BARBER PHOTO SAMPLES
    */

    getBarberSamples: builder.query<string[], string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}/samples`,
        method: "GET",
      }),
      providesTags: ["Samples"],
    }),

    /*
    GET BARBER MEDALS
    */

    getBarberMedals: builder.query<string[], string>({
      query: (barberId) => ({
        url: `/client/barbers/${barberId}/medals`,
        method: "GET",
      }),
      providesTags: ["Medals"],
    }),

    /*
    UPDATE CLIENT PROFILE
    */

    updateProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: "/client/profile/update",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetBarberInfoQuery,
  useGetBarberReviewsQuery,
  useGetBarberQuery,
  useGetBarberSamplesQuery,
  useGetBarberMedalsQuery,
  useGetBarberServicesQuery,
  useReviewBarberMutation,
  useDeleteCommentMutation,
} = clientApi;

export default clientApi;
