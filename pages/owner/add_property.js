import { useState, useEffect } from "react";
import Header from '../../src/components/Layout/Header';
import Footer from '../../src/components/Layout/Footer'
import { useRouter } from "next/router"
import Head from "next/head"
import { useSelector, useDispatch} from "react-redux"
import PropertyForm from "../../src/components/PropertyForm/PropertyForm";
import LoaderAuth from "../../src/components/LoaderAuth/LoaderAuth";

export default function AddProperty() {
    // ---- Fetching user ----
    const router = useRouter()
    const dispatch = useDispatch()
    const authInfo = useSelector((state) => state.auth)

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