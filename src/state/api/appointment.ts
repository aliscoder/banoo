import { AppointmentInterface } from "@types";
import Api from ".";

const apptApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    GET ALL APPTS
    */

    getAppointments: builder.query<AppointmentInterface[], string>({
      query: (userId) => ({
        url: `/appointments/${userId}`,
        method: "GET",
      }),
      providesTags: ["Appointments"],
      keepUnusedDataFor: 30,
    }),

    /*
    GET PENDING APPTS
    */

    getPendingAppointments: builder.query<AppointmentInterface[], string>({
      query: (userId) => ({
        url: `/appointments/${userId}/pending`,
        method: "GET",
      }),
      providesTags: ["Pending"],
      keepUnusedDataFor: 0,
    }),

    /*
    GET SPECIFIC APPT
    */

    getAppointment: builder.query<AppointmentInterface, string>({
      query: (apptId) => ({
        url: `/appointments/appointment/${apptId}`,
        method: "GET",
        providesTags: ["Appointment"],
      }),
      keepUnusedDataFor: 0,
    }),

    /*
    REQUEST NEW APPT
    */

    requestAppointment: builder.mutation<AppointmentInterface, any>({
      query: (body) => ({
        url: `/appointments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Appointments", "Schedule"],
    }),
  }),
});

export const {
  useGetAppointmentQuery,
  useGetPendingAppointmentsQuery,
  useGetAppointmentsQuery,
  useRequestAppointmentMutation,
} = apptApi;

export default apptApi;
