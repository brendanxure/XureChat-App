import {createSlice} from '@reduxjs/toolkit'
import Api from '../services/Api'

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addNotifications: (state, {payload}) => {
            if(state.newMessage[payload]) {
                state.newMessage[payload] = state.newMessage[payload] + 1
            }else {
                state.newMessage[payload] = 1
            }
        },
        resetNotifications: (state, {payload}) => {
            delete state.newMessage[payload]
        },
    },

    extraReducers: (builder) => {
        // save user after sign up
        builder.addMatcher(Api.endpoints.signupUser.matchFulfilled, (state, {payload})=> payload);
        //save user after login
        builder.addMatcher(Api.endpoints.loginUser.matchFulfilled, (state, {payload}) => payload);
        //logout: destroy user session
        builder.addMatcher(Api.endpoints.logoutUser.matchFulfilled, () => null);     
    }
})

export const getUser = state => state.user

export const {addNotifications, resetNotifications} = userSlice.actions;
export default userSlice.reducer;