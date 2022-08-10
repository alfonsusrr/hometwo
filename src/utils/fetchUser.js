import { fetchUserData, toggleAuthBox } from "../features/reducers/authReducer"
import fetchAPI from "./fetchAPI"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"

const fetchUser = async({ router, dispatch, authInfo, fetched, setFetched, role }) => {
    const fetchUserAPI = async () => {
        if (!authInfo.isLoggedIn && !authInfo.logRequest) {
            // await setIsFetching(true)
            // await setIsFetching(false)
            await fetchAPI({
                dispatch, 
                action: fetchUserData,
                args: {}
            })
            await setFetched(true)
        }  
    }

    const redirectPageByRole = async () => {
        if (role === null ) {
            return 
        }

        if (fetched && authInfo.user?.role !== role) {
            await router.push({
                pathname: '/'
            })
            if (!authInfo.isLoggedIn) {
                dispatch(toggleAuthBox())
            }
        }
    }

    if (!fetched) {
        await fetchUserAPI().then(async () => {
            await setFetched(true)
            redirectPageByRole() 
        }, async(e) => {
            if (e === 'Unauthorized') {
                await setFetched(true)
                redirectPageByRole() 
            }
        })
    } else {
        redirectPageByRole()
    }
    return true
}

export default fetchUser

