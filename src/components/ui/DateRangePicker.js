import NumberFormat from "react-number-format"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons" 
import { useState, useRef, useEffect} from 'react'
import DateCalendar from './DateRangePicker/DateCalendar'
import MonthCalendar from './DateRangePicker/MonthCalendar'
import YearCalendar from './DateRangePicker/YearCalendar'
import moment from "moment"

export default function DateRangePicker (props) {
    const { startDate, endDate, onValueChange } = props

    // Format date: 'YYYY-MM-DD'

    const getYear = (date) => {
        return date.slice(0, 4)
    }

    const getMonth = (date) => {
        return date.slice(5, 7)
    }

    const getDate = (date) => {
        return date.slice(8, 10)
    }

    const limit = (val, max) => {
        // input month 2x or more
        if (val.length === 1 && val[0] > max[0]) {
            console.log("a")
            val = '0' + val
        }

        // Input xx
        if (val.length === 2) {
            // input 00
            if (Number(val) === 0) {
                val = '01'
            //input 1x, > 12
            } else if (val > max) {
                val = max
            }
        }
        return val 
    }

    const dateFormat = (val) => {
        let day = ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31']

        let year = val.substring(4, 6)

        if (year.length === 4) {
            const intYear = parseInt(year)
            if (intYear % 4 !== 0) {
                day[1] = '28'
            }
        }
        
        let month = limit(val.substring(0,2), '12')
        let maxDate = day[parseInt(month) - 1]
        let date = limit(val.substring(2, 4), maxDate)

        return month + (date.length ? '/' + date : '') + (year.length ? '/' + year : '')
    }

    const convertToDate = (int) => {
        const date = '20' + int.slice(4, 8).toString() + '-' + int.slice(0, 2).toString() + '-' + int.slice(2, 4).toString() 
        return date
    }

    const handleStartDateChange = (values) => {
        const newStartDate = convertToDate(values.value)
    }

    const handleEndDateChange = (values) => {
        const newEndDate = convertToDate(values.value)
    }

    const [startCalendar, setStartCalendar] = useState(false)
    const [endCalendar, setEndCalendar] = useState(false)

    const handleShowStartCalendar = (show) => {
        if (show) {
            setStartCalendar(show)
        } else {
            setTimeout(() => {
                setStartCalendar(show)
            }, 100)
        }
    }

    const handleShowEndCalendar = (show) => {
        if (show) {
            setEndCalendar(show)
        } else {
            setEndCalendar(show)
        }
    }

    const [onEndCalendarFocus, setOnEndCalendarFocus] = useState(false)

    const startDateInput = useRef()
    const endDateInput = useRef()

    const [calendarType, setCalendarType] = useState("date")

    const [startMonth, setStartMonth] = useState(getMonth(startDate))
    const [startDay, setStartDate] = useState(getDate(startDate))
    const [startYear, setStartYear] = useState(getYear(startDate))


    const [endMonth, setEndMonth] = useState(getMonth(endDate))
    const [endDay, setEndDate] = useState(getDate(endDate))
    const [endYear, setEndYear] = useState(getYear(endDate))
    const [endDays, setEndDays] = useState([])


    useEffect(() => {
        const date = endYear.toString() + endMonth.toString() + "01"
        const startCalendar = moment(date).startOf("week")
        const endCalendar = moment(date).endOf("month").endOf("week")
        console.log(startCalendar)
    }, [endMonth, endYear])

    return (
        <div className="daterangepicker">
            <div className="daterangepicker__input-box">
                <NumberFormat 
                    className="daterangepicker__input" 
                    format={dateFormat}
                    mask={['M', 'M', 'D', 'D', 'Y', 'Y']}
                    value={startDate} 
                    displayType={'input'}
                    placeholder="mm/dd/yy"
                    onValueChange={handleStartDateChange}
                    onFocus={() => {handleShowStartCalendar(true)}}
                    onBlur={() => {handleShowStartCalendar(true)}}
                    getInputRef={startDateInput}
                >
                </NumberFormat>
                <div className="daterangepicker__icon">
                    <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                </div>
            </div>
            <div className="mx-2">
                to
            </div>
            <div className="daterangepicker__input-box">
                <NumberFormat 
                    className="daterangepicker__input" 
                    format={dateFormat}
                    mask={['M', 'M', 'D', 'D', 'Y', 'Y']}
                    value={endDate} 
                    displayType={'input'}
                    placeholder="mm/dd/yy"
                    onValueChange={handleEndDateChange}
                    onFocus={() => {handleShowEndCalendar(true)}}
                    onBlur={() => {handleShowEndCalendar(false)}}
                    getInputRef={endDateInput}
                >
                </NumberFormat>
                <div className="daterangepicker__icon">
                    <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                </div>
                <div 
                    className={`daterangepicker__calendar ${endCalendar || onEndCalendarFocus ? 'block' : 'hide'}`} 
                    onMouseEnter={() => {
                        setOnEndCalendarFocus(true)
                    }}
                    onMouseLeave={() => {
                        setOnEndCalendarFocus(false)
                    }}
                    onClick={() => {
                        endDateInput.current.focus()
                    }}
                >   
                    <DateCalendar 
                        className={`${calendarType === "date" ? "block" : "hidden"}`}
                        setCalendarType={setCalendarType}
                        month={endMonth}
                    ></DateCalendar>
                    <MonthCalendar 
                        className={`${calendarType === "month" ? "block" : "hidden"}`}
                        setCalendarType={setCalendarType}
                        year={endYear}
                    ></MonthCalendar>
                    <YearCalendar 
                        className={`${calendarType === "year" ? "block" : "hidden"}`}
                        setCalendarType={setCalendarType}
                    ></YearCalendar>
                </div>
            </div>
        </div>
    )
}