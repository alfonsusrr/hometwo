import Header from "../../src/components/Layout/Header"
import Footer from "../../src/components/Layout/Footer"
import Head from "next/head"

export default function AdminPage() {
    return (
        <div className="container">
            <Header type="help"></Header>
            <Head>
                <title>HomeTwo Admin</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            
            <Footer></Footer>
        </div>
    )
}