import { fetchAdminData, refreshAccessToken } from "../features/reducers/adminReducer"

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

const fetchAdmin= async({ router, dispatch, adminInfo: authInfo, role }) => {
    const fetchUserAPI = async () => {
        const result = await fetchAPI({
            dispatch, 
            action: fetchAdminData,
            args: {}
        })
        return result
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

    if (sessionRole !== "admin" && router.pathname !== "/admin") {
        console.log("not admin")
        await router.push("/admin")
        return
    }

    if (router.pathname === "/admin" && sessionRole === "admin") {
        console.log("is admin")
        await router.push("/admin/dashboard")
        return
    } 
}

export default fetchAdmin

