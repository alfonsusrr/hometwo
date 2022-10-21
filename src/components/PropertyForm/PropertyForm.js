import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import moment from "moment"
import NavPropertyForm from "./NavPropertyForm";
import FormPropertyInfo from "./FormPart/FormPropertyInfo";
import FormLocation from "./FormPart/FormLocation";
import FormFacilities from "./FormPart/FormFacilities";
import FormAvailability from "./FormPart/FormAvailability";
import FormPictures from "./FormPart/FormPictures";
import FormRules from "./FormPart/FormRules"
import { useRouter } from "next/router";

export default function PropertyForm() {
    const router = useRouter()
    // ---- Loading lists
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
            city: 'Seattle',
            
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
            price: null,
            additionalPrice: []
        },
        pictures: {
            room: [],
            property: []
        },
        rules:{
            listedRules: [],
            additionalRules: '',
            agreement: false
        }
    }

    const initialValidityFormInput = {
        propertyInfo: {
            name: false,
            description: false,
        },
        location: {
            address: false,
            school: false
        },
        availability: {
            startDate: false,
            endDate: false,
            price: false,
            additionalPrice: false
        }, 
        pictures: {
            room: false,
            property: false
        },
        rules: {
            agreement: false,
        }
    }

    const initialCompletedSection = {
        propertyInfo: false,
        location: false,
        facilities: true,
        availability: false,
        pictures: false,
        rules: false,
    }

    // ------- Form Handling
    const [formInput, setFormInput] = useState(initialFormInput)
    const [isAlertOn, setIsAlertOn] = useState(false)
    const [validityFormInput, setValidityFormInput] = useState(initialValidityFormInput)
    const [completedSection, setCompletedSection] = useState(initialCompletedSection)

    const validateFormInput = (formInput) => {
        const newValidity = {
            propertyInfo: {
                name: formInput?.propertyInfo?.name !== '',
                description: formInput?.propertyInfo?.description !== '',
            },
            location: {
                address: formInput?.location?.address !== '',
                school: formInput?.location?.school.length !== 0
            },
            availability: {
                price: formInput?.availability?.price >= 100,
                additionalPrice: formInput?.availability?.additionalPrice.length === 0 ? [true] : 
                    formInput?.availability?.additionalPrice.map((price) => {
                        return price.description !== '' && price.price > 0
                    })
            }, 
            pictures: {
                room: formInput?.pictures?.room.length > 0,
                property: formInput?.pictures?.property.length > 0
            },
            rules: {
                agreement: formInput?.rules?.agreement === true,
            }
        }

        const newCompletedSection = {
            propertyInfo: newValidity.propertyInfo.name && newValidity.propertyInfo.description,
            location: newValidity.location.address && newValidity.location.school,
            facilities: true,
            availability: newValidity.availability.price && newValidity.availability.additionalPrice.every((value) => value === true),
            pictures: newValidity.pictures.room && newValidity.pictures.property,
            rules: newValidity.rules.agreement
        }
        setValidityFormInput(newValidity)
        setCompletedSection(newCompletedSection)
    }

    const handleChangeFormInput = (updates) => {
        setFormInput((prevState) => ({
            ...prevState,
            ...updates
        }))
    }

    useEffect(() => {
        validateFormInput(formInput)
    }, [formInput])

    const convertListObjectToArrayOfId = (obj, isAll = false) => {
        if (isAll) {
            return obj.map((el) => el.id)
        } else {
            return obj.filter((el) => el.value).map((el) => el.id)
        }
    }
    const handleSubmitForm = async () => {
        let submitValid = true
        let uncompletedSection = []
        for (const [key, value] of Object.entries(completedSection)) {
            if (!value) {
                submitValid = false
                uncompletedSection.push(key)
            }
        }
        
        if (!submitValid) {
            const element = document.getElementById(uncompletedSection[0]);
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            setIsAlertOn(true)
        } else {
            let formData = new FormData()

            formInput.pictures.room.map((file, i) => {
                formData.append(`img-room-${i}`, file)
            })

            formInput.pictures.property.map((file, i) => {
                formData.append(`img-property-${i}`, file)
            })

            const rawInput = {
                ...formInput
            }

            for (const [key, values] of Object.entries(rawInput)) {
                if (key !== 'facilities' && key !== 'pictures') {
                    for (const [key_, values_] of Object.entries(values)) {
                        if (key_ === "additionalPrice" || key_ === 'position') {
                            formData.append(key_, JSON.stringify(values_))
                        } else if (key_ !== "school" && key_ !== "listedRules") {
                            formData.append(key_, values_)
                        } else {
                            const isAll = key_ === "school" ? true : false
                            const newValue = convertListObjectToArrayOfId(values_, isAll)
                            formData.append(key_, JSON.stringify(newValue))
                        }
                    }
                } else if (key === 'facilities') {
                    const newValue = convertListObjectToArrayOfId(values)
                    formData.append(key, JSON.stringify(newValue))
                }
            }
            
            const response = await fetch("/api/owner/room", {
                method: 'POST',
                body: formData
            })

            console.log(...formData)
        }
    }

    return (
        <div>
            <NavPropertyForm completedSection={completedSection}></NavPropertyForm>
                <div className="property-form">
                    <FormPropertyInfo 
                        id="propertyInfo"
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput}
                        validityFormInput={validityFormInput}
                        isAlertOn={isAlertOn}
                    ></FormPropertyInfo>
                    <FormLocation 
                        id="location"
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput} 
                        validityFormInput={validityFormInput}
                        initialFormInput={initialFormInput}
                        isAlertOn={isAlertOn}
                    ></FormLocation>
                    <FormFacilities
                        id="facilities"
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput}
                        validityFormInput={validityFormInput}
                        isAlertOn={isAlertOn}
                    ></FormFacilities>
                    <FormAvailability
                        id="availability"
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput}
                        validityFormInput={validityFormInput}
                        isAlertOn={isAlertOn}
                    ></FormAvailability>
                    <FormPictures
                        id="pictures"
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput}
                        validityFormInput={validityFormInput}
                        isAlertOn={isAlertOn}
                    ></FormPictures>
                    <FormRules
                        id="rules"
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput}
                        validityFormInput={validityFormInput}
                        isAlertOn={isAlertOn}
                    ></FormRules>
                    
                    <div className="flex mb-6">
                        <button className="primary-button ml-auto" onClick={handleSubmitForm}>
                            <FontAwesomeIcon icon={faPaperPlane} className="mr-3"></FontAwesomeIcon>
                            Submit
                        </button>
                    </div>
                </div>
        </div>
    )
}