import { AppointmentInterface } from "@types";

export type ShopStepType = {
  id?: number;
  title: string;
  subtitle: string;
  screen: string;
};

export const ShopSteps: ShopStepType[] = [
  {
    id: 1,
    title: "مشخصات و مکانیابی",
    subtitle: "آدرس محل آرایشگاه را تکمیل کنید",
    screen: "Location",
  },
  {
    id: 2,
    title: "برنامه کاری",
    subtitle: "برنامه کاری آرایشگاه را تکمیل کنید",
    screen: "Schedule",
  },
  {
    id: 3,
    title: "خدمات",
    subtitle: "خدمات آرایشگاه را ویرایش کنید",
    screen: "Service",
  },
  {
    id: 4,
    title: "درباره آرایشگاه",
    subtitle: "درباره خود و آرایشگاه چیزی بنویسید",
    screen: "About",
  },
  {
    id: 5,
    title: "هدیه به مشتریان",
    subtitle: "میتوانید مشتریان خود را از تخفیف ها آگاه کنید",
    screen: "Reward",
  },
  {
    id: 6,
    title: "افزودن همکار",
    subtitle: "همکار خود را معرفی کنید",
    screen: "CoWorker",
  },
  // {
  //   id: 7,
  //   title: "مراقبت از نوبت",
  //   subtitle: "از نوبت های خود مراقبت کنید",
  //   screen: "Protect",
  // },
];

export function apptClient(appt: AppointmentInterface) {
  if (appt.client) {
    return appt.client!;
  } else {
    return appt.guest!;
  }

  // return appt.client ?? appt.guest
}
