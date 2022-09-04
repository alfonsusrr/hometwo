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

export async function getServerSideProps(ctx) {
    return {
        props: {
            user: {}
        }
    }
}

export default function Home(props) {
    const cookies = new Cookies()
    const checkOptedIn = !!cookies.get('opted-in')
    const [optedIn, setOptedIn] = useState(checkOptedIn)
    const closeModal = () => {
        setOptedIn(true)
    }

    return (
        <div className="container">
            <Header withSearchBar={true} ></Header>
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
