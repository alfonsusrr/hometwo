import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { useSelector, useDispatch} from "react-redux"
import { fetchUserData, toggleAuthBox } from '../../src/features/reducers/authReducer'
import NavBarOwner from '../../src/components/ui/NavBarOwner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import PulseLoader from 'react-spinners/PulseLoader'
import fetchUser from '../../src/utils/fetchUser'


export default function Dashboard() {

    // ---- Fetching user ----
    const router = useRouter()
    const dispatch = useDispatch()
    const authInfo = useSelector((state) => state.auth)
    const [fetched, setFetched] = useState(authInfo.hasFetched)

    useEffect(() => {
        fetchUser({
            router, dispatch, authInfo, fetched, setFetched, 
            role: "owner"
        })
    }, [fetched])

    // -------

    const [expand, setExpand] = useState(true)
    
    return (
        <div className="container">
            <Head>
                <title>HomeTwo | Home Owner</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <div>
                
            </div>
            <div className={`loader-container ${!fetched || (fetched && authInfo?.user?.role !== 'owner') ? "inline-block" : "hidden"}`}>
                <PulseLoader color={"#fd7300"} loading={!fetched} size={20}></PulseLoader>
            </div>
            <div className={`${fetched && authInfo?.user?.role === 'owner'? "block" : "hidden"}`}>
                <NavBarOwner expand={expand} setExpand={setExpand} activePage="dashboard" activeSection="dashboard"></NavBarOwner>
                <div className={`page-container--owner ${expand ? "" : "hide-sidebar"}`}>
                    <div className="welcome--owner">
                        <div className="text-2xl font-bold">
                            Hello, {authInfo.user.name}
                        </div>
                        <div className="text-lg font-light">
                            Welcome back! Here are your rental properties status
                        </div>
                    </div>
                    <div className="property-status">
                        <div className="property-status__item">
                            <div className="property-status__name">
                                rental properties
                            </div>
                            <div className="property-status__value">
                                10
                            </div>
                        </div>

                        <div className="property-status__item">
                            <div className="property-status__name">
                                property views
                            </div>
                            <div className="property-status__value">
                                239
                            </div>
                        </div>

                        <div className="property-status__item">
                            <div className="property-status__name">
                                people interested
                            </div>
                            <div className="property-status__value">
                                32
                            </div>
                        </div>
                    </div>

                    <div className="action-box">
                        <div className="action-box__title">
                            Manage your rental properties
                        </div>
                        <Link href="/owner/add_property">
                        <div className="action-box__btn">
                            <div className="action-box__btn__icon">
                                <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>
                            </div>
                            <div className="action-box__btn__text">
                                <div className="text-lg font-bold">
                                    Add a new property
                                </div>
                                <div className="text-base font-light">
                                    get your home or apartment listed on Home Two
                                </div>
                            </div>   
                        </div>
                        </Link>
                    </div>
                </div>
            </div>           
        </div>
    )
}