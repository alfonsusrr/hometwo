import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

export default function PlacesCard(props) {
    const startDate = moment(props.place.startAvailable).format("MMM D")
    const endDate = moment(props.place.endAvailable).format("MMM D")

    return (
        <div className="card">
            <div className="card__image">
                <img src={props.place.image} alt=""></img>
            </div>
            <div className="card__details">
                <div className="card__location">
                    <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                    <div className="card__location__text">{props.place.location}</div>
                </div>
                <div className="card__price">
                    <div className="price__number">
                        {'$' + props.place.price}
                    </div>
                    <div className="price__per">
                        {'/' + props.place.paymentPer}
                    </div>
                </div>
                <div className="card__description">
                    {props.place.description}
                </div>
                <div className="card__date">
                    {startDate} - {endDate}
                </div>
            </div>
        </div>
    )
}