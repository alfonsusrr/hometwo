import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons" 
import { useState, useRef} from 'react'

export default function MonthCalendar (props) {
    const { className, year, setMonth, setCalendarType } = props

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

    const handleChangeMonth = () =>{

    }

    return (
        <div className={className}>
            <div className="daterangepicker__calendar__head">
                <div className="daterangepicker__calendar__left-arrow">
                    <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                </div>
                <div className="daterangepicker__calendar__title">
                    <div className="daterangepicker__calendar__title-text">
                        2022
                    </div>
                </div>
                <div className="daterangepicker__calendar__right-arrow">
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                </div>
            </div>
            <div className="daterangepicker__calendar__months">
                { months.map((quarter) => {
                    return (
                        <div className="grid grid-cols-4 mt-3 mx-2 gap-1">
                            {
                                quarter.map((month) => {
                                    return (
                                        <div
                                            className="daterangepicker__calendar__month"
                                            onClick={handleChangeMonth}
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