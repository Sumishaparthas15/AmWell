import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        isAuthenticated: false,
    },
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    }
})

export const { setUser, logout } = authSlice.actions;
export const login = (credentials) => async (dispatch) => {
    const response = await axios.post('/api/token/', credentials);
    dispatch(setUser(response.data.user));
};
export default authSlice.reducer;