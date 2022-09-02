import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import filterReducer from './reducers/filtersReducer';
import placesReducer from './reducers/placesReducer';
import authReducer from './reducers/authReducer';
import addRoomReducer from './reducers/addRoomReducer';
import adminReducer from './reducers/adminReducer';

const store = configureStore({
    reducer: {
        filters: filterReducer,
        places: placesReducer,
        auth: authReducer,
        addRoom: addRoomReducer,
        admin: adminReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store