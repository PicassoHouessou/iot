import {
  AvatarEdit,
  LoginRequest,
  User,
  UserChangePaswword,
  UserEditWithoutId,
  UserResponse,
  UserWithoutPassword,
} from "../models";
import { adminModuleApi } from "./adminModuleApi";
import { generateUrl } from "@Admin/utils";
import { ApiRoutesWithoutPrefix } from "@Admin/constants";

export const usersApi = adminModuleApi.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query<UserWithoutPassword[], object | void>({
      query: (params) => {
        return {
          url: generateUrl(ApiRoutesWithoutPrefix.USERS, params),
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        };
      },
      providesTags: ["User"],
    }),
    usersJsonLd: builder.query<any[], object | string | void>({
      query: (params) => {
        return {
          url: generateUrl(ApiRoutesWithoutPrefix.USERS, params),
          method: "GET",
          headers: {
            Accept: "application/ld+json",
          },
        };
      },
      providesTags: ["User"],
    }),

    user: builder.query<User, string | number>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    addUser: builder.mutation<User, UserEditWithoutId>({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...rest }) => {
        return {
          url: `/users/${id}`,
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: rest,
        };
      },
      invalidatesTags: ["User"],
    }),
    editUserAvatar: builder.mutation<User, AvatarEdit>({
      query: ({ id, ...rest }) => {
        const formData = new FormData();
        formData.append("avatar", rest.avatar);
        return {
          url: `/users/avatar/${id}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),

    changePasswordUser: builder.mutation<void, UserChangePaswword>({
      query: ({ id, ...rest }) => {
        return {
          url: `/users/password/update/${id}`,
          method: "PUT",
          body: { ...rest },
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    lastUsers: builder.query<User[], void>({
      query: () => "/users/last",
      providesTags: ["User"],
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => {
        return {
          url: "/login",
          method: "POST",
          body: credentials,
        };
      },
    }),
    messages: builder.query<Array<any>, void>({
      query: () => ({
        url: `/messages`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    userTypes: builder.query<any[], object | void>({
      query: (params) => {
        return {
          url: generateUrl("user_types", params),
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useUserQuery,
  useUsersQuery,
  useLazyUsersQuery,
  useUserTypesQuery,
  useUsersJsonLdQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useChangePasswordUserMutation,
  useUpdateUserMutation,
  useEditUserAvatarMutation,
  useLoginMutation,
  useMessagesQuery,
} = usersApi;
