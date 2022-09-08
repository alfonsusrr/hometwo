import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import Header from '../../src/components/Layout/Header';
import Footer from '../../src/components/Layout/Footer'
import Head from "next/head"
import { useSelector, useDispatch} from "react-redux"
import NavBarOwner from '../../src/components/ui/NavBarOwner'
import LoaderAuth from "../../src/components/LoaderAuth/LoaderAuth";

export default function Properties() {
    // ---- Fetching user ----
    const router = useRouter()
    const dispatch = useDispatch()
    const authInfo = useSelector((state) => state.auth)

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
                <NavBarOwner expand={expand} setExpand={setExpand} activeSection="properties" activePage="property_list"></NavBarOwner>
                <div className={`page-container--owner ${expand ? "" : "hide-sidebar"}`}>
                </div>
            </LoaderAuth>
            <Footer></Footer>
        </div>
    )
}