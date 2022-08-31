import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons" 
import { useState, useRef} from 'react'

export default function MonthCalendar (props) {
    const { className, year, setMonth, setYear, setCalendarType, month:currentMonth} = props

    const months = [
        [
        { month: 1, name: "Jan"},
        { month: 2, name: "Feb"},
        { month: 3, name: "Mar"},
        { month: 4, name: "Apr"},
        ], [
        { month: 5, name: "May"},
        { month: 6, name: "Jun"},
        { month: 7, name: "Jul"},
        { month: 8, name: "Aug"},
        ], [
        { month: 9, name: "Sep"},
        { month: 10, name: "Oct"},
        { month: 11, name: "Nov"},
        { month: 12, name: "Dec"},
        ]
    ]

    const handleChangeMonth = async (month) =>{
        await setMonth(month.toString())
        setCalendarType("date")
    }

    return (
        <div className={className}>
            <div className="daterangepicker__calendar__head">
                <div 
                    className="daterangepicker__calendar__left-arrow"
                    onClick={() => {
                        setYear((parseInt(year) - 1).toString())
                    }}
                >
                    <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                </div>
                <div 
                    className="daterangepicker__calendar__title"
                    onClick={() => {setCalendarType("year")}}
                >
                    <div className="daterangepicker__calendar__title-text">
                        {year}
                    </div>
                </div>
                <div 
                    className="daterangepicker__calendar__right-arrow"
                    onClick={() => {
                        setYear((parseInt(year) + 1).toString())
                    }}
                >
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                </div>
            </div>
            <div className="daterangepicker__calendar__months">
                { months.map((quarter, i) => {
                    return (
                        <div className="grid grid-cols-4 mt-3 mx-2 gap-1" key={`quarter-${i}`}>
                            {
                                quarter.map((month, mI) => {
                                    return (
                                        <div
                                            className={`daterangepicker__calendar__month ${month.month === parseInt(currentMonth) ? "active" : ""}`}
                                            onClick={() => {handleChangeMonth(month.month)}}
                                            key={`quarter-${i}-month-${mI}`}
                                        >
                                            {month.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}