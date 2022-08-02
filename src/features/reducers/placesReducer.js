import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        location: 'Manhattan, NYC',
        price: 149,
        paymentPer: 'day',
        image: 'https://a0.muscache.com/im/pictures/miso/Hosting-671622319399090627/original/37e0ed75-118f-402e-95c7-2c62512acdd5.jpeg?im_w=720',
        description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
        facility: [],
        isHosted: false,
        startAvailable: (new Date('August 1, 22')).getTime(),
        endAvailable: (new Date('September 20, 22')).getTime(),
    },
    {
        id: 2,
        location: 'Los Angeles, California',
        price: 132,
        paymentPer: 'day',
        image: 'https://a0.muscache.com/im/pictures/ebe8dc43-4632-4bb9-a250-70009a803f7b.jpg?im_w=1200',
        description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
        facility: [],
        isHosted: false,
        startAvailable: (new Date('October 1, 22')).getTime(),
        endAvailable: (new Date('November 20, 22')).getTime(),
    }
]

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        addPlace(state, action) {
            state.push(action.payload)
        }
    }
})

// export const { } = placesSlice.actions
export default placesSlice.reducer
