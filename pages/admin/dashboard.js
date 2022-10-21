import Header from "../../src/components/Layout/Header"
import Footer from "../../src/components/Layout/Footer"
import Head from "next/head"
import LoaderAuth from "../../src/components/LoaderAuth/LoaderAuth"
import { useSelector } from "react-redux"
import AdminNavBar from "../../src/components/AdminNavBar/AdminNavBar"
import MainDashboard from "../../src/components/AdminDashboard/MainDashboard"

export default function AdminDashboard() {
    const authInfo = useSelector((state) => state.admin)
    return (
        <div className="container">
            <Header type="admin"></Header>
            <Head>
                <title>HomeTwo Admin | Dashboard</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            
            <LoaderAuth
                color="#000000"
                authorized={authInfo?.user?.role === "admin"}
                loading={!authInfo?.hasFetched}
            >
                <AdminNavBar>
                    <MainDashboard></MainDashboard>
                </AdminNavBar>
            </LoaderAuth>
            <Footer></Footer>
        </div>
    )
}