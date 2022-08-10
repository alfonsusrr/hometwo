import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleDown, faAngleUp, faHouseUser, faBuildingUser, faChartLine, faBars, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'

export default function NavBarOwner(props) {
    const { expand, setExpand, activePage, activeSection } = props
    const [propertyExpand, setPropertyExpand] = useState(true)

    const handleHideMenu = async function () {
        await setPropertyExpand(false)
        await setExpand(!expand)
    }
    
    const handleHidePropertyNav = function () {
        if (expand) {
            setPropertyExpand(!propertyExpand)
        }
    }

    return (
        <div className={`sidebar-owner ${expand ? "" : "hide-sidebar"}`}>
            <div className="sidebar-owner__hide" onClick={handleHideMenu}>
                { expand ? 
                <div className="pl-4 flex">
                    <FontAwesomeIcon icon={faAngleLeft} className="text-2xl sidebar-owner__hide__icon"></FontAwesomeIcon>
                    {/* <div className={`font-bold text-base pl-4 truncate ${!expand ? "hidden" : ""}`}>Hide menus</div> */}
                </div> :
                    <FontAwesomeIcon icon={faBars} className="text-2xl sidebar-owner__hide__icon"></FontAwesomeIcon>
                }
            </div>

            <div className="sidebar-owner__navs">
                <div className="sidebar__nav-item-box">
                    <Link href='/owner'>
                        <div className={`sidebar__nav-item ${activePage === 'dashboard' ? "active-page" : ""} ${activeSection === 'dashboard' ? "active-section" : ""}`}>
                            <FontAwesomeIcon icon={faHouseUser} className="sidebar__nav-item__icon"></FontAwesomeIcon>
                            <div className={`sidebar__nav-item__text ${!expand ? "hidden" : ""}`}>Dashboard</div>
                        </div>
                    </Link>
                </div>
                
                <div className="sidebar__nav-item-box">
                    <div className={`sidebar__nav-item ${activeSection === 'properties' ? "active-section" : ""}`} onClick={handleHidePropertyNav}>
                        <FontAwesomeIcon icon={faBuildingUser} className="sidebar__nav-item__icon"></FontAwesomeIcon>
                        <div className={`sidebar__nav-item__text ${!expand ? "hidden" : ""}`}>Your Properties</div>
                        <div className={`text-xl mr-1 ml-auto  ${!expand ? "hidden" : ""}`}>
                            {
                                !propertyExpand ?
                                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon> :
                                <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
                            }
                            
                        </div>
                    </div>
                    { propertyExpand ?
                    <div className="relative">
                        <Link href='/owner/add_property'>
                            <div className="relative">
                                <div className={`sidebar__nav-subitem ${activePage === 'add_property' ? "active-page" : ""}`}>
                                    <div className={`sidebar__nav-subitem__text ${!expand ? "hidden" : ""}`}>Add Property</div>
                                </div>
                            </div>
                        </Link>
                        <Link href='/owner/my_property'>
                            <div className="relative">
                                <div className={`sidebar__nav-subitem ${activePage === 'property_list' ? "active-page" : ""}`}>
                                    <div className={`sidebar__nav-subitem__text ${!expand ? "hidden" : ""}`}>Property list</div>
                                </div>
                            </div>
                        </Link>
                    </div> : ""
                    }
                </div>
                
                {/* <div className="sidebar__nav-item-box">
                    <div className="sidebar__nav-item">
                        <FontAwesomeIcon icon={faChartLine} className="sidebar__nav-item__icon"></FontAwesomeIcon>
                        <div>
                            <div className={`sidebar__nav-item__text disabled ${!expand ? "hidden" : ""}`}>Statistics </div>
                            <div className={`text-sm text-gray-300 font-light truncate ${!expand ? "hidden" : ""}`}>coming soon</div>
                        </div>
                    </div>
                </div> */}

                <div className="sidebar__nav-item-box">
                    <Link href='/owner/settings/'>
                        <div className={`sidebar__nav-item ${activePage === 'settings' ? "active-page" : ""} ${activeSection === 'settings' ? "active-section" : ""}`}>
                            <FontAwesomeIcon icon={faUserGear} className="sidebar__nav-item__icon"></FontAwesomeIcon>
                            <div>
                                <div className={`sidebar__nav-item__text ${!expand ? "hidden" : ""}`}>User Settings </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}