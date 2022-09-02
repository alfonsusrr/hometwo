import FormSection from "../FormSection";
import FormItem from "../FormItem";
import ImageInput from "../../ui/ImageInput";

export default function FormPictures(props) {
    const { handleChangeFormInput, formInput, validityFormInput, isAlertOn, id} = props

    // ---- Image Input
    const handleAddRoomImage = (file, pos) => {
        // if position of image is empty
        if (pos >= formInput.pictures.room.length) {
            handleChangeFormInput({
                pictures: {
                    ...formInput.pictures,
                    room: [...formInput.pictures.room, file]
                }
            })
        } else {
            let pictures = [...formInput.pictures.room]
            pictures.splice(pos, 1, file)
            handleChangeFormInput({
                pictures: {
                    ...formInput.pictures,
                    room: pictures
                }
            })
        }
    }

    const handleRemoveRoomImage = (pos) => {
        let pictures = [...formInput.pictures.room]
        pictures.splice(pos, 1)
        if (pos < formInput.pictures.room.length) {
            handleChangeFormInput({
                pictures: {
                    ...formInput.pictures,
                    room: pictures
                }
            })
        }
    }

    const handleAddPropertyImage = (file, pos) => {
        // if position of image is empty
        if (pos >= formInput.pictures.property.length) {
            handleChangeFormInput({
                pictures: {
                    ...formInput.pictures,
                    property: [...formInput.pictures.property, file]
                }
            })
        } else {
            let pictures = [...formInput.pictures.property]
            pictures.splice(pos, 1, file)
            handleChangeFormInput({
                pictures: {
                    ...formInput.pictures,
                    property: pictures
                }
            })
        }
    }

    const handleRemovePropertyImage = (pos) => {
        let pictures = [...formInput.pictures.property]
        pictures.splice(pos, 1)
        if (pos < formInput.pictures.property.length) {
            handleChangeFormInput({
                pictures: {
                    ...formInput.pictures,
                    property: pictures
                }
            })
        }
    }

    return (
        <FormSection title="Add Picture" id={id}>
            <FormItem 
                title="Photos of the room" 
                description="add photo(s) of the main room"
                onAlert={!validityFormInput?.pictures?.room && isAlertOn}
            >
                { !validityFormInput?.pictures?.room && isAlertOn &&
                    <div className="property-form-item__alert mb-2">
                        You must add at least one photo of the room
                    </div>
                }
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                    {
                        Array.apply(null, Array(6)).map((_, i) => {
                            return (
                                <ImageInput 
                                    key={`room-image-${i}`}
                                    image={formInput?.pictures?.room.length < i + 1 ? null : formInput?.pictures?.room[i]} 
                                    setImage={(file) => {handleAddRoomImage(file, i)}} 
                                    deleteImage={() => {handleRemoveRoomImage(i)}}
                                ></ImageInput>
                            )
                        })
                    }
                </div>
            </FormItem>
            <FormItem 
                title="Photos of the property" 
                description="add photo(s) of kitchen, bathroom, outdoor area, etc"
                onAlert={!validityFormInput?.pictures?.property && isAlertOn}
            >
                { !validityFormInput?.pictures?.property && isAlertOn &&
                    <div className="property-form-item__alert mb-2">
                        You must add at least one photo of the property
                    </div>
                }
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                    {
                        Array.apply(null, Array(6)).map((_, i) => {
                            return (
                                <ImageInput 
                                    key={`property-image-${i}`}
                                    image={formInput?.pictures?.property.length < i + 1 ? null : formInput?.pictures?.property[i]} 
                                    setImage={(file) => {handleAddPropertyImage(file, i)}} 
                                    deleteImage={() => {handleRemovePropertyImage(i)}}
                                ></ImageInput>
                            )
                        })
                    }
                </div>
            </FormItem>
        </FormSection>
    )
}