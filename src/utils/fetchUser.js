import { fetchUserData, refreshAccessToken, toggleAuthBox } from "../features/reducers/authReducer"

// Fetched: have fetched user API
// Role: role that need to be authenticated
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

const fetchUser = async({ router, dispatch, authInfo, role }) => {
    const fetchUserAPI = async () => {
        const result = await fetchAPI({
            dispatch, 
            action: fetchUserData,
            args: {}
        })
        return result
    }

    // Redirect after authetiation successful
    const redirectPageByRole = async (sessionRole) => {
        if (role === "owner" && sessionRole !== "owner") {
            await router.push({
                pathname: '/home'
            })
        } else if (role === "customer" && sessionRole !== "customer") {
            await router.push({
                pathname: '/home'
            })
        }
    }

    let sessionRole = null
    if (!authInfo.hasFetched) {
        try {
            const result = await fetchUserAPI()
            sessionRole = result?.res?.role
        } catch({ err }) {}
    } else {
        sessionRole = authInfo?.user?.role
    }
    redirectPageByRole(sessionRole)
}

export default fetchUser

