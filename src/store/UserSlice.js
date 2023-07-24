import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials)=>{
        //API call
        const urlLogin = "http://localhost:3001/api/v1/user/login";
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // your expected POST request payload goes here
                    email: userCredentials.email,
                    password: userCredentials.password
                })
        };
        //const fetchResponse = await fetch(urlLogin, settings);
        //const data = await fetchResponse.json();
        const request = await axios.post(urlLogin, userCredentials);
        const response = await request.data;
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
)
const userSlice = createSlice({
    name: "user",
    initialState : {
        loading : false,
        user : null,
        error : null
    },
    extraReducers : (builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message==='Request failed with status code 401'){
                state.error = 'Access Denied ! Invalid Credentials'
            }
            else{
                state.error = action.error.message;
            }
        })
    }
})
export default userSlice.reducer