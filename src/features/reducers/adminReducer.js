import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isLoggedIn: false,
    logRequest: false,
    logError: '',
}

export const logIn = createAsyncThunk('admin/login', async ({ username, password }, { getState }) => {
    const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uid: username,
            password
        })
    })

    const result = await response.json()
    if (!result.success) {
        throw new Error(result.message)
    }
    return result.data.user
})

export const logOut = createAsyncThunk('admin/logout', async() => {
    const response = await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    const result = await response.json()
    if (!result.success) {
        throw new Error(result.message)
    }
})

const adminReducer = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetLogError(state, action) {
            state.logError = ''
        },
        setLogError(state, action) {
            state.logError = action.payload
        }
    },
    extraReducers: {
        [logIn.pending]: (state) => {
            state.logRequest = true
            state.logError = ''
        },
        [logIn.fulfilled]: (state, { payload }) => {
            state.logRequest = false
            state.isLoggedIn = true
            state.user = {
                ...payload
            }
        },
        [logIn.rejected]: (state, { error }) => {
            state.logError = error.message
            state.logRequest = false
        },
        [logOut.pending]: (state) => {
            state.logRequest = true
        },
        [logOut.fulfilled]: (state, { payload }) => {
            state.logRequest = false
            state.isLoggedIn = false
            state.user = {}
        },
        [logOut.rejected]: (state, { error }) => {
            state.logRequest = false
        }
    }
})

export const { resetLogError, setLogError } = adminReducer.actions
export default adminReducer.reducer