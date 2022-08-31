import { useState } from "react";
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

export default function PropertyForm() {
    
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
            price: 100,
            additionalPrice: []
        },
        pictures: {
            room: [],
            property: []
        },
        rules:{
            listedRules: [],
            additionalRules: ''
        }
    }
    // ------- Form Handling
    const [formInput, setFormInput] = useState(initialFormInput)
    const handleChangeFormInput = (updates) => {
        setFormInput((prevState) => ({
            ...prevState,
            ...updates
        }))
    }

    return (
        <div>
            <NavPropertyForm></NavPropertyForm>
                <div className="property-form">
                    <FormPropertyInfo 
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput}
                    ></FormPropertyInfo>
                    <FormLocation 
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput} 
                        initialFormInput={initialFormInput}
                    ></FormLocation>
                    <FormFacilities
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput}
                    ></FormFacilities>
                    <FormAvailability
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput}
                    ></FormAvailability>
                    <FormPictures
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput}
                    ></FormPictures>
                    <FormRules
                        formInput={formInput} 
                        handleChangeFormInput={handleChangeFormInput}
                    ></FormRules>
                    
                    
                    
                    <div className="flex mb-6">
                        <button className="primary-button ml-auto">
                            <FontAwesomeIcon icon={faPaperPlane} className="mr-3"></FontAwesomeIcon>
                            Submit
                        </button>
                    </div>
                </div>
        </div>
    )
}