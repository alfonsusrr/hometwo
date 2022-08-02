import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import PlacesCard from './PlacesCard'

export default function PlacesList (props) {
    const places = useSelector((state) => state.places)
    
    return (
        <div className='placeslist'>
            {places.map((place) => {
                return (
                    <Link href={`/rooms/${place.id}`} key={place.id}>
                        <a><PlacesCard place={place}></PlacesCard></a>
                    </Link>
                )
            })}
        </div>
    )
}