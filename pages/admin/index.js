import Header from "../../src/components/Layout/Header"
import Footer from "../../src/components/Layout/Footer"
import Head from "next/head"
import AdminLogin from "../../src/components/AdminPage/AdminLogin"
import fetchAdmin from '../../src/utils/fetchAdmin';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminPage() {
    const router = useRouter()
    const adminInfo = useSelector((state) => state.admin)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchAdmin({
            router, dispatch, adminInfo,
            role: "admin"
        })
    }, [])
    return (
        <div className="">
            <Head>
                <title>HomeTwo Admin</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            
            <AdminLogin></AdminLogin>
            <Footer></Footer>
        </div>
    )
}