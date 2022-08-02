import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './reducers/filtersReducer';
import placesReducer from './reducers/placesReducer';

const store = configureStore({
    reducer: {
        filters: filterReducer,
        places: placesReducer
    }
})

export default store