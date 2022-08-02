import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleFilterBox } from "../../features/reducers/filtersReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export default function FilterBox (props) {
    const isFilterBoxOn = useSelector((state) => state.filters.isFilterBoxOn)
    const dispatch = useDispatch()

    const handleCloseFilterBox = function () {
        dispatch(toggleFilterBox())
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
            <div class="filter-modal__head">
                <button onClick={handleCloseFilterBox}>
                    <FontAwesomeIcon icon={faXmark} className="filter-modal__close"></FontAwesomeIcon>
                </button>
                <div class="filter-modal__title">
                    Filters
                </div>
                
            </div>
            <div class="filter-modal__body">

            </div>
        </ReactModal>
    )
}