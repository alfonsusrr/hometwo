import { useState } from "react"
import NumberFormat from "react-number-format"
import { useDispatch, useSelector } from "react-redux"
import DoubleRangeSlider from "../ui/DoubleRangeSlider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faCity, faUserGroup, faCertificate, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function FilterBoxForm (props) {
    const [formInput, setFormInput] = props.formState
    const handleSaveFilter = props.handleSaveFilter

    const handleLocationChange = function (e) {
        setFormInput({...formInput, location: e.target.value})
    }

    const handleSchoolChange = function (e) {
        setFormInput({...formInput, school: e.target.value})
    }

    const handleStartDateChange = function (e) {
        setFormInput({...formInput, startDate: e.target.value})
    }

    const handleEndDateChange = function (e) {
        setFormInput({...formInput, endDate: e.target.value})
    }

    const handleMinBudgetChange = async function (values) {
        const value = values.value

        if (parseFloat(value) >= 10) {
            await setFormInput({ ...formInput, minBudget: parseFloat(value) })
        } else {
            await setFormInput({ ...formInput, minBudget: 10 })
        }

        if (parseFloat(value) >= formInput.maxBudget) {
            await setFormInput({ ...formInput, maxBudget: parseFloat(value) + 1})
        } 
    }

    const handleMaxBudgetChange = async function (values) {
        const value = values.value

        if (parseFloat(value) <= formInput.minBudget) {
            await setFormInput({ ...formInput, minBudget: parseFloat(value) - 1})
        } 
        await setFormInput({ ...formInput, maxBudget: parseFloat(value)})
    }

    const handleAmenityChange = function (e) {
        const amenity = e.target.id

        const amenities = { ...formInput.amenities }
        amenities[amenity] = !amenities[amenity]

        setFormInput({ ...formInput, amenities })
    }

    const handleFeaturesChange = function (e) {
        const feature = e.target.id
        const features = { ...formInput.features}
        features[feature] = !features[feature]

        setFormInput({ ...formInput, features })
    }

    const handleHouseTypeChange = function (type) {
        const currentType = formInput.type
        
        if (currentType !== type) {
            setFormInput({ ...formInput, type})
        } else {
            setFormInput({ ...formInput, type: null})
        }
    }

    const handleHostedChange = function () {
        setFormInput({ ...formInput, hosted: !formInput.hosted})
    }

    const handleRecommendedChange = function () {
        setFormInput({ ...formInput, recommended: !formInput.recommended})
    }

    const handleResetFilter = function (e) {
        e.preventDefault()
        props.handleResetFilter()
    }

    const handleSearch = function(e) {
        e.preventDefault()
        handleSaveFilter()
    }

    return (
        <form className="filter-modal__form" onSubmit={handleSearch}>
            <div className="filter-form__col">
                <div className="filter-form__group">
                    <div className="filter-group__title">
                        Location
                    </div>
                    <div className="filter-group__body">
                        <input type="text" className="filter-input--large" placeholder="Region or city of the place" onChange={handleLocationChange} value={formInput.location}></input>
                    </div>
                </div>
                <div className="filter-form__group">
                    <div className="filter-group__title">
                        School
                    </div>
                    <div className="filter-group__body">
                        <input type="text" className="filter-input--large" placeholder="Nearby school or university" onChange={handleSchoolChange} value={formInput.school}></input>
                    </div>
                </div>
                <div className="filter-form__group">
                    <div className="filter-group__title">
                        Start Date
                    </div>
                    <div className="filter-group__body">
                        <input type="date" className="filter-input--large" placeholder="Start date of staying" onChange={handleStartDateChange} value={formInput.startDate}></input>
                    </div>
                </div>

                <div className="filter-form__group">
                    <div className="filter-group__title">
                        Type
                    </div>
                    <div className="filter-group__body flex">
                        <div 
                            className={`filter-form__type-box ${formInput.type === "house" ? "active" : ""}`}
                            onClick={() => {handleHouseTypeChange("house")}}
                        >
                            <FontAwesomeIcon icon={faHouse} className="type-box__icon"></FontAwesomeIcon>
                            <div className="type-box__text">House</div>
                        </div>
                        <div 
                            className={`filter-form__type-box ${formInput.type === "apartment" ? "active" : ""}`}
                            onClick={() => {handleHouseTypeChange("apartment")}}
                        >
                            <FontAwesomeIcon icon={faCity} className="type-box__icon"></FontAwesomeIcon>
                            <div className="type-box__text">Apartment</div>
                        </div>
                    </div>
                </div>

                <div className="filter-form__group">
                    <div className="filter-group__title">
                        Others
                    </div>
                    <div className="filter-group__body flex gap-2">
                        <div 
                            className={`
                                filter-form__rounded-checkbox 
                                flex items-center
                                ${formInput.hosted ? "active" : ""}`}
                            onClick={handleHostedChange}
                        >
                            <FontAwesomeIcon icon={faUserGroup} className="mr-2"></FontAwesomeIcon>
                            Hosted
                        </div>
                        <div className={`
                                filter-form__rounded-checkbox 
                                flex items-center
                                ${formInput.recommended ? "active" : ""}`}
                            onClick={handleRecommendedChange}
                        >
                            <FontAwesomeIcon icon={faCertificate} className="mr-2"></FontAwesomeIcon>
                            Recommended
                        </div>
                    </div>
                </div>

            </div>
            <div className="filter-form__col">
                <div className="filter-form__group">
                    <div className="filter-group__title">
                        Budget
                        
                    </div>
                    <div className="filter-group__body flex">
                        <div>
                            <NumberFormat 
                                className="filter-input--small" 
                                thousandSeparator={true} prefix={'$ '} 
                                value={formInput.minBudget} 
                                displayType={'input'}
                                allowLeadingZeros={false}
                                onValueChange={handleMinBudgetChange}
                            />
                            <div className="pl-2 text-gray-400 text-sm">Min budget</div>
                        </div>
                        <div>
                        <NumberFormat 
                                className="filter-input--small" 
                                thousandSeparator={true} prefix={'$ '} 
                                value={formInput.maxBudget} 
                                displayType={'input'}
                                allowLeadingZeros={false}
                                onValueChange={handleMaxBudgetChange}
                            />
                            <div className="pl-2 text-gray-400 text-sm">Max budget</div>
                        </div>                           
                    </div>
                    <div className="filter-group__body my-11">
                        <DoubleRangeSlider
                            minValue={formInput.minBudget}
                            maxValue={formInput.maxBudget}
                            setMinValue={handleMinBudgetChange}
                            setMaxValue={handleMaxBudgetChange}
                        />
                    </div>
                </div>

                <div className="filter-form__group">
                    <div className="filter-group__title">
                        End Date
                    </div>
                    <div className="filter-group__body">
                        <input type="date" className="filter-input--large" placeholder="End date of staying" onChange={handleEndDateChange} value={formInput.endDate}></input>
                    </div>
                </div>

                <div className="filter-form__group">
                    <div className="filter-group__title">
                        Amenities
                    </div>
                    <div className="filter-group__body filter-form__checkboxes filter-form__amenities">
                        {Object.keys(formInput.amenities).map((amenity) => {
                            return (
                                <div className="filter-form__checkbox-group" key={amenity}>
                                    <input 
                                        className="filter-form__checkbox" 
                                        type="checkbox" 
                                        checked={formInput.amenities[amenity] ? "checked" : ""}
                                        value={formInput.amenities[amenity]}
                                        readOnly={true}
                                        name={amenity}
                                    ></input>
                                    <span className="filter-form__checkmark" onClick={handleAmenityChange} id={amenity}></span>
                                    <label> {amenity} </label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="filter-form__group">
                    <div className="filter-group__title">
                        Additional Features
                    </div>
                    <div className="filter-group__body filter-form__checkboxes filter-form__features">
                        {Object.keys(formInput.features).map((feature) => {
                            return (
                                <div className="filter-form__checkbox-group" key={feature}>
                                    <input 
                                        className="filter-form__checkbox" 
                                        type="checkbox" 
                                        value={formInput.features[feature]}
                                        checked={formInput.features[feature] ? "checked" : ""}
                                        name={feature}
                                        readOnly={true}
                                    ></input>
                                    <span className="filter-form__checkmark" onClick={handleFeaturesChange} id={feature}></span>
                                    <label> {feature} </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="filter-form__end lg:col-span-2 flex">
                <button type="reset" className="underline-button" onClick={handleResetFilter}>
                    Reset Filters
                </button>
                <button type="submit" className="primary-button ml-auto">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2"></FontAwesomeIcon>
                    Search
                </button>
            </div>
            
        </form>
    )
}