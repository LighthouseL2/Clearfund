
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// https://clearfund.onrender.com/api/auth/login
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

// https://clearfund.onrender.com/api/auth/delete
export const deleteUser = createAsyncThunk("/auth/delete", async () => {
    const response = await fetch("https://clearfund.onrender.com/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmMxNTY5ZmMwZjA4NzlmY2Q1NWJjNSIsImVtYWlsIjoiaWFtb251d2FjakBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTM4OTk1NzEsImV4cCI6MTc1MzkwMzE3MX0.s596xirVAUOmkEWgA1TkWheBCY9ZQTeWI0y6rOQRAGY`

        },
        credentials: "include",
        // body: JSON.stringify(formData)
    })
    return response.json()
})

// https://clearfund.onrender.com/api/auth/check-auth
export const checkAuth = createAsyncThunk("/auth/checkauth",
    async () => {
        const response = await fetch("https://clearfund.onrender.com/api/auth/check-auth", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
                // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmMxNTY5ZmMwZjA4NzlmY2Q1NWJjNSIsImVtYWlsIjoiaWFtb251d2FjakBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTM4OTk1NzEsImV4cCI6MTc1MzkwMzE3MX0.s596xirVAUOmkEWgA1TkWheBCY9ZQTeWI0y6rOQRAGY`
            },
            credentials: "include"
        })
    return response.json()
})

const initialState = {
    isAuthenticated : false,
    isLoading: true,
    user : null,
    token: null
}


const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token")
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
        state.token = action.payload.token
        localStorage.setItem("token", action.payload.token)
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



      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false,
        state.user = null,
        state.isAuthenticated = false
      })
      .addCase(deleteUser.rejected, (state, action) => {
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
