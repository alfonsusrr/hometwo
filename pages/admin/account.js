import Header from "../../src/components/Layout/Header"
import Footer from "../../src/components/Layout/Footer"
import Head from "next/head"
export default function AdminDashboard() {
    return (
        <div className="container">
            <Header type="admin"></Header>
            <Head>
                <title>HomeTwo Admin | Account Settings</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Footer></Footer>
        </div>
    )
}