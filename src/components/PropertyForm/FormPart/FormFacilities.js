import FormSection from "../FormSection";
import FormItem from "../FormItem";
import { useState, useEffect } from "react";

export default function FormFacilities(props) {
    const { handleChangeFormInput, formInput} = props

    const [facilitiesFetched, setFacilitiesFetched] = useState(false)
    useEffect(() => {
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
                    setFacilitiesFetched(true)
                    handleChangeFormInput({
                        facilities: [...mappedFacilities]
                    })
                }
            })
    }, [])
    return (
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
    )
}