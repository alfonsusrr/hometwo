import { faEdit, faTrashCan, faEye, faCheckCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function RoomsTable(props) {
    const {
        data
    } = props
    return (
        <table className="admin-table__table table-fixed">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Actions</th>
                    <th style={{
                        minWidth: "120px"
                    }}>
                        Name
                    </th>
                    <th>Owner</th>
                    <th>Contact</th>
                    <th style={{
                        minWidth: "250px"
                    }}>
                        Address
                    </th>
                    <th style={{
                        minWidth: "160px"
                    }}>
                        Price
                    </th>
                    <th>Status</th>
                    <th style={{
                        minWidth: "120px"
                    }}>Consent</th>
                    <th style={{
                        minWidth: "200px"
                    }}>
                        Nearby School
                    </th>
                    <th style={{
                        minWidth: "300px"
                    }}>
                        Facilities
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data &&
                    data.map((room, i) => {
                        return (
                            <tr key={room.id}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center gap-1 ">
                                        <div className="admin-table__icon bg-cyan-500 hover:bg-cyan-600" onClick={() => {handleView(room.id)}}>
                                            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                                        </div>
                                        <div className="admin-table__icon bg-green-600 hover:bg-green-700" onClick={() => {handleEdit(room.id)}}>
                                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                        </div>
                                        <div className="admin-table__icon bg-red-600 hover:bg-red-700" onClick={() => {handleDelete(room.id)}}>
                                            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                                        </div>
                                    </div>
                                </td>
                                <td>{room.name}</td>
                                <td>
                                    <div className="text-sm text-slate-300">
                                        ID: {room.owner.id}
                                    </div>
                                    {room.owner.name}
                                </td>
                                <td>{room.contact}</td>
                                <td>{room.address}</td>
                                <td>
                                    <div>
                                        <span className="font-sans font-bold text-lg">$ {room.price}</span> /month
                                    </div>
                                    {
                                        room.additionalPrice.map((price) => (
                                            <div className={`room-table__additional-price ${price.description.toLowerCase() === 'deposit' ? "bg-pastel-green" : "bg-slate-100"}`}>
                                                <span className="font-bold font-sans mr-2 capitalize">{price.description}</span> ${price.price}

                                            </div>
                                        ))
                                    }
                                </td>
                                <td>
                                    {room.active &&
                                        <div className="text-green-500 font-sans font-bold flex items-center">
                                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2"></FontAwesomeIcon>
                                            Active
                                        </div>
                                    }

                                    { !room.active &&
                                        <div className="text-red-500 font-sans font-bold flex items-center">
                                            <FontAwesomeIcon icon={faCircleXmark} className="mr-2"></FontAwesomeIcon>
                                            Inactive
                                        </div>
                                    }
                                </td>
                                <td>
                                    {room.consent &&
                                        <div className="text-green-500 font-sans font-bold flex items-center">
                                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2"></FontAwesomeIcon>
                                            Granted
                                        </div>
                                    }

                                    { !room.consent &&
                                        <div className="text-red-500 font-sans font-bold flex items-center">
                                            <FontAwesomeIcon icon={faCircleXmark} className="mr-2"></FontAwesomeIcon>
                                            Not Yet
                                        </div>
                                    }    
                                </td>
                                <td>
                                    { room.school.map((s) => {
                                        return (
                                            <div className="table-small-badge bg-slate-100">
                                                {s}
                                            </div>
                                        )
                                    })}
                                </td>
                                <td>
                                    { room.facilities.filter((r) => r.type === "basic").map((r) => {
                                        return (
                                            <div className="table-small-badge bg-purple-100">
                                                {r.label}
                                            </div>
                                        )
                                    })}
                                    { room.facilities.filter((r) => r.type === "additional").map((r) => {
                                        return (
                                            <div className="table-small-badge bg-sky-100">
                                                {r.label}
                                            </div>
                                        )
                                    })}
                                    { room.facilities.filter((r) => r.type === "feature").map((r) => {
                                        return (
                                            <div className="table-small-badge bg-rose-100">
                                                {r.label}
                                            </div>
                                        )
                                    })}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}