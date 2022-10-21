import Header from "../../../src/components/Layout/Header"
import Footer from "../../../src/components/Layout/Footer"
import Head from "next/head"
import LoaderAuth from "../../../src/components/LoaderAuth/LoaderAuth"
import { useSelector } from "react-redux"
import AdminNavBar from "../../../src/components/AdminNavBar/AdminNavBar"
import AdminTable from "../../../src/components/AdminTable/AdminTable"
import RoomsTable from "../../../src/components/AdminTable/RoomsTable"

export async function getServerSideProps(ctx) {
    const url = new URL('http://localhost:6080/api/admin/rooms')

    const query = ctx.query

    if (!query?.page) {
        query.page = 1
    }

    if (!query?.numItems) {
        query.numItems = 25
    }

    const res = await fetch('http://localhost:6080/api/admin/rooms?' + new URLSearchParams({
        ...query
    }), {
        method: 'GET',
        credentials: 'include',
        headers: {
            Cookie: `admin_access_token=${ctx.req.cookies["admin_access_token"]}`
        }
    })

    const data = await res.json()
    
    let rooms = null
    if (data.success) {
        rooms = data?.data?.rooms
    } 

    return {
        props: {
            rooms
        }
    }
}

export default function AdminRoomPage(props) {
    const authInfo = useSelector((state) => state.admin)
    const data = props?.rooms

    return (
        <div className="container">
            <Header type="admin"></Header>
            <Head>
                <title>HomeTwo Admin | Rooms</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            
            <LoaderAuth
                color="#000000"
                authorized={authInfo?.user?.role === "admin"}
                loading={!authInfo?.hasFetched}
            >
                <AdminNavBar>
                    <AdminTable title="Rooms">
                        <RoomsTable data={data}></RoomsTable>
                    </AdminTable>
                </AdminNavBar>
            </LoaderAuth>
            <Footer></Footer>
        </div>
    )
}