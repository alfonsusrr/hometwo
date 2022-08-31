import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons" 
import { useState, useRef, useEffect} from 'react'
import moment from "moment"

export default function DateCalendar (props) {
    // Month, Year, Date: String
    const { 
        className, 
        days, 
        endDate, 
        endMonth, 
        endYear, 
        startDate,
        startMonth,
        startYear,
        currYear,
        currMonth,
        currDate,
        setDate, 
        setMonth, 
        setYear, 
        setCalendarType,
        onDateChange,
        type
    } = props

    const months = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
    }

    let year, month, date, nameOfMonth, activeClassName, otherActiveClassName

    year = currYear
    month = currMonth
    date = currDate

    nameOfMonth = months[parseInt(month)]

    let activeYear, activeMonth, activeDate
    if (type === "end") {
        activeYear = endYear
        activeMonth = endMonth
        activeDate = endDate
        activeClassName = "active--end"
        otherActiveClassName = "active--start"
    } else if (type === "start") {
        activeYear = startYear
        activeMonth = startMonth
        activeDate = startDate
        activeClassName = "active--start"
        otherActiveClassName = "active--end"
    }

    const [daysList, setDaysList] = useState([])
    useEffect(() => {
        // startDate, endDate : moment
        let { startDate:startDate_, endDate:endDate_ } = days
        startDate_ = moment(startDate_)
        endDate_ = moment(endDate_)
        
        const startCalendarDate = startDate_.date()
        const endCalendarDate = endDate_.date()
        const endPrevMonth = startDate_.endOf("month").date()
        const numOfDays = moment(year + "-" + month + "-01").endOf("month").date()

        // Handle calendar start with 1
        let prevMonthDaysList = []
        if (startDate_.month() + 1 !== parseInt(month)) {
            prevMonthDaysList = Array.apply(null, Array(endPrevMonth - startCalendarDate + 1)).map((_, i) => {
                return {
                    year: startDate_.year(),
                    month: startDate_.month() + 1,
                    date: startCalendarDate + i,
                    type: 'others'
                }
            })
        }

        const currMonthDaysList = Array.apply(null, Array(numOfDays)).map((_,i) => {
            return {
                year: parseInt(year),
                month: parseInt(month),
                date: 1 + i,
                type: 'current'
            }
        })

        // .month() starts with 0
        let nextMonthDaysList = []
        if (endDate_.month() + 1 !== parseInt(month)) {
            nextMonthDaysList = Array.apply(null, Array(endCalendarDate)).map((_, i) => {
                return {
                    year: endDate_.year(),
                    month: endDate_.month() + 1,
                    date: 1 + i,
                    type: 'others'
                }
            })
        }

        let newDaysList = prevMonthDaysList.concat(currMonthDaysList).concat(nextMonthDaysList)

        if (newDaysList.length < 42) {
            let additionalDays = []
            if (endDate_.month() + 1 !== parseInt(month)) {
                const index = newDaysList.length - 1
                additionalDays = Array.apply(null, Array(7)).map((_, i) => {
                    return {
                        year: endDate_.year(),
                        month: endDate_.month() + 1,
                        date: newDaysList[index].date + 1 + i,
                        type: 'others'
                    }
                })
            } else {
                additionalDays = Array.apply(null, Array(7)).map((_, i) => {
                    return {
                        year: parseInt(month) === 12 ? parseInt(year) + 1 : parseInt(year),
                        month: parseInt(month) === 12 ? 1 : parseInt(month) + 1,
                        date: 1 + i,
                        type: 'others'
                    }
                })
            }
            newDaysList = newDaysList.concat(additionalDays)
        }

        const fixedDaysList = newDaysList.map((day, i) => {
            const date = `${day.year}-${day.month < 10 ? 0 : ''}${day.month}-${day.date < 10 ? 0 : ''}${day.date}`
            const start = `${startYear}-${startMonth}-${startDate}`
            const end = `${endYear}-${endMonth}-${endDate}`
            
            return {
                ...day,
                between: moment(date).isBetween(start, end)
            }
        })
        setDaysList(fixedDaysList)       
    }, [days, startDate, endDate, startMonth, endMonth, startYear, endYear])

    const handleChangeMonth = (val) => {
        if (val === -1) {
            if (parseInt(month) === 1) {
                setMonth("12")
                const newYear = (parseInt(year) - 1).toString()
                setYear(newYear)
            } else {
                let newMonth = (parseInt(month) - 1).toString()
                if (newMonth.length === 1) {
                    newMonth = "0" + newMonth
                }
                setMonth(newMonth)
            }
        }

        if (val === 1) {
            if (parseInt(month) === 12) {
                setMonth("01")
                const newYear = (parseInt(year) + 1).toString()
                setYear(newYear)
            } else {
                let newMonth = (parseInt(month) + 1).toString()
                if (newMonth.length === 1) {
                    newMonth = "0" + newMonth
                }
                setMonth(newMonth)
            }
        }
    }

    const handleChangeDate = (newYear, newMonth, newDay) => {
        setDate(newDay.toString())
        if (newMonth !== month) {
            setMonth(newMonth.toString())
        }

        if (newYear !== year) {
            setYear(newYear.toString())
        }

        let monthString = newMonth.toString()
        let dayString = newDay.toString()

        if (dayString.length === 1) {
            dayString = "0" + dayString
        }

        if (monthString.length === 1) {
            monthString = "0" + monthString
        }

        onDateChange({ value: newYear.toString() + "-" +  monthString + "-" + dayString, valid: true})
    }

    return (
        <div className={className} >
            <div className="daterangepicker__calendar__head">
                <div 
                    className="daterangepicker__calendar__left-arrow"
                    onClick={() => {handleChangeMonth(-1)}}
                >
                    <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                </div>
                <div className="daterangepicker__calendar__title">
                    <div 
                        className="daterangepicker__calendar__title-text"
                        onClick={() => {setCalendarType("month")}}
                    >
                        {nameOfMonth} {parseInt(year)}
                    </div>
                </div>
                <div 
                    className="daterangepicker__calendar__right-arrow"
                    onClick={() => {handleChangeMonth(1)}}
                >
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
            <div className="daterangepicker__calendar__dates">
                {
                    daysList.map((day, dI) => {
                        if (type === "start") {
                            // console.log(month)
                        }

                        return (
                            <div 
                                key={dI}
                                className={`daterangepicker__calendar__date ${day.type === "current" ? "" : "other-months"}
                                ${day.date == activeDate && day.month == activeMonth && day.year == activeYear ? activeClassName : ""}
                                ${day.between ? "active-between" : ""}
                            `}
                                onClick={() => {
                                    handleChangeDate(day.year, day.month, day.date)
                                }}
                            >
                                {day.date}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}