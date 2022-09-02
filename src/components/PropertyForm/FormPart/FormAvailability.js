import FormSection from "../FormSection";
import FormItem from "../FormItem";
import NumberFormat from "react-number-format"
import DateRangePicker from '../../ui/DateRangePicker'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function FormAvailability(props) {
    const { handleChangeFormInput, formInput, validityFormInput, isAlertOn, id} = props

    // ---- Date Picker
    const handleDateChange = (startDate, endDate) => {
        handleChangeFormInput({
            availability: {
                ...formInput.availability,
                startDate: startDate,
                endDate: endDate
            }
        })
    }

    // ---- Additional Price
    const handleAddAdditionalPrice = () => {
        handleChangeFormInput({
            availability: {
                ...formInput.availability,
                additionalPrice: [...formInput.availability.additionalPrice, {
                    description: '',
                    price: 0
                }]
            }
        })
    }


    return (
        <FormSection title="Availability" id={id}>
            <FormItem title="Date available" description="set the start and end date when your property is available for rent">
                <DateRangePicker
                    startDate={formInput.availability.startDate}
                    endDate={formInput.availability.endDate}
                    onValueChange={handleDateChange}
                ></DateRangePicker>
            </FormItem>
            <FormItem 
                title="Price" 
                description="price for rent per month"
                alert="You must input valid price (minimum of $100)"
                onAlert={!validityFormInput?.availability?.price && isAlertOn}
            >
                <div className="flex items-center">
                    <div className="w-36 mr-4">
                        <NumberFormat 
                            className="filter-input--small" 
                            placeholder="$ 0"
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
                </div>
            </FormItem>
            <FormItem title="Additional Price" description="additional price includes deposits, monthly bill, etc">
                {
                    formInput?.availability?.additionalPrice.map((price, i) => {
                        return (
                            <div key={`price-${i}`} >
                                <div className="flex items-center gap-3 mb-2">
                                    <input type="text" 
                                        className={`additional-price__description ${!validityFormInput?.availability?.additionalPrice[i] && isAlertOn ? "alert" : ""}`}
                                        placeholder="Description" 
                                        onChange={(e) => {
                                        let additionalPrice = [...formInput?.availability?.additionalPrice]
                                            additionalPrice[i] = {
                                                description: e.target.value,
                                                price: additionalPrice[i].price
                                            }

                                            handleChangeFormInput({
                                                availability: {
                                                    ...formInput.availability,
                                                    additionalPrice
                                                }
                                            })
                                        }} 
                                        value={price?.description}
                                    ></input>
                                    <NumberFormat 
                                        className={`additional-price__price ${!validityFormInput?.availability?.additionalPrice[i] && isAlertOn ? "alert" : ""}`}
                                        thousandSeparator={true} prefix={'$ '} 
                                        placeholder="$ 0"
                                        value={price?.price} 
                                        displayType={'input'}
                                        allowLeadingZeros={false}
                                        onValueChange={(values) => {
                                            let additionalPrice = [...formInput?.availability?.additionalPrice]
                                            additionalPrice[i] = {
                                                description: additionalPrice[i].description,
                                                price: values.value
                                            }
                                            handleChangeFormInput({
                                                availability: {
                                                    ...formInput.availability,
                                                    additionalPrice
                                                }
                                            })
                                        }}
                                    />
                                    <div className="rounded-full bg-red-500 px-3 py-2 text-white text-sm cursor-pointer hover:bg-red-800" onClick={() => {
                                        let additionalPrice = [...formInput?.availability?.additionalPrice]
                                        additionalPrice.splice(i, 1)

                                        handleChangeFormInput({
                                            availability: {
                                                ...formInput.availability,
                                                additionalPrice
                                            }
                                        })
                                    }}>
                                        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                                    </div>
                                </div>
                                { !validityFormInput?.availability?.additionalPrice[i] && isAlertOn &&
                                <div className="property-form-item__alert">
                                    You must input description and valid price
                                </div>
                                }
                            </div>
                        )
                    })
                }
                <div className="cursor-pointer text-2xl mt-3 text-primary-orange hover:text-secondary-orange">
                    <FontAwesomeIcon icon={faPlusCircle} onClick={handleAddAdditionalPrice}></FontAwesomeIcon>
                </div>
            </FormItem>
        </FormSection>
    )
}