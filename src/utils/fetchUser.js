import { fetchUserData, toggleAuthBox } from "../features/reducers/authReducer"
import fetchAPI from "./fetchAPI"

// Fetched: have fetched user API
// Role: role that need to be authenticated

const fetchUser = async({ router, dispatch, authInfo, fetched, setFetched, role }) => {
    const fetchUserAPI = async () => {
        // await setIsFetching(true)
        // await setIsFetching(false)
        const result = await fetchAPI({
            dispatch, 
            action: fetchUserData,
            args: {}
        })
        return result
    }

    // Redirect after authetiation successful
    const redirectPageByRole = async (fetchedRole) => {
        // if the page doesn't need any authorization
        if (role === null) {
            return
        }
        // if fetching failed (invalid authentication)
        if (fetchedRole === null) {
            await router.push({
                pathname: '/home'
            })
            if (!authInfo.isLoggedIn) {
                dispatch(toggleAuthBox())
            }
        // if the role authenticated is not authorized to access the page
        } else if (role !== fetchedRole) {
            await router.push({
                pathname: '/home'
            })
        }
    }
    if (!fetched) {
        try {
            const result = await fetchUserAPI()
            setFetched(true)
            redirectPageByRole(result.res.role)
        } catch({ err }) {
            redirectPageByRole(null)
        }
    } else {
        // if the role authenticated (has fetched before) is not authorized
        if (role !== authInfo.user.role) {
            await router.push({
                pathname: '/home'
            })
        }
    }
    return
}

export default fetchUser

