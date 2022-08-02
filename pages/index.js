import Header from "../src/components/Layout/Header";
import Footer from "../src/components/Layout/Footer";
import Head from "next/head";
import OptInModal from "../src/components/OptIn/OptInModal";
import PlacesList from "../src/components/DisplayPlaces/PlacesList";
import { useState } from "react";

export default function index() {
    const [optedIn, setOptedIn] = useState(false)

    const closeModal = () => {
        setOptedIn(true)
    }

    return (
        <div className="container">
            <Head>
                <title>HomeTwo</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <OptInModal optedIn={optedIn} handleCloseOption={closeModal}></OptInModal>
            
            <div className="container">
                <h3 className="ch-2">Our Featured</h3>

                <PlacesList></PlacesList>
            </div>            
        </div>
    )
}
