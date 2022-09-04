import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthBox, logOut } from '../../features/reducers/authReducer';
import AuthModal from '../AuthModal/AuthModal';
import SearchBar from '../ui/SearchBar';
import { logOut as adminLogOut } from '../../features/reducers/adminReducer';
import fetchUser from '../../utils/fetchUser'
import fetchAdmin from '../../utils/fetchAdmin';

export default function Header(props) {
    const { type, scroll, withSearchBar } = props
    const [isProfileClosed, setIsProfileClosed] = useState(true)
    const router = useRouter()
    const authInfo = useSelector((state) => state.auth)
    const adminInfo = useSelector((state) => state.admin)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsProfileClosed(true)
        if (!["help", "landing", "admin"].includes(type)) {
            fetchUser({
                router, dispatch, authInfo, 
                role: type === "owner" ? "owner" : null
            })
        } else if (type === "admin") {
            fetchAdmin({
                router, dispatch, adminInfo,
                role: "admin"
            })
        }
    }, [type])

    const handleProfileClick = () => {
        if (!authInfo.isLoggedIn) {
            dispatch(toggleAuthBox())
        } else {
            setIsProfileClosed(!isProfileClosed)
        }
    }

    const handleAdminProfileClick = () => {
        if (adminInfo.isLoggedIn) {
            setIsProfileClosed(!isProfileClosed)
        }
    }

    const handleLogout = async () => {
        await setIsProfileClosed(true)

        if (type !== "admin") {
            await dispatch(logOut())
            router.push({
                pathname: '/home'
            })
        } else {
            await dispatch(adminLogOut())
            router.push({
                pathname: '/admin'
            })
        }
    }

    const handleAdminLogout = async () => {
        await setIsProfileClosed(true)
        await dispatch(adminLogOut())

        router.push({
            pathname: '/admin'
        })
    }

    const handleAdminSettings = async () => {
        await setIsProfileClosed(true)

        router.push({
            pathname: '/admin/account'
        })
    }

    return (
        <div className={`header ${type === "landing" && !scroll ? "landing" : ""} ${type === "admin" ? "admin" : ""}`}>
            <Link href="/home">
                <a className="flex items-center">
                    <div className="header__logo">
                        <Image src="/images/logo-transparent.png" layout='fill' objectFit='contain' ></Image>
                    </div>
                    { type !== "landing" &&
                    <h1 className="header__title flex">
                        HomeTwo 
                        {type === "admin" &&
                            <div className="text-2xl font-light pl-2 select-none">
                                administrator
                            </div>
                        }
                    </h1>
                    }

                    {  type === "landing" &&
                        <h1 className="font-bold text-2xl text-white">
                            HomeTwo
                        </h1>
                    }
                </a>
            </Link>
            {
                withSearchBar && <SearchBar/>
            }
            { type !== "admin" &&
            <div className="header__nav">
                <a href="/help" className="header__nav__list">Help Center</a>
                <a href="/contact" className="header__nav__list">Contact Us</a>
                { !["landing", "help"].includes(type) &&
                <div className="nav__profile-box">
                    <div className={`nav__profile ${authInfo.isLoggedIn ? "logged-in" : ""}`} onClick={handleProfileClick}>
                        <FontAwesomeIcon icon={faUser} className="mr-2"></FontAwesomeIcon>
                        <div className="nav__profile-text">
                            {authInfo.isLoggedIn ? authInfo.user.name : 'Login'}
                        </div>
                        
                        {
                            !authInfo.isLoggedIn ? '' :
                            <FontAwesomeIcon icon={isProfileClosed ? faAngleDown : faAngleUp} className="ml-2"></FontAwesomeIcon>
                        }
                    </div>
                    <div className={`profile-dropdown ${isProfileClosed ? "closed" : ""}`}>
                        { authInfo.isLoggedIn && authInfo.user?.role === 'owner' ?
                        <div className='profile-dropdown__item'>
                            <Link href="/owner">Owner Page</Link>
                        </div> : ''
                        }
                        <div className='profile-dropdown__item' onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                </div>
                }
            </div>
            }
            { type === "admin" &&
                <div className="header__nav">
                    <div className="nav__profile-box">
                        <div className={`nav__profile ${authInfo.isLoggedIn ? "logged-in" : ""}`} onClick={handleAdminProfileClick}>
                            <FontAwesomeIcon icon={faUser} className="mr-2"></FontAwesomeIcon>
                            <div className="nav__profile-text">
                                {adminInfo.isLoggedIn ? adminInfo.user.name : 'Login'}
                            </div>
                            
                            {
                                !adminInfo.isLoggedIn ? '' :
                                <FontAwesomeIcon icon={isProfileClosed ? faAngleDown : faAngleUp} className="ml-2"></FontAwesomeIcon>
                            }
                        </div>
                        <div className={`profile-dropdown ${isProfileClosed ? "closed" : ""}`}>
                            <div className='profile-dropdown__item' onClick={handleAdminSettings}>
                                Settings
                            </div>
                            <div className='profile-dropdown__item' onClick={handleAdminLogout}>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            }      
            {
                !["landing", "help"].includes(type) && authInfo.hasFetched && !authInfo.isLoggedIn &&
                <AuthModal></AuthModal>
            }     
        </div>
    )
}