import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons" 
// import { useState, useRef} from 'react'

export default function DateCalendar (props) {
    const { className, dates, month, setDate, setMonth, setYear, setCalendarType} = props
    return (
        <div className={className} >
            <div className="daterangepicker__calendar__head">
                <div className="daterangepicker__calendar__left-arrow">
                    <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                </div>
                <div className="daterangepicker__calendar__title">
                    <div 
                        className="daterangepicker__calendar__title-text"
                        onClick={() => {setCalendarType("month")}}
                    >
                        {month}
                    </div>
                </div>
                <div className="daterangepicker__calendar__right-arrow">
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                </div>
            </div>
            <div className="daterangepicker__calendar__days">
                <div className="daterangepicker__calendar__day-item">Su</div>
                <div className="daterangepicker__calendar__day-item">Mo</div>
                <div className="daterangepicker__calendar__day-item">Tu</div>
                <div className="daterangepicker__calendar__day-item">We</div>
                <div className="daterangepicker__calendar__day-item">Th</div>
                <div className="daterangepicker__calendar__day-item">Fr</div>
                <div className="daterangepicker__calendar__day-item">Sa</div>
            </div>
        </div>
    )
}