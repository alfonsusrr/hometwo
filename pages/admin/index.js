import Header from "../../src/components/Layout/Header"
import Footer from "../../src/components/Layout/Footer"
import Head from "next/head"
import AdminLogin from "../../src/components/AdminPage/AdminLogin"

export default function AdminPage() {
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