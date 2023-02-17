import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

//define a service using a base URL

const Api = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery ({
        baseUrl: 'http://localhost:5001'
    }),

    endpoints: (builder) => ({
        // creating the user
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
        }),

        //login
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user
            })
        }),

        //logout
        logoutUser: builder.mutation({
            query: (payload) =>({
                url: '/logout',
                method: 'DELETE',
                body: payload,
            })
        })
    }),
});

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = Api
export default Api;