import { useState, useEffect, useRef } from "react";
import FormSection from "./FormSection";
import FormItem from "./FormItem";
import Switch from 'react-switch';
import { GoogleMap, MarkerF, Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faMapLocationDot, faTreeCity, faLocationDot, faKitchenSet, faCalendarCheck, faFileImage, faFileContract, faHouse, faBuilding} from "@fortawesome/free-solid-svg-icons";
import FormSelect from "./FormSelect";
import countryOptions from '../../../data/countryOptions'
import cityOptions from '../../../data/cityOptions'
import NumberFormat from "react-number-format"
import DateRangePicker from '../ui/DateRangePicker'
import moment from "moment"

export default function PropertyForm() {
    
    // ---- Loading lists
    const [stateOptions, setStateOptions] = useState([])
    const [uniOptions, setUniOptions] = useState([])

    const stateOptionFetched = useRef(false)
    const uniOptionFetched = useRef(false)
    const initialFormInput = {
        propertyInfo: {
            type: "house",
            name: '',
            description: '',
            hosted: false,
        },
        location: {
            country: 'US',
            state: 'WA',
            city: '',
            
            address: '',
            position: {
                lat: 47.6,
                lng: -122.3
            },
            school: '',
        },
        facilities: [],
        availability: {
            startDate: moment().format("YYYY-MM-DD"),
            endDate: moment().endOf("month").format("YYYY-MM-DD"),
            price: 100,
        },
        pictures: {

        },
        rules:{

        }
    }
    // ------- Form Handling
    const [formInput, setFormInput] = useState(initialFormInput)
    const handleChangeFormInput = async (updates) => {
        if (updates?.location?.state) {
            await setChosenState(stateOption(updates?.location?.state))
        }

        await setFormInput({
            ...formInput,
            ...updates
        })
    }

    useEffect(() => {
        fetch('/api/lists/state/', {
            method: "GET",
            header: {
                'Content-Type': 'application/json',
        }})
            .then(async (res) => {
                const response = await res.json()
                if (!response.success) {
                    console.log(response.message)
                    return
                }
                const states = response.data.states
                setStateOptions(states.map((state) => {
                    return {
                        label: state.name,
                        value: state.abbr
                    }
                }))
                stateOptionFetched.current = true
            })
            .catch((e) => {
                console.log(e)
            })
        
        fetch('/api/lists/university?state=' + initialFormInput.location.state, {
            method: "GET",
            header: {
                'Content-Type': 'application/json',
        }})
            .then(async(res) => {
                const response = await res.json()
                if (!response.success) {
                    console.log(response.message)
                    return
                }
                const univs = response.data.university
                setUniOptions(univs.map((uni) => {
                    return {
                        label: uni.name,
                        value: uni.id
                    }
                }))
                uniOptionFetched.current = true
            })
        
        fetch('/api/lists/facility', {
            method: "GET",
            header: {
                'Content-Type': 'application/json',
        }})
            .then(async (res) => {
                const response = await res.json()
                if (!response.success) {
                    console.log(response.message)
                    return
                }
                const facilities = response.data.facilities
                const mappedFacilities = facilities.map((f) => {
                    return {
                        id: f._id,
                        label: f.label,
                        type: f.type,
                        value: false
                    }
                })

                if (facilities) {
                    handleChangeFormInput({
                        ...formInput,
                        facilities: [...mappedFacilities]
                    })
                }
            })
    }, [])

    // ---- Location
    const countryOption = (code) => {
        const country = countryOptions.find((country) => {
            return country.value === code
        })  
        return country
    }

    
    const stateOption = (code) => {
        const state =  stateOptions.find((state) => {
            return state.value === code
        })  
        return state
    }

    const uniOption = (code) => {
        const uni =  uniOptions.find((uni) => {
            return uni.value === code
        })  
        return uni
    }

    const [chosenState, setChosenState] = useState(stateOption(initialFormInput?.location?.state))

    const initialCityOptions = cityOptions.filter((city) => {
        return city.state === chosenState
    }).map((city) => {
        return {
            label: city.city,
            value: city.city
        }
    })

    const [stateCityOptions, setStateCityOptions] = useState(initialCityOptions)
    useEffect(() => {
        const cities = cityOptions.filter((city) => {
            return city.state === chosenState?.label
        })

        const mappedCities = cities.map((city) => {
            return {
                label: city.city,
                value: city.city
            }
        })
        setFormInput({
            ...formInput,
            location: {
                ...formInput.location,
                city: ''
            }
        })
        setStateCityOptions(mappedCities)
    }, [chosenState])

    useEffect(() => {
        setChosenState(stateOption(formInput.location.state))
    }, [stateOptions])

    const cityOption = (city) => {
        return {
            label: city,
            value: city
        }
    }

    // ---- Maps for address

    const mapContainerStyle = {
        width: '100%',
        height: '300px',
        borderRadius: '10px'
    }
    
    const [ libraries ] = useState(['places']);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.MAPS_API_KEY,
        libraries
    })
    
    const [map, setMap] = useState(null)
    const [address, setAddress] = useState(null)
    const [marker, setMarker] = useState(null)

    const [currentPosition, setCurrentPosition] = useState(initialFormInput.location.position)
    let isDragging = false

    useEffect(() => {
        const updateLocation = async() => {
            await handleChangeFormInput({
                location: {
                    ...formInput.location,
                    position: currentPosition
                }
            })

            if (!isDragging && isLoaded) {
                const { lat, lng } = currentPosition
                const geocoder = new google.maps.Geocoder()
                geocoder.geocode({ location: { lat, lng }}).then((res) => {
                    const newAddress = res.results[0].formatted_address

                    handleChangeFormInput({ 
                        location: {
                            ...formInput.location,
                            address: newAddress
                        }   
                    })

                }).catch((e) => {
                    console.log('Geocoder failed: ' + e)
                })
            }
        }    
        updateLocation()
    }, [currentPosition])

    // ---- Date Picker
    const handleDateChange = () => {

    }

    return (
        <div>
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
                <div className="property-form">
                    <FormSection title="Property Info">
                        <FormItem title="Property Name" description="add a catchy name that describe your property">
                            <input 
                                type="text" 
                                placeholder="Property name" 
                                value={formInput?.propertyInfo?.name} 
                                onChange={(e) => {handleChangeFormInput({ 
                                    propertyInfo: {
                                        ...formInput.propertyInfo,
                                        name: e.target.value 
                                    }
                                })}}
                            ></input>
                        </FormItem>
                        <FormItem title="Property Type">
                            <div className="property-type__buttons">
                                <button 
                                    className={`property-type__button ${formInput?.propertyInfo?.type === "house" ? "active" : ""}`}
                                    onClick={() => {handleChangeFormInput({ 
                                        propertyInfo: {
                                            ...formInput?.propertyInfo,
                                            type: "house"
                                        }
                                    })}}
                                >
                                    <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
                                    House
                                </button>
                                <button 
                                    className={`property-type__button ${formInput?.propertyInfo?.type === "apartment" ? "active" : ""}`}
                                    onClick={(e) => {handleChangeFormInput({ 
                                        propertyInfo: {
                                            ...formInput?.propertyInfo,
                                            type: "apartment"
                                        }
                                    })}}
                                >
                                    <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
                                    Apartment
                                </button>
                            </div>
                        </FormItem>
                        <FormItem title="Description" description="brief description of your property">
                            <textarea 
                                placeholder="Property description"
                                value={formInput.propertyInfo.description}
                                onChange={(e) => {handleChangeFormInput({ 
                                    propertyInfo: {
                                        ...formInput?.propertyInfo,
                                        description: e.target.value
                                    }
                                })}}
                            >                                
                            </textarea>
                        </FormItem>
                        <FormItem title="Hosted" description="hosted means the owner lives in the same house or apartment">
                            <Switch 
                                onColor={"#fd7300"} 
                                offColor={'#c3c3c3'} 
                                checkedIcon={false}
                                uncheckedIcon={false}
                                checked={formInput?.propertyInfo?.hosted}
                                onChange={(e) => {handleChangeFormInput({ 
                                    propertyInfo: {
                                        ...formInput.propertyInfo,
                                        hosted: !formInput.propertyInfo.hosted
                                    }
                                })}}
                            ></Switch>
                        </FormItem>
                    </FormSection>
                    <FormSection title="Location">
                        <FormItem title="Country" description="">
                            <FormSelect 
                                options={countryOptions}
                                isDisabled={true}
                                value={countryOption(formInput?.location?.country)} 
                                onChange={(value) => {handleChangeFormInput({ 
                                        location: {
                                            ...formInput.location,
                                            country: value?.value
                                        }   
                                    })}}
                                placeholder="Select country"
                            ></FormSelect>
                        </FormItem>
                        <FormItem title="State" description="We are only available in the Washington, USA at the moment">
                            <FormSelect 
                                options={stateOptions}
                                isDisabled={true}
                                value={stateOption(formInput?.location?.state)} 
                                onChange={(value) => {handleChangeFormInput({ 
                                        location: {
                                            ...formInput.location,
                                        state: value?.value
                                        }   
                                    })}}
                                placeholder="Select state"
                            ></FormSelect>
                        </FormItem>
                        <FormItem title="City" description="">
                            <FormSelect 
                                options={stateCityOptions}
                                isDisabled={false}
                                value={cityOption(formInput?.location?.city)} 
                                onChange={(value) => {handleChangeFormInput({ 
                                        location: {
                                            ...formInput?.location,
                                            city: value?.value
                                        }   
                                    })}}
                                placeholder="Select city"
                            ></FormSelect>
                        </FormItem>
                        <FormItem title="Address" description="don't worry, we will not disclose the exact address. We will just show the approximate location to the user">
                            { isLoaded ?
                                <Autocomplete
                                    onLoad={(autocomplete) => {
                                        setAddress(autocomplete)
                                    }}
                                    onPlaceChanged={function() {
                                        if (address !== null ){
                                            const place = address.getPlace()
                                            const lat = place.geometry.location.lat()
                                            const lng = place.geometry.location.lng()
                                            const newAddress = place.formatted_address
                                            setCurrentPosition({ lat, lng })
                                            handleChangeFormInput({ 
                                                location: {
                                                    ...formInput.location,
                                                    address: newAddress,
                                                    position: {
                                                        lat,
                                                        lng
                                                    }
                                                }   
                                            })                                            
                                        }
                                    }}
                                    restrictions={{ 'country': ['us']}}
                                >
                                    <input 
                                        type="text" 
                                        value={formInput.location.address}
                                        onChange={(e) => handleChangeFormInput({ 
                                            location: {
                                                ...formInput.location,
                                                address: e.target.value
                                            }   
                                        })}
                                    ></input>
                                </Autocomplete> : 

                                <div role="status" className="p-4 space-y-4 max-w-md rounded border border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                                    <div className="flex justify-between items-center border border-gray-200">
                                        <div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                </div>
                            }
                            <div className="mt-4">
                            {
                                isLoaded ? 
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={currentPosition}
                                    zoom={10}
                                    onLoad={(map) => {
                                        map.panTo(currentPosition)
                                        setMap(map)
                                    }}
                                    options={{
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: false
                                    }}
                                >
                                    <MarkerF
                                        onLoad={(marker) => {
                                            setMarker(marker)
                                        }}
                                        icon="https://img.icons8.com/color/48/000000/marker--v1.png"
                                        position={currentPosition}
                                        draggable={false}
                                        onDrag={() => {
                                            const pos = marker.getPosition()
                                            const lat = pos.lat()
                                            const lng = pos.lng()
                                            setCurrentPosition({
                                                lat, lng
                                            })
                                        }}
                                        onDragStart={() => {isDragging = true}}
                                        onDragEnd={() => {isDragging = false}}
                                    ></MarkerF>

                                </GoogleMap> : 

                                <div role="status" className="flex justify-center items-center max-w-sm h-56 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                                    <FontAwesomeIcon icon={faMapLocationDot} className="w-12 h-12 text-gray-200 dark:text-gray-600 text-5xl"></FontAwesomeIcon>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            }
                            </div>
                        </FormItem>
                        <FormItem title="Nearby School" description="select one (or more) university near the location">
                            <FormSelect 
                                options={uniOptions}
                                isMulti={true}
                                isDisabled={false}
                                value={uniOption(formInput?.location?.school)} 
                                onChange={(value) => {handleChangeFormInput({ 
                                        location: {
                                            ...formInput?.location,
                                            school: value
                                        }   
                                    })}}
                                placeholder="Select schools"
                            ></FormSelect>
                        </FormItem>
                    </FormSection>
                    <FormSection title="Facilities and Features">
                        <FormItem title="Amenities" description="select basic facilities that will be included in the property">
                            <div className="property-form__grid-checkbox">
                                {
                                    formInput.facilities.filter((facility) => {
                                        return facility.type === 'basic'
                                    }).map((facility) => {
                                        return (
                                            <div className="grid-checkbox__checkbox-item" key={facility.id}>
                                                <div className="grid-checkbox__input">
                                                    <input 
                                                        id={facility.id} 
                                                        type="checkbox" 
                                                        value={facility.value}
                                                        onChange={(e) => {
                                                            let facilities = formInput.facilities
                                                            const facilityIndex = facilities.findIndex((f) => f.id === facility.id)
                                                            facilities.splice(facilityIndex, 1, {
                                                                ...facility,
                                                                value: e.target.value === 'true' ? false : true
                                                            })
                                                            handleChangeFormInput({
                                                                ...formInput,
                                                                facilities
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                <div className="grid-checkbox__label">
                                                    {facility.label}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </FormItem>
                        <FormItem title="Additional Facilities" description="select facilities that you will provide">
                            <div className="property-form__grid-checkbox">
                                {
                                    formInput.facilities.filter((facility) => {
                                        return facility.type === 'additional'
                                    }).map((facility) => {
                                        return (
                                            <div className="grid-checkbox__checkbox-item" key={facility.id}>
                                                <div className="grid-checkbox__input">
                                                    <input 
                                                        id={facility.id} 
                                                        type="checkbox" 
                                                        value={facility.value}
                                                        onChange={(e) => {
                                                            let facilities = formInput.facilities
                                                            const facilityIndex = facilities.findIndex((f) => f.id === facility.id)
                                                            facilities.splice(facilityIndex, 1, {
                                                                ...facility,
                                                                value: e.target.value === 'true' ? false : true
                                                            })
                                                            handleChangeFormInput({
                                                                ...formInput,
                                                                facilities
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                <div className="grid-checkbox__label">
                                                    {facility.label}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </FormItem>
                        <FormItem title="Features" description="">
                            <div className="property-form__grid-checkbox--large">
                                {
                                    formInput.facilities.filter((facility) => {
                                        return facility.type === 'feature'
                                    }).map((facility) => {
                                        return (
                                            <div className="grid-checkbox__checkbox-item" key={facility.id}>
                                                <div className="grid-checkbox__input">
                                                    <input 
                                                        id={facility.id} 
                                                        type="checkbox" 
                                                        value={facility.value}
                                                        onChange={(e) => {
                                                            let facilities = formInput.facilities
                                                            const facilityIndex = facilities.findIndex((f) => f.id === facility.id)
                                                            facilities.splice(facilityIndex, 1, {
                                                                ...facility,
                                                                value: e.target.value === 'true' ? false : true
                                                            })
                                                            handleChangeFormInput({
                                                                ...formInput,
                                                                facilities
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                <div className="grid-checkbox__label">
                                                    {facility.label}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </FormItem>
                    </FormSection>
                    <FormSection title="Availability">
                        <FormItem title="Date available" description="set the start and end date when your property is available for rent">
                            <DateRangePicker
                                startDate={formInput.availability.startDate}
                                endDate={formInput.availability.endDate}
                                onValueChange={handleDateChange}
                            ></DateRangePicker>
                        </FormItem>
                        <FormItem title="Price" description="price for rent per month">
                            <div className="flex items-center">
                                <div className="w-36 mr-4">
                                    <NumberFormat 
                                        className="filter-input--small" 
                                        thousandSeparator={true} prefix={'$ '} 
                                        value={formInput.availability.price} 
                                        displayType={'input'}
                                        allowLeadingZeros={false}
                                        onValueChange={(values) => {
                                            handleChangeFormInput({
                                                availability: {
                                                    ...formInput.availability,
                                                    price: values.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                                <div className="flex-grow">
                                    <input type="range" min="10" max="10000" value={formInput.availability.price} onChange={(e) => {
                                        handleChangeFormInput({
                                            availability: {
                                                ...formInput.availability,
                                                price: e.target.value
                                            }
                                        })
                                    }}></input>
                                </div>
                            </div>
                        </FormItem>
                    </FormSection>
                    <FormSection title="Add Picture">
                        <FormItem title="Photos of the room" description="add photo(s) of the main room">
                            <div className="flex items-center flex-wrap flex-row gap-3">
                                <div className="property-form__picture-box">
                                    <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
                                </div>
                                <div className="property-form__picture-box">
                                    <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
                                </div>
                                <div className="property-form__picture-box">
                                    <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
                                </div>
                                <div className="property-form__picture-box">
                                    <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
                                </div>
                                <div className="property-form__picture-box">
                                    <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
                                </div>
                            </div>
                        </FormItem>
                        <FormItem title="Additional Photos" description="add photo(s) of kitchen, bathroom, outdoor area, etc">
                            <div className="flex items-center flex-wrap">
                                <div className="property-form__picture-box">
                                    <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
                                </div>
                            </div>
                        </FormItem>
                    </FormSection>
                    <FormSection title="Rules and Agreement">
                        <FormItem title="Rules" description="checklist the following rules or give your own rules that client need to obey">

                        </FormItem>
                    </FormSection>
                </div>
        </div>
    )
}