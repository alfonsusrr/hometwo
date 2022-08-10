import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import Head from "next/head"
import { useSelector, useDispatch} from "react-redux"
import { fetchUserData, toggleAuthBox } from '../../src/features/reducers/authReducer'
import PulseLoader from 'react-spinners/PulseLoader'
import PropertyForm from "../../src/components/PropertyForm/PropertyForm";
import fetchUser from '../../src/utils/fetchUser'

export default function addProperty() {
    // ---- Fetching user ----
    const router = useRouter()
    const dispatch = useDispatch()
    const authInfo = useSelector((state) => state.auth)
    const [fetched, setFetched] = useState(authInfo.hasFetched)

    useEffect(() => {
        fetchUser({
            router, dispatch, authInfo, fetched, setFetched, 
            role: "owner"
        })
    }, [fetched])

    // ------- Component
    return (
        <div className="container">
            <Head>
                <title>HomeTwo | My Properties </title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <div className={`loader-container ${!fetched || (fetched && authInfo?.user?.role !== 'owner') ? "block" : "hidden"}`}>
                <PulseLoader color={"#fd7300"} loading={!fetched} size={20}></PulseLoader>
            </div>
            <div className={`relative ${fetched && authInfo?.user?.role === 'owner' ? "block" : "hidden"}`}>
                <PropertyForm></PropertyForm>
            </div>
        </div>
    )
}