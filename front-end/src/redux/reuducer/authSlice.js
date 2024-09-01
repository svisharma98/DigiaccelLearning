import { createSelector, createSlice } from "@reduxjs/toolkit";
import { store } from "../store";  // Ensure this import path is correct

const initialState = {
    data: null,
    loading: false,
};

export const authSlice = createSlice({
    name: "UserSignup",
    initialState,
    reducers: {
        updateDataSuccess: (usersignup, action) => {
            usersignup.data = action.payload;
        },
        userLogout: (usersignup) => {
            usersignup = initialState;
            return usersignup;
        }
    },
});

export const { updateDataSuccess, userLogout } = authSlice.actions;
export default authSlice.reducer;

export const loginSuccess = (loginSuccess) => {
    store.dispatch(updateDataSuccess(loginSuccess));
};

export const logoutSuccess = () => {
    store.dispatch(userLogout());
};

export const userSignupData = createSelector(
    (state) => state.UserSignup,
    (UserSignup) => UserSignup
)