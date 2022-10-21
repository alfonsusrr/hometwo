import { faMagnifyingGlass, faSquarePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import { useState } from "react"

export default function AdminTable(props) {
    const {
        title,
        children
    } = props

    const router = useRouter()

    const [numOfItems, setNumOfItems] = useState(router.query?.numItems || 25)
    const [page, setPage] = useState(router.query?.page || 1)
    const [searchQuery, setSearchQuery] = useState('')

    const handleNumOfItems = (e) => {
        const num = parseInt(e.target.value)
        
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page: page,
                numItems: num
            }
        })
    }

    const handleChangeQuery = (e) => {
        const query = e.target.value
        setSearchQuery(query)
    }

    const handleSearch = (e) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                query: searchQuery,
                page: 1
            }
        })
    }

    return (
        <div className="admin-table">
            <div className="admin-table__title">
                {title}
                <hr className="mt-2 w-full"></hr>
            </div>
            <div className="admin-table__actions">
                <div className="admin-table__num-items">
                    <select id="items_number" name="items_number" value={numOfItems} onChange={handleNumOfItems}>
                        <option value="25">Show 25 items</option>
                        <option value="50">Show 50 items</option>
                        <option value="100">Show 100 items</option>
                    </select>
                </div>
                <div className="admin-table__search">
                    <input type="text" placeholder="Search by name" value={searchQuery} onChange={handleChangeQuery}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch()
                            }
                        }}
                    ></input>
                    <button className="text-slate-400 hover:text-slate-500" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                    </button>
                </div>
                <div className="ml-auto">
                    <button className="primary-button">
                        <FontAwesomeIcon icon={faSquarePlus} className="inline pr-2"></FontAwesomeIcon>
                        Add New
                    </button>
                </div>
            </div>
            <div className="admin-table__table-section">
                {children}
            </div>
            <div className="admin-table__pagination">
                <div className="admin-table__pagination-buttons">

                </div>
            </div>
        </div>
    )
}