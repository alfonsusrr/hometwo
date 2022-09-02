import FormSection from "../FormSection";
import FormItem from "../FormItem";
import FormSelect from "../FormSelect";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, MarkerF, Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import countryOptions from '../../../../data/countryOptions'
import cityOptions from '../../../../data/cityOptions'

export default function FormLocation(props) {
    const { handleChangeFormInput, formInput, initialFormInput, validityFormInput, isAlertOn, id} = props

    const [stateOptions, setStateOptions] = useState([])
    const [uniOptions, setUniOptions] = useState([])

    const [stateOptionFetched, setStateOptionFetched] = useState(false)
    const [uniOptionFetched, setUniOptionFetched] = useState(false)

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
                setStateOptionFetched(true)
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
                        id: uni.id,
                        value: uni.id,
                        label: uni.name,
                    }
                }))
                setUniOptionFetched(true)
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
        handleChangeFormInput({
            location: {
                ...formInput.location,
                city: 'Seattle'
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

    return (
        <FormSection title="Location" id={id}>
            <FormItem 
                title="Country"
                description=""
            >
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
            <FormItem title="State" description="We are only available in the Seattle area at the moment">
                <FormSelect 
                    options={stateOptions}
                    isDisabled={true}
                    value={stateOption(formInput?.location?.state)} 
                    onChange={(value) => {
                            setChosenState(stateOption(value?.value))
                            handleChangeFormInput({ 
                                location: {
                                    ...formInput.location,
                                state: value?.value
                                }   
                            })
                        }}
                    placeholder="Select state"
                ></FormSelect>
            </FormItem>
            <FormItem title="City" description="">
                <FormSelect 
                    options={stateCityOptions}
                    isDisabled={true}
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
            <FormItem 
                title="Address" 
                description="don't worry, we will not disclose the exact address. We will just show the approximate location to the user"
                onAlert={!validityFormInput?.location?.address && isAlertOn}
            >
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
                { !validityFormInput?.location?.address && isAlertOn &&
                        <div className="property-form-item__alert">
                            Address is required
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
            <FormItem 
                title="Nearby School" 
                description="select one (or more) university near the location"
                alert="You must add at least one nearby school"
                onAlert={!validityFormInput?.location?.school && isAlertOn}
            >
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
    )
}