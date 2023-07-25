import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials)=>{
        //API call
        const urlLogin = "http://localhost:3001/api/v1/user/login";
        const request = await axios.post(urlLogin, userCredentials);
        const response = await request.data;
        localStorage.setItem('token',response.body.token);
        return response;
    }
)

export const profileUser = createAsyncThunk(
    'user/profileUser',
    async ()=>{
        //API call
        const urlProfil = "http://localhost:3001/api/v1/user/profile";
        const token =  localStorage.getItem('token') ;
        const request = await axios.post(urlProfil,{},
        { headers: {
                'Authorization' : `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            } 
        });
        const response = await request.data;
        let  firstName = response.body.firstName;
        localStorage.setItem('user', firstName);
        //console.log(response)
        return response;
    }
)

const userSlice = createSlice({
    name: "user",
    initialState : {
        loading : false,
        user : null,
        error : null,
    },
    reducers:{
        logoutUser: (state)=>{
            state.loading = false;
            state.user = null;
            state.error = null;
            return state;
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.user = null;
            //state.connected = false;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            //state.connected = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            //state.connected = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message==='Request failed with status code 401'){
                state.error = 'Access Denied ! Invalid Credentials'
            }
            else{
                state.error = action.error.message;
            }
        })
        .addCase(profileUser.pending,(state)=>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(profileUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload.body;
            state.error = null;
        })
        .addCase(profileUser.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            state.error = action.error.message;
        })
    }
})
export default userSlice.reducer