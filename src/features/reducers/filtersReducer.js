import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFilterBoxOn: false,
    location: '',
    startDate: null,
    endDate: null,
    hosted: null,
    minBudget: 0,
    maxBudget: null,
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleFilterBox(state, action) {
            state.isFilterBoxOn = !state.isFilterBoxOn
        },
        setLocationFilter(state, action) {
            state.location = action.payload
        }
    }
})

export const { toggleFilterBox, setLocationFilter } = filtersSlice.actions
export default filtersSlice.reducer
