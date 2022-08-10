import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetLogError } from "../../features/reducers/authReducer"
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import RegisterMethod from './RegisterMethod'

export default function LoginPage() {
    const [page, setPage] = useState("login") 
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerName, setRegisterName] = useState('')
    const [registerOtherMethods, setRegisterOtherMethods] = useState(false)
    const logError = useSelector((state) => state.auth.logError)
    const dispatch = useDispatch()

    const handlePage = async (page, email, others, name) => {
        await setRegisterEmail(email)
        await setRegisterName(name)
        if (others) {
            await setRegisterOtherMethods(true)
        }
        await dispatch(resetLogError())
        await setPage(page)
    }

    let pageComponent
    if (page === "login") {
        pageComponent  = <LoginForm handlePage={handlePage}></LoginForm>
    } else if (page === "registerMethod") {
        pageComponent = <RegisterMethod handlePage={handlePage}></RegisterMethod>
    } else if (page === "register") {
        pageComponent = <RegisterForm handlePage={handlePage} email={registerEmail} otherMethods={registerOtherMethods} name={registerName}></RegisterForm>
    }

    return (
        <div className="login-page">
            <div className="mb-4">
                <div className="text-3xl font-bold">
                    {page === "login" ? "Login" : "Register"}
                </div>
            </div>
            <div className={`login-alert -mt-2 mb- ${logError === '' ? "hidden" : "block"}`}>{logError}</div>
            
            {pageComponent}
        </div>
    )
}