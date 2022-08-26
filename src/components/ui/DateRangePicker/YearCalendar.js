import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons" 
import { useState, useEffect} from 'react'

export default function YearCalendar (props) {
    const { className, decade, year: currentYear, setYear, setDecade, setCalendarType  } = props

    const [yearsList, setYearsList ] = useState([])

    useEffect(() => {
        const startYear = parseInt(decade)
        const newYearsList = Array.apply(null, Array(12)).map((_,i) => {
            return startYear + i - 1
        })

        setYearsList(newYearsList)
    }, [decade])

    const handleChangeYear = async (year) => {
        await setYear(year)
        setCalendarType("month")
    }

    return (
        <div className={className}>
            <div className="daterangepicker__calendar__head">
                <div 
                    className="daterangepicker__calendar__left-arrow"
                    onClick={() => {
                        const newDecade = (parseInt(decade) - 10).toString()
                        setDecade(newDecade)
                    }}
                >
                    <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                </div>
                <div 
                    className="daterangepicker__calendar__title"
                >
                    <div className="daterangepicker__calendar__title-text">
                        {decade} - {parseInt(decade) + 9}
                    </div>
                </div>
                <div 
                    className="daterangepicker__calendar__right-arrow"
                    onClick={() => {
                        const newDecade = (parseInt(decade) + 10).toString()
                        setDecade(newDecade)
                    }}
                >
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                </div>
            </div>
            <div className="daterangepicker__calendar__years">
                {
                    yearsList.map((year) => {
                        return (
                            <div 
                                className={`daterangepicker__calendar__year ${year === parseInt(currentYear) ? "active" : ""}`}
                                onClick={() => {handleChangeYear(year.toString())}}
                                key={year}
                            >
                                {year}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}