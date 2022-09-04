import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import Header from '../../src/components/Layout/Header';
import Footer from '../../src/components/Layout/Footer'
import Head from "next/head"
import { useSelector, useDispatch} from "react-redux"
import { fetchUserData, toggleAuthBox } from '../../src/features/reducers/authReducer'
import NavBarOwner from '../../src/components/ui/NavBarOwner'
import PulseLoader from "react-spinners/PulseLoader";
import fetchUser from '../../src/utils/fetchUser'

export default function Settings() {
    // ---- Fetching user ----
    const router = useRouter()
    const dispatch = useDispatch()
    const authInfo = useSelector((state) => state.auth)
    const [fetched, setFetched] = useState(authInfo.hasFetched)

    // useEffect(() => {
    //     fetchUser({
    //         router, dispatch, authInfo, fetched, setFetched, 
    //         role: "owner"
    //     })
    // }, [fetched, router, dispatch, authInfo])

    // -------

    const [expand, setExpand] = useState(true)

    return (
        <div className="container">
            <Head>
                <title>HomeTwo | My Properties </title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Header type="owner"></Header>
            <LoaderAuth 
                color="#fd7300" 
                authorized={authInfo?.user?.role === "owner"}
                loading={!authInfo?.hasFetched}
            >
                <NavBarOwner expand={expand} setExpand={setExpand} activePage="settings" activeSection="settings"></NavBarOwner>
                <div className={`page-container--owner ${expand ? "" : "hide-sidebar"}`}>
                </div>
            </LoaderAuth>
            <Footer></Footer>
        </div>
    )
}