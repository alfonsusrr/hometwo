import { faBars, faBarsStaggered, faBuilding, faChartSimple, faCircleUser, faEnvelope, faHandHoldingDollar, faHouse, faMoneyCheckDollar, faSliders, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"

export default function AdminNavBar (props) {
    const {
        children
    } = props
    const [expand, setExpand] = useState(true)
    return (
        <div className="admin-page-wrapper">
            <div className={`admin-navbar ${expand ? "expand" : ""}`}>
                <div className="admin-navbar__section nav-button">
                    <div className="admin-navbar__section-title" onClick={() => {setExpand((prevState) => !prevState)}}>
                        <div className="admin-navbar__section-title__icon menu-bars">
                            { expand ? 
                            <FontAwesomeIcon icon={faBarsStaggered} className="admin-navbar__icon"></FontAwesomeIcon> :
                            <FontAwesomeIcon icon={faBars} className="admin-navbar__icon"></FontAwesomeIcon>
                            }
                        </div>
                    </div>
                </div>
                <div className={`admin-navbar__group ${expand ? "expand" : ""}`}>
                    Analytics
                </div>
                <Link href="/admin/dashboard">
                    <div className="admin-navbar__section">
                        <div className="admin-navbar__section-title">
                            <div className="admin-navbar__section-title__icon">
                                <FontAwesomeIcon icon={faHouse} className="admin-navbar__icon"></FontAwesomeIcon>
                            </div>
                            <div className="admin-navbar__section-title__text">
                                Dashboard
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="admin-navbar__section">
                    <div className="admin-navbar__section-title">
                        <div className="admin-navbar__section-title__icon">
                            <FontAwesomeIcon icon={faMoneyCheckDollar} className="admin-navbar__icon"></FontAwesomeIcon>
                        </div>
                        <div className="admin-navbar__section-title__text">
                            Sales
                        </div>
                    </div>
                </div>
                <div className="admin-navbar__section">
                    <div className="admin-navbar__section-title">
                        <div className="admin-navbar__section-title__icon">
                            <FontAwesomeIcon icon={faChartSimple} className="admin-navbar__icon"></FontAwesomeIcon>
                        </div>
                        <div className="admin-navbar__section-title__text">
                            Website
                        </div>
                    </div>
                </div>
                <div className={`admin-navbar__group ${expand ? "expand" : ""}`}>
                    Admin
                </div>
                <Link href="/admin/room">
                    <div className="admin-navbar__section">
                        <div className="admin-navbar__section-title">
                            <div className="admin-navbar__section-title__icon">
                                <FontAwesomeIcon icon={faBuilding} className="admin-navbar__icon"></FontAwesomeIcon>
                            </div>
                            <div className="admin-navbar__section-title__text">
                                Rooms
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="admin-navbar__section">
                    <div className="admin-navbar__section-title">
                        <div className="admin-navbar__section-title__icon">
                            <FontAwesomeIcon icon={faHandHoldingDollar} className="admin-navbar__icon"></FontAwesomeIcon>
                        </div>
                        <div className="admin-navbar__section-title__text">
                            Orders
                        </div>
                    </div>
                </div>
                <div className={`admin-navbar__group ${expand ? "expand" : ""}`}>
                    Developers
                </div>
                <div className="admin-navbar__section">
                    <div className="admin-navbar__section-title">
                        <div className="admin-navbar__section-title__icon">
                            <FontAwesomeIcon icon={faEnvelope} className="admin-navbar__icon"></FontAwesomeIcon>
                        </div>
                        <div className="admin-navbar__section-title__text">
                            Reports
                        </div>
                    </div>
                </div>
                <div className={`admin-navbar__group ${expand ? "expand" : ""}`}>
                    Accounts
                </div>
                <div className="admin-navbar__section">
                    <div className="admin-navbar__section-title">
                        <div className="admin-navbar__section-title__icon">
                            <FontAwesomeIcon icon={faUsers} className="admin-navbar__icon"></FontAwesomeIcon>
                        </div>
                        <div className="admin-navbar__section-title__text">
                            Employees
                        </div>
                    </div>
                </div>
                <div className="admin-navbar__section">
                    <div className="admin-navbar__section-title">
                        <div className="admin-navbar__section-title__icon">
                            <FontAwesomeIcon icon={faCircleUser} className="admin-navbar__icon"></FontAwesomeIcon>
                        </div>
                        <div className="admin-navbar__section-title__text">
                            My Account
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="admin-container">
                {children}
            </div>
        </div>
    )
}