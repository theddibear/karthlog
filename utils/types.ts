export interface IUser {
  id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
  OTP?: string;
  otpExpiresAt?: string;
  email?: string;
  phoneNumber?: string;
  referralId?: string;
  role?: any;
  voucher?: any;
  createdAt?: Date;
  updatedAt?: Date;

  // KARTHLOG-specific fields
  cowrieBalance: number;
  karthlogStatus: boolean;
  isActive: boolean;
  cardsOwned?: ICard[];
}

export interface CardItem {
  id: string;
  cardNumber: number;
  cardHash: string;
  unHashedData?: string;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
  card: {
    id: string;
    name: string;
    description: string;
    cowrieAmount: string;
    type: string;
    imageUrl: string;
    benefits: string[];
    totalCreated: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ICard {
  id: string;
  name: string;
  description: string;
  cowrieAmount: number;
  type: "STANDARD" | "PREMIUM" | "LIMITED";
  imageUrl: string;
  benefits: string[];
  totalCreated: number;
  isActive: boolean;
  minted: IMinted[];
  users: IUser[];
  createdAt: Date;
  updatedAt: Date;
}

export enum CARD_TYPE {
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  LIMITED = "LIMITED",
}

export interface IMinted {
  id: string;
  cardNumber: number;
  cardHash: string;
  unHashedData: string;
  isUsed: boolean;
  card: ICard;
  createdAt: Date;
  updatedAt: Date;
}
