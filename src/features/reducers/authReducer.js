import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIdToken, getAuth, getAdditionalUserInfo, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


const initialState = {
    allowedMethod: ["google", "phone"],
    isAuthBoxOpen: false,
    logRequest: false,
    logRole: '',
    isLoggedIn: false,
    logError: "",
    hasFetched: false,
    user: {},
}

export const fetchUserData = createAsyncThunk('user/me', async() => {
    const response = await fetch('/api/user/me', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    if (!result.success) {
        throw new Error(result.message)
    }
    return result.data.user
})

export const refreshAccessToken = createAsyncThunk('user/refreshToken', async() => {
    const response = await fetch('/api/user/refreshToken', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    if (!result.success) {
        throw new Error(result.message)
    }
})

export const logIn = createAsyncThunk('user/login', async ({ user: email, password, method }, { getState, requestId}) => {
    if (!['customer', 'owner'].includes(getState().auth.logRole)) {
        throw new Error('Role must be selected')
    }

    const auth = getAuth()
    let credential
    if (method === 'email') {
        credential = await signInWithEmailAndPassword(auth, email, password)
    } else if (method === 'google') {
        const provider = new GoogleAuthProvider()
        credential = await signInWithPopup(auth, provider)
    } else if (method === 'facebook') {
        const provider = new FacebookAuthProvider()
        credential = await signInWithPopup(auth, provider)
    } else if (method === 'apple') {

    }

    const idToken = await getIdToken(auth.currentUser)
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idToken,
            role: getState().auth.logRole
        })
    })

    const result = await response.json()
    if (!result.success) {
        throw new Error(result.message)
    }
    auth.signOut()
    return result.data.user
})

export const signUp = createAsyncThunk('users/signup', async ({ name, email, phoneNumber, password, method }, { getState, requestId }) => {
    if (!['customer', 'owner'].includes(getState().auth.logRole)) {
        throw new Error('Role must be selected')
    }

    const auth = getAuth()
    if (method === 'email') {
        auth.signOut()
        const credential = await createUserWithEmailAndPassword(auth, email, password)
    }

    const idToken = await getIdToken(auth.currentUser)
    const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idToken,
            name, 
            email, 
            phoneNumber,
            role: getState().auth.logRole
        })
    })

    const result = await response.json()
    if (!result.success) {
        throw new Error(result.message)
    }
    auth.signOut()
    return result.data
})

export const signUpOthers = createAsyncThunk('users/signupOthers', async ({ method }, { getState, requestId }) => {
    if (!['customer', 'owner'].includes(getState().auth.logRole)) {
        throw new Error('Role must be selected')
    }

    const auth = getAuth()
    let email, credential, result, idToken
    if (method === 'google') {
        const provider = new GoogleAuthProvider()
        credential = await signInWithPopup(auth, provider)
        try {
            idToken = GoogleAuthProvider.credentialFromResult(credential).idToken
            result = {
                email: auth.currentUser.email,
                name: auth.currentUser.displayName
            }
        } catch (e) {
            return 
        }
    } else if (method === 'facebook') {
        const provider = new FacebookAuthProvider()
        credential = await signInWithPopup(auth, provider)
    } else if (method === 'apple') {

    }
    
    let role
    await auth.currentUser.getIdTokenResult().then((idTokenResult) => {
        role = {
            isCustomer: idTokenResult.claims?.isCustomer,
            isOwner: idTokenResult.claims?.isOwner
        }
    }).catch((e) => {
        throw new Error("Internal server error")
    })
    
    const isNew  = getAdditionalUserInfo(credential).isNewUser
    if (!isNew && ((role?.isCustomer && getState().auth.logRole === 'customer') || (role?.isOwner && getState().auth.logRole === 'owner'))) {
        throw new Error("Account already exists")
    }

    return result
})

export const logOut = createAsyncThunk('users/logout', async() => {
    const response = await fetch('/api/user/logout', {
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

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAuthBox(state, action) {
            state.isAuthBoxOpen = !state.isAuthBoxOpen
        },
        resetLogError(state, action) {
            state.logError = ''
        },
        setLogRole(state, action) {
            state.logRole = action.payload
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
                uid: payload.uid,
                name: payload.name,
                email: payload.email,
                phoneNumber: payload.phoneNumber,
                role: payload.role
            }
            state.isAuthBoxOpen = false
            state.logRole = ''
        },
        [logIn.rejected]: (state, { error }) => {
            if (error.message === 'Role must be selected') {
                state.isAuthBoxOpen = false
            }

            if (error.code === "auth/wrong-password") {
                state.logError = "User credential and password don't match"
            } else if (error.code === "auth/too-many-requests") {
                state.logError = "Too many attempts, please try again later"
            } else if (error.code === "auth/user-not-found") {
                state.logError = "User not found, please register first"
            } else if (error.code) {
                state.logError = "Login failed, please try again"
            } else {
                state.logError = error.message
            }
            state.logRequest = false
        },

        [signUpOthers.pending]: (state) => {
            state.logRequest = true
        },
        [signUpOthers.fulfilled]: (state, { payload }) => {
            state.logRequest = false
            state.user = payload
        },
        [signUpOthers.rejected]: (state, { error }) => {
            if (error.message === 'Role must be selected') {
                state.isAuthBoxOpen = false
            }

            state.logRequest = false
            if (error.message === "Account already exists") {
                state.logError = "Account already exists, please login"
            } else {
                state.logError = "Register failed, please try again"
            }
        },
        [signUp.pending]: (state) => {
            state.logRequest = true
        },
        [signUp.fulfilled]: (state, { payload }) => {
            state.logRequest = false
            state.user = {}
        },
        [signUp.rejected]: (state, { error }) => {
            if (error.message === 'Role must be selected') {
                state.isAuthBoxOpen = false
            }

            state.logRequest = false
            state.user = {}
            if (error.code === 'auth/phone-number-already-exists') {
                state.logError = 'Phone number already exists, change it or try to login'
            } else if (error.code  === 'email-already-in-use') {
                state.logError = 'Email already in use, try to login'
            }
        },
        [fetchUserData.pending]: (state) => {
            state.logRequest = true
        },
        [fetchUserData.fulfilled]: (state, { payload }) => {
            state.logRequest = false
            state.isLoggedIn = true
            state.user = payload
            state.hasFetched = true
        },
        [fetchUserData.rejected]: (state, { error }) => {
            state.logRequest = false
            state.isLoggedIn = false
            state.hasFetched = true
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

export const { toggleAuthBox, resetLogError, setLogRole } = authReducer.actions
export default authReducer.reducer