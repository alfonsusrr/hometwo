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

    const getDecade = (date) => {
        const year = getYear(date)
        return (parseInt(year) - (parseInt(year) % 10)).toString()
    }

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

    const convertDisplay = (d) => {
        const date = getMonth(d) + getDate(d) + getYear(d).slice(2, 4)
        return date
    }
    
    // Manage input focus
    const [onEndCalendarFocus, setOnEndCalendarFocus] = useState(false)
    const [onStartCalendarFocus, setOnStartCalendarFocus] = useState(false)

    const startDateInput = useRef()
    const endDateInput = useRef()

    // Calendar handling
    
    const [calendarType, setCalendarType] = useState("date")

    const [startMonth, setStartMonth] = useState(getMonth(startDate))
    const [startDay, setStartDay] = useState(getDate(startDate))
    const [startYear, setStartYear] = useState(getYear(startDate))
    const [startDecade, setStartDecade] = useState(getDecade(startDate))
    const [startCalendarDay, setStartCalendarDay] = useState({})


    const [endMonth, setEndMonth] = useState(getMonth(endDate))
    const [endDay, setEndDay] = useState(getDate(endDate))
    const [endYear, setEndYear] = useState(getYear(endDate))
    const [endDecade, setEndDecade] = useState(getDecade(endDate))
    const [endCalendarDay, setEndCalendarDay] = useState({})

    const resetStartCalendar = () => {
        setStartMonth(getMonth(startDate))
        setStartYear(getYear(startDate))
        setStartDay(getDate(startDate))
        setStartDecade(getDecade(startDate))
    }

    const resetEndCalendar = () => {
        setEndMonth(getMonth(endDate))
        setEndYear(getYear(endDate))
        setEndDay(getDate(endDate))
        setEndDecade(getDecade(endDate))
    }

    // Show calendar or not (true/false)
    const [startCalendar, setStartCalendar] = useState(false)
    const [endCalendar, setEndCalendar] = useState(false)

    const handleShowStartCalendar = (show) => {
        if (show) {
            setStartCalendar(show)
        } else {
            setStartCalendar(show)

            if (!onStartCalendarFocus) {
                resetStartCalendar()
            }
        }
    }

    const handleShowEndCalendar = (show) => {
        if (show) {
            setEndCalendar(show)
        } else {
            setEndCalendar(show)

            if (!onEndCalendarFocus) {
                resetEndCalendar()
            }
        }
    }
    
    // Handling value change 
    useEffect(() => {
        const decade = getDecade(startDate)
        const year = getYear(startDate)
        const month = getMonth(startDate)
        const date = getDate(startDate)

        setStartMonth(month)
        setStartYear(year)
        setStartDecade(decade)
        setStartDay(date)
        setCalendarType("date")
    }, [startDate])

    useEffect(() => {
        const decade = getDecade(endDate)
        const year = getYear(endDate)
        const month = getMonth(endDate)
        const date = getDate(endDate)

        setEndMonth(month)
        setEndYear(year)
        setEndDecade(decade)
        setEndDay(date)
        setCalendarType("date")
    }, [endDate])

    const handleStartDateChange = (values) => {
        let newStartDate = values.value
        if (!values?.valid) {
            newStartDate = convertToDate(values.value)
        }
        let newEndDate = endDate

        if (moment(newStartDate, "YYYY-MM-DD", true).isValid()) {
            if (moment(newStartDate).isSameOrAfter(moment(endDate))) {
                newEndDate = moment(newStartDate).add(30, "d").format("YYYY-MM-DD")
            }

            onValueChange(newStartDate, newEndDate)
        }
    }

    const handleEndDateChange = (values) => {

        let newEndDate = values.value
        if (!values?.valid) {
            newEndDate = convertToDate(values.value)
        }

        let newStartDate = startDate

        if (moment(newEndDate, "YYYY-MM-DD", true).isValid()) {
            if (moment(newEndDate).isSameOrBefore(moment(startDate))) {
                newStartDate = moment(newEndDate).subtract(30, "d").format("YYYY-MM-DD")
            }

            onValueChange(newStartDate, newEndDate)
        }
    }


    // Handling get start and end date of calendar
    useEffect(() => {
        const date = endYear + "-" + endMonth + "-" + "01"
        
        const day = {
            startDate: moment(date).startOf("week").toDate(),
            endDate: moment(date).endOf("month").endOf("week").toDate()
        }
        setEndCalendarDay(day)

        const newDecade = (parseInt(endYear) - (parseInt(endYear) % 10)).toString()
        setEndDecade(newDecade)
    }, [endMonth, endYear])

    useEffect(() => {
        const date = startYear + "-" + startMonth + "-" + "01"
        
        const day = {
            startDate: moment(date).startOf("week").toDate(),
            endDate: moment(date).endOf("month").endOf("week").toDate()
        }
        setStartCalendarDay(day)

        const newDecade = (parseInt(startYear) - (parseInt(startYear) % 10)).toString()
        setStartDecade(newDecade)
    }, [startMonth, startYear])

    return (
        <div className="daterangepicker">
            <div className="daterangepicker__input-box">
                <NumberFormat 
                    className="daterangepicker__input" 
                    format={dateFormat}
                    mask={['M', 'M', 'D', 'D', 'Y', 'Y']}
                    value={convertDisplay(startDate)} 
                    displayType={'input'}
                    placeholder="mm/dd/yy"
                    onValueChange={handleStartDateChange}
                    onFocus={() => {handleShowStartCalendar(true)}}
                    onBlur={() => {
                        if (!onStartCalendarFocus) {
                            handleShowStartCalendar(false)
                        } else {
                            startDateInput.current.focus()
                        }
                    }}
                    getInputRef={startDateInput}
                >
                </NumberFormat>
                <div className="daterangepicker__icon">
                    <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                </div>
                <div 
                    className={`daterangepicker__calendar start ${startCalendar || onStartCalendarFocus ? 'block' : 'hide'}
                        ${calendarType === "date" ? "large" : "small"}
                    `} 
                    onMouseEnter={() => {
                        setOnStartCalendarFocus(true)
                    }}
                    onMouseLeave={() => {
                        setOnStartCalendarFocus(false)
                    }}
                    onClick={() => {
                        startDateInput.current.focus()
                    }}
                >   
                    { startCalendarDay?.startDate ?
                    <DateCalendar 
                        className={`${calendarType === "date" ? "block" : "hidden"}`}
                        setCalendarType={setCalendarType}
                        endMonth={getMonth(endDate)}
                        endYear={getYear(endDate)}
                        endDate={getDate(endDate)}
                        startMonth={getMonth(startDate)}
                        startYear={getYear(startDate)}
                        startDate={getDate(startDate)}
                        currDate={startDay}
                        currMonth={startMonth}
                        currYear={startYear}
                        days={startCalendarDay}
                        setDate={setStartDay}
                        setMonth={setStartMonth}
                        setYear={setStartYear}
                        onDateChange={handleStartDateChange}
                        type={"start"}
                    ></DateCalendar> : ""
                    }
                    <MonthCalendar 
                        className={`${calendarType === "month" ? "block" : "hidden"}`}
                        setCalendarType={setCalendarType}
                        setMonth={setStartMonth}
                        setYear={setStartYear}
                        year={endYear}
                        month={endMonth}
                    ></MonthCalendar>
                    <YearCalendar 
                        className={`${calendarType === "year" ? "block" : "hidden"}`}
                        setCalendarType={setCalendarType}
                        year={endYear}
                        setYear={setStartYear}
                        setDecade={setStartDecade}
                        decade={endDecade}
                    ></YearCalendar>
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
                    value={convertDisplay(endDate)} 
                    displayType={'input'}
                    placeholder="mm/dd/yy"
                    onValueChange={handleEndDateChange}
                    onFocus={() => {handleShowEndCalendar(true)}}
                    onBlur={() => {
                        if (!onEndCalendarFocus) {
                            handleShowEndCalendar(false)
                        } else {
                            endDateInput.current.focus()
                        }
                    }}
                    getInputRef={endDateInput}
                >
                </NumberFormat>
                <div className="daterangepicker__icon">
                    <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                </div>
                <div 
                    className={`daterangepicker__calendar end ${endCalendar || onEndCalendarFocus ? 'block' : 'hide'}
                        ${calendarType === "date" ? "large" : "small"}
                    `} 
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
                    { endCalendarDay?.startDate ?
                    <DateCalendar 
                        className={`${calendarType === "date" ? "block" : "hidden"}`}
                        setCalendarType={setCalendarType}
                        endMonth={getMonth(endDate)}
                        endYear={getYear(endDate)}
                        endDate={getDate(endDate)}
                        startMonth={getMonth(startDate)}
                        startYear={getYear(startDate)}
                        startDate={getDate(startDate)}
                        currDate={endDay}
                        currMonth={endMonth}
                        currYear={endYear}
                        days={endCalendarDay}
                        setDate={setEndDay}
                        setMonth={setEndMonth}
                        setYear={setEndYear}
                        onDateChange={handleEndDateChange}
                        type={"end"}
                    ></DateCalendar> : ""
                    }
                    <MonthCalendar 
                        className={`${calendarType === "month" ? "block" : "hidden"}`}
                        setCalendarType={setCalendarType}
                        setMonth={setEndMonth}
                        setYear={setEndYear}
                        year={startYear}
                        month={startMonth}
                    ></MonthCalendar>
                    <YearCalendar 
                        className={`${calendarType === "year" ? "block" : "hidden"}`}
                        setCalendarType={setCalendarType}
                        year={startYear}
                        setYear={setEndYear}
                        setDecade={setEndDecade}
                        decade={startDecade}
                    ></YearCalendar>
                </div>
            </div>
        </div>
    )
}