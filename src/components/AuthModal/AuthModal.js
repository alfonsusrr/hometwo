import ReactModal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import { resetLogError, toggleAuthBox, setLogRole } from "../../features/reducers/authReducer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect, useCallback } from "react"
import ChooseRole from "./ChooseRole"
import LoginPage from "./LoginPage"

export default function AuthModal(props) {
    const isAuthBoxOpen = useSelector((state) => state.auth.isAuthBoxOpen)
    const logRole = useSelector((state) => state.auth.logRole)
    const dispatch = useDispatch()
    const handleCloseAuthBox = () => {
        setRole(null)
        setLoginPage(false)
        dispatch(toggleAuthBox())
    }
    const [role, setRole] = useState(logRole)
    const [isLoginPage, setLoginPage] = useState(false)

    const handleBack = useCallback(() => {
        dispatch(resetLogError())
        setLoginPage(false)
        setRole(null)
    }, [])

    const handleChooseRole = (role) => {
        dispatch(setLogRole(role))
        setRole(role)
        setLoginPage(true)
    }

    useEffect(() => {
        if (!['customer', 'owner'].includes(logRole)) {
            handleBack()
        }
    }, [role])
    
    return (
        <ReactModal
            isOpen={isAuthBoxOpen}
            onRequestClose={handleCloseAuthBox}
            contentLabel="Authenticate"    
            closeTimeoutMS={200}
            className={`auth-modal ${isLoginPage ? "" : "choose-role"}`}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                }
            }}
        >
            <div className="auth-modal__head">
                { isLoginPage ? "" : 
                    <button onClick={handleCloseAuthBox} className="ml-auto">
                        <FontAwesomeIcon icon={faXmark} className="auth-modal__close"></FontAwesomeIcon>
                    </button>
                }
                { !isLoginPage ? "" :
                    <button onClick={handleBack}>
                        <FontAwesomeIcon icon={faAngleLeft} className="auth-modal__close"></FontAwesomeIcon>
                    </button>
                }
            </div>

            {isLoginPage ? <LoginPage/> : <ChooseRole handleChooseRole={handleChooseRole}/>}
        </ReactModal>
    )
}