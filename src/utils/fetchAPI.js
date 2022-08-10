import { refreshAccessToken } from '../features/reducers/authReducer'

const fetchAPI = async ({ dispatch, action, args }) => {
    return new Promise((resolve, reject) => {
        dispatch(action(args)).unwrap()
            .then(() => {
                resolve()
            })
            .catch((e) => {
                dispatch(refreshAccessToken()).unwrap()
                    .then(() => {
                        dispatch(action(args))
                    })
                    .catch((e) => {
                        reject("Unauthorized")
                    })
                })
    })
}

export default fetchAPI