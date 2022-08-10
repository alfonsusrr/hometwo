import ReactModal from "react-modal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filtersInitialState, toggleFilterBox } from "../../features/reducers/filtersReducer";
import FilterBoxForm from "./FilterBoxForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { setFilters, resetFilters } from "../../features/reducers/filtersReducer"

export default function FilterBox (props) {
    const filters = useSelector((state) => state.filters)
    const isFilterBoxOn = useSelector((state) => state.filters.isFilterBoxOn)
    const [formInput, setFormInput] = useState({  ...filters.filters })
    
    const dispatch = useDispatch()

    const handleCloseFilterBox = function () {
        handleSaveFilter()
        dispatch(toggleFilterBox())
    }

    const handleSaveFilter = function () {
        dispatch(setFilters(formInput))
    }

    const handleResetFilter = function () {
        dispatch(resetFilters())
        setFormInput({ ...filtersInitialState.filters })
    }

    return (
        <ReactModal
            isOpen={isFilterBoxOn}
            onRequestClose={handleCloseFilterBox}
            contentLabel="Set Search Filter"    
            closeTimeoutMS={200}
            className="filter-modal"
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                }
            }}
        >
            <div className="filter-modal__head">
                <button onClick={handleCloseFilterBox}>
                    <FontAwesomeIcon icon={faXmark} className="filter-modal__close"></FontAwesomeIcon>
                </button>
                <div className="filter-modal__title">
                    Filters
                </div>
                
            </div>
            <div className="filter-modal__body">
                <FilterBoxForm handleSaveFilter={handleSaveFilter} formState={[formInput, setFormInput]} handleResetFilter={handleResetFilter}></FilterBoxForm>
            </div>
        </ReactModal>
    )
}