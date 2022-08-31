import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTreeCity, faLocationDot, faKitchenSet, faCalendarCheck, faFileImage, faFileContract } from "@fortawesome/free-solid-svg-icons";

export default function NavPropertyForm(props) {
    return (
        <div className="nav-property-form">
            <div className="nav-property-form__title">
                Add a new Property
            </div>
            <div className="nav-property-form__nav">
                <div className={`nav-property-form__item`}>
                    <div className="nav-property-form__icon">
                        <FontAwesomeIcon icon={faTreeCity}></FontAwesomeIcon>
                    </div>
                    <div className="nav-property-form__text">
                        Property Info
                    </div>
                </div>
                <div className={`nav-property-form__item`}>
                    <div className="nav-property-form__icon">
                        <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                    </div>
                    <div className="nav-property-form__text">
                        Location
                    </div>
                </div>
                <div className={`nav-property-form__item`}>
                    <div className="nav-property-form__icon">
                        <FontAwesomeIcon icon={faKitchenSet}></FontAwesomeIcon>
                    </div>
                    <div className="nav-property-form__text">
                        {"Facilities & Features"}
                    </div>
                </div>
                <div className={`nav-property-form__item`}>
                    <div className="nav-property-form__icon">
                        <FontAwesomeIcon icon={faCalendarCheck}></FontAwesomeIcon>
                    </div>
                    <div className="nav-property-form__text">
                        Availability
                    </div>
                </div>
                <div className={`nav-property-form__item completed`}>
                    <div className="nav-property-form__icon">
                        <FontAwesomeIcon icon={faFileImage}></FontAwesomeIcon>
                    </div>
                    <div className="nav-property-form__text">
                        Add Pictures
                    </div>
                </div>
                <div className={`nav-property-form__item`}>
                    <div className="nav-property-form__icon">
                        <FontAwesomeIcon icon={faFileContract}></FontAwesomeIcon>
                    </div>
                    <div className="nav-property-form__text">
                        {"Rules & Agreement"}
                    </div>
                </div>
            </div>
        </div>
    )
}