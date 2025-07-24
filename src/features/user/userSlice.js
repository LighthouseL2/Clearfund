
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
    const response = await fetch("https://clearfund.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData)
    })
    return response.json()
})


export const registerUser = createAsyncThunk("/auth/register", async (formData) => {
    const response = await fetch("https://clearfund.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData)
    })
    return response.json()
})


export const checkAuth = createAsyncThunk("/auth/checkauth",
    async () => {
        const response = await fetch("https://clearfund.onrender.com/api/auth/check-auth", {
            method: "GET",
            // headers: {
            //     "Cache-Control": "no-store, no-cache, must-revalidate proxy-revalidate",
            // },
            credentials: "include"
        })
    return response.json()
})

const initialState = {
    isAuthenticated : false,
    isLoading: true,
    user : null
}


const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false,
        console.log(action.payload);
        state.user = action.payload.success ? action.payload.user : null,
        state.isAuthenticated = action?.payload?.success
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false,
        state.user = null,
        state.isAuthenticated = false

      })


      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false,
        state.user = null,
        state.isAuthenticated = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false,
        state.user = null,
        state.isAuthenticated = false

      })



      .addCase(checkAuth.pending, (state) => {
          state.isLoading = true

      }).addCase(checkAuth.fulfilled, (state, action) => {
          state.isLoading = false,
          console.log(action.payload);
          state.user = action.payload.success ? action.payload.user : null,
          state.isAuthenticated = action?.payload?.success

      }).addCase(checkAuth.rejected, (state) => {
          state.isLoading = false,
          state.user = null,
          state.isAuthenticated = false
      })


  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
