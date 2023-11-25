export type ChatType = {
  client?: Partial<ClientInterface> | null;
  barber?: Partial<BarberInterface> | null;
  message: string;
  timeSent: number;
};

export type CoordType = number[];

export type DiscountType = {
  _id?: string;
  percent: number;
  reason: string;
  isActive?: boolean;
};

export type SentChatType = {
  client?: string;
  barber?: string;
  message: string;
  timeSent: number;
};

export type WorkTimeType = {
  day: string;
  start: number | string;
  end: number | string;
  rest: {
    start: number | string;
    end: number | string;
  };
};
export type ServiceType = {
  _id?: string;
  name: string;
  time: number;
  description: string;
  price: number;
};
export type ReviewType = {
  _id?: string;
  rater: Partial<ClientInterface>;
  rating: number;
  review: string;
  date: number;
  reply?: string | null;
};

export interface ClientInterface {
  _id: string;
  name: string;
  gender: "male" | "female";
  phone: string;
  avatar: string | null;
  barber: string;
  invited?: boolean;
}

export interface BarberInterface {
  _id: string;
  name: string;
  shopName: string;
  avatar: string | null;
  address?: string;
  bio?: string;
  phone: string;
  gender: string;
  instagram?: string;
  website?: string;
  location: {
    type: string;
    coordinates: CoordType;
  };
  workTime: WorkTimeType[];
  rating: number;
  services: ServiceType[];
  reviews: ReviewType[];
  steps: string[];
  samples?: string[];
  medals?: string[];
  clients: Partial<ClientInterface>[];
  discounts?: DiscountType[];
  isCoworker?: boolean;
  barber?: BarberInterface;
  coWorkers?: Partial<BarberInterface>[];
  version: number;
  download_link: string;
  // baseImage?: string;
  // logoImage?: string;
  // bannerImage?: string;
}
export type AppStatusType = "cancelled" | "approved" | "pending" | "rejected" | "completed";
export type AuthUserInterface = (ClientInterface & BarberInterface) | null;

export interface AppointmentInterface {
  _id: string;
  barber: Partial<BarberInterface>;
  client?: Partial<ClientInterface> | null;
  guest?: Partial<ClientInterface> | null;
  date: number;
  startTime: number;
  endTime: number;
  status: AppStatusType;
  services: ServiceType[];
  chat: ChatType[];
  price: number;
}

export type GenderType = "male" | "female";
export type FilterStringType = "free" | "rating" | "distance" | "clientCount" | string;
export type FilterType = {
  filter: FilterStringType;
  gender: GenderType;
  location: CoordType | undefined;
};
export type SearchType = {
  search: string;
  gender: GenderType;
  location: CoordType | undefined;
};

export type AuthReturnType = {
  user: (ClientInterface & BarberInterface) & { isBarber: boolean };
  token: string;
};

export type DecodedTokenType = {
  userId: string;
  iat: number;
};

export type Message = {
  _id: string;
  barber: Partial<BarberInterface>;
  whoSeen: Partial<ClientInterface>[];
  body: string;
  timeSent: number;
};

export interface NotifInterface {
  _id: string;
  recievers: {
    userId: string;
    seen?: boolean;
  }[];
  isClient: boolean;
  appt: AppointmentInterface;
  message: Message;
  review: ReviewType;
  type: "status" | "message" | "appt" | "review";
  date: number;
}
