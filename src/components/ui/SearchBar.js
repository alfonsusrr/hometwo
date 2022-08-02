import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { toggleFilterBox } from '../../features/reducers/filtersReducer'
import FilterBox from '../FilterBox/FilterBox'

export default function SearchBar() {
    const dispatch = useDispatch()

    const handleSearch = function (e) {
        e.preventDefault()
    }

    const handleDisplayFilter = function (e) {
        e.preventDefault()
        dispatch(toggleFilterBox())
    }

    return (
        <div className="w-[30%]">
            <form className='searchbar'>
                <input className='searchbar__input' placeholder="Find Location"/>
                <button className="searchbar__button" onClick={handleSearch} type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <button className="searchbar__filter" onClick={handleDisplayFilter}>
                    <FontAwesomeIcon icon={faSliders} />
                </button>
            </form>
            <FilterBox></FilterBox>
        </div>
    )
}