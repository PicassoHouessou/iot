export interface User {
    id: string;
    email: string;
    password: string;
    roles: string[];
    firstName: string;
    lastName: string;
    dateInsert: string;
    dateInsertAtAgo: string;
    dateUpdate: string;
    dateUpdateAtAgo: string;
    hasProject: boolean;
    avatar: any;
    isCompany?: boolean;
    vatNumber?: string;
    fiscalCode?: string;
    name?: string;
    addresses: Array<{
        id: number;
        address: string;
        country: string;
        city?: string;
        zip?: string;
        province?: string;
        addressType: string;
    }>;
    recipientCode?: string;
    social?: {
        facebook: string;
        linkedin: string;
        instagram: string;
        twitter: string;
    };
}

export type UserEditWithoutId = Pick<
    User,
    | "firstName"
    | "lastName"
    | "roles"
    | "email"
    | "password"
    | "isCompany"
    | "vatNumber"
    | "isCompany"
    | "fiscalCode"
    | "vatNumber"
    | "social"
    | "name"
    | "recipientCode"
>;

export type UserEdit = UserEditWithoutId & { id: number };

export type AvatarEdit = Pick<User, "avatar"> & { id: string };
export type UserChangePaswword = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    id: string;
};
export type UserWithoutPassword = Pick<
    User,
    | "id"
    | "firstName"
    | "lastName"
    | "email"
    | "roles"
    | "avatar"
    | "dateInsert"
    | "hasProject"
    | "dateUpdate"
>;

export interface UserAuth {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    roles: string;
}

export interface UserResponse {
    user: UserAuth;
    token: string;
    refresh_token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
