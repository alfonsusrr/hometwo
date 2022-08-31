import FormSection from "../FormSection";
import FormItem from "../FormItem";
import Switch from 'react-switch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBuilding} from "@fortawesome/free-solid-svg-icons";

export default function FormPropertyInfo(props) {
    const { handleChangeFormInput, formInput} = props
    return (
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
    )
}