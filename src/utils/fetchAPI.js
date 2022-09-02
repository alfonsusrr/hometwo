import { refreshAccessToken } from '../features/reducers/authReducer'

const fetchAPI = async ({ dispatch, action, args }) => {
    return new Promise((resolve, reject) => {
        dispatch(action(args)).unwrap()
            .then((res) => {
                resolve({ err: '', res})
            })
            .catch((e) => {
                dispatch(refreshAccessToken()).unwrap()
                    .then(() => {
                        dispatch(action(args)).unwrap()
                        .then((res) => {
                            resolve({ err: '', res})
                        })
                    })
                    .catch((e) => {
                        reject({ err: "Unauthorized", res: null})
                    })
                })
    })
}

export default fetchAPI