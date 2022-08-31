import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faMagnifyingGlass, faMagnifyingGlassPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

export default function ImageInput(props) {
    const { image, setImage, deleteImage } = props

    const handleFileChange = (e) => {
        const files = e.target.files

        if (files) {
            setImage(files[0])
        }
    }

    const uploadedImage = useRef()

    useEffect(() => {
        if (image) {
            let reader = new FileReader()
            reader.onloadend = () => {
                uploadedImage.current.src = reader.result
            }
            reader.readAsDataURL(image)
        } else {
            if (uploadedImage?.current?.src) {
                uploadedImage.current.src = ''
            }
        }
    }, [image])

    const [actionBtn, setActionBtn] = useState(false)
    return (
        <div className="property-form__image-input">
            <input type="file" accept=".jpg, .jpeg, .png, .webp" className="property-form__image-file-input" onChange={handleFileChange}></input>
            { image === null &&
            <div className="property-form__picture-box">
                <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
            </div>
            }
            { image !== null &&
                <div 
                    className="property-form__picture-box--image" 
                    onMouseEnter={() => {setActionBtn(true)}}
                    onMouseLeave={() => {setActionBtn(false)}}
                >
                    <img src='' ref={uploadedImage}/>
                    <div className={`picture-box__action-btn ${!actionBtn ? "hidden" : "flex"}`}>
                        <div 
                            className="bg-white bg-opacity-40 px-2 py-1 rounded-lg text-sm cursor-pointer hover:bg-opacity-60"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlassPlus}></FontAwesomeIcon>
                        </div>
                        <div 
                            className="bg-white bg-opacity-40 px-2 py-1 rounded-lg text-sm cursor-pointer hover:bg-opacity-60"
                            onClick={deleteImage}
                        >
                            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}