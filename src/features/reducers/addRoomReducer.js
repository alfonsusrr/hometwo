import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addRoomStep: 1
}

const addRoomReducer = createSlice({
    name: 'addRoom',
    initialState: initialState,
    reducers: {
        nextStep(state, action) {
            state.addRoomStep += 1
        },
    }
})

export const { nextStep } = addRoomReducer.actions
export default addRoomReducer.reducer