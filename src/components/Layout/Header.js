import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { app, db } from '../../../firebase/firebaseConfig'
import { toggleAuthBox, logOut } from '../../features/reducers/authReducer';
import AuthModal from '../AuthModal/AuthModal';
import SearchBar from '../ui/SearchBar';

export default function Header() {
    const [isProfileClosed, setIsProfileClosed] = useState(true)
    const router = useRouter()
    const authInfo = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const handleProfileClick = () => {
        if (!authInfo.isLoggedIn) {
            dispatch(toggleAuthBox())
        } else {
            setIsProfileClosed(!isProfileClosed)
        }
    }

    const handleLogout = async () => {
        await setIsProfileClosed(true)
        await dispatch(logOut())

        router.push({
            pathname: '/'
        })

    }

    return (
        <div className="header">
            <Link href="/">
                <a className="flex items-center">
                    <div className="header__logo">
                        <Image src="/images/logo-transparent.png" layout='fill' objectFit='contain' ></Image>
                    </div>
                    <h1 className="header__title">
                        HomeTwo
                    </h1>
                </a>
            </Link>
            <SearchBar/>
            <div className="header__nav">
                <a href="/help" className="header__nav__list">Help Center</a>
                <a href="/contact" className="header__nav__list">Contact Us</a>

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
            </div>
            <AuthModal></AuthModal>
        </div>
    )
}