import Head from "next/head";
import OptInModal from "../src/components/OptIn/OptInModal";
import PlacesList from "../src/components/DisplayPlaces/PlacesList";
import { useRouter } from "next/router"
import Header from '../src/components/Layout/Header';
import Footer from '../src/components/Layout/Footer'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'
import fetchUser from '../src/utils/fetchUser'

export default function Home() {
    const cookies = new Cookies()
    const checkOptedIn = !!cookies.get('opted-in')
    const [optedIn, setOptedIn] = useState(checkOptedIn)
    const closeModal = () => {
        setOptedIn(true)
    }

    const router = useRouter()
    const dispatch = useDispatch()
    const authInfo = useSelector((state) => state.auth)
    const [fetched, setFetched] = useState(authInfo.hasFetched)

    useEffect(() => {
        fetchUser({
            router, dispatch, authInfo, fetched, setFetched, 
            role: null
        })
    }, [fetched, router, dispatch, authInfo])

    return (
        <div className="container">
            <Header></Header>
            <Head>
                <title>HomeTwo</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <OptInModal optedIn={optedIn} handleCloseOption={closeModal}></OptInModal>
            
            <div className="page-container">
                <h3 className="ch-2">Our Featured</h3>
                <PlacesList></PlacesList>
            </div>            
            <Footer></Footer>
        </div>
    )
}
