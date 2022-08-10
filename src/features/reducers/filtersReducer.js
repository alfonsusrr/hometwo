import { createSlice } from '@reduxjs/toolkit';

export const filtersInitialState = {
    isFilterBoxOn: false,
    filters: {
        location: '',
        school: '',
        startDate: '',
        endDate: '',
        hosted: false,
        recommended: false,
        type: null,
        minBudget: 10,
        maxBudget: 10000,
        amenities: {
            "Common room": false,
            "Kitchen": true,
            "Laundry room": false,
            "Outdoor area": true,
            "Internet": true,
            "24/7 Security": false,
        },
        features: {
            "Near bus stop (~ 15 mins walk) ": true,
            "Near subway station (~ 15 mins walk)": true,
            "Near school or university (~ 15 mins walk)": false,
        }
    }
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState: filtersInitialState,
    reducers: {
        toggleFilterBox(state, action) {
            state.isFilterBoxOn = !state.isFilterBoxOn
        },
        setFilters(state, action) {
            state.filters = action.payload
        },
        resetFilters(state, action) {
            state.filters = filtersInitialState.filters
        }
    }
})

export const { toggleFilterBox, setFilters, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer
