import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ImageInput(props) {
    const { image } = props

    const [uploaded, setUploaded] = useState(false)
    return (
        <div>
            <input type="file"></input>
            { !uploaded &&
            <div className="property-form__picture-box">
                <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
            </div>
            }
            { uploaded &&
                <div className="property-form__picture-box">
                    <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
                </div>
            }
        </div>
    )
}