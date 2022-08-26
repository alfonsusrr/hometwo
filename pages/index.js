import Head from "next/head";
import Header from '../src/components/Layout/Header';
import Footer from '../src/components/Layout/Footer'
import Landing from "../src/components/Landing/Landing";
import { useState, useEffect } from "react";

export default function index() {
    const [scrolled, setScrolled] = useState(false)

    const handleScroll = () => {
        const position = window.pageYOffset;
        if (position >= 600 && !scrolled) {
            setScrolled(true)
        }

        if (position < 600 ) {
            setScrolled(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="container">
            <Header type="landing" scroll={scrolled}></Header>
            <Head>
                <title>HomeTwo</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            
            <Landing></Landing>
            <Footer></Footer>
        </div>
    )
}
