import { useState, useEffect } from "react";
import Header from '../../src/components/Layout/Header';
import Footer from '../../src/components/Layout/Footer'
import { useRouter } from "next/router"
import Head from "next/head"
import { useSelector, useDispatch} from "react-redux"
import { fetchUserData, toggleAuthBox } from '../../src/features/reducers/authReducer'
import PulseLoader from 'react-spinners/PulseLoader'
import PropertyForm from "../../src/components/PropertyForm/PropertyForm";
import fetchUser from '../../src/utils/fetchUser'
import LoaderAuth from "../../src/components/LoaderAuth/LoaderAuth";

export default function AddProperty() {
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

    // ------- Component
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
                <PropertyForm></PropertyForm>
            </LoaderAuth>
            <Footer></Footer>
        </div>
    )
}