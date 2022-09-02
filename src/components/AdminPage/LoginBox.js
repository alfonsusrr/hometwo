import { useState } from 'react'
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from 'react-redux'
import { setLogError, logIn } from '../../features/reducers/adminReducer'
import { useRouter } from 'next/router'

export default function LoginBox(props) {
    const dispatch = useDispatch()
    const router = useRouter()
    const error = useSelector((state) => state.admin.logError)
    const user = useSelector((state) => state.admin.user)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {
        type,
    } = props

    const handleLogin = async () => {
        if (username === '' || password === '') {
            dispatch(setLogError("Username and password must be filled"))
        } else {
            dispatch(logIn({
                username,
                password
            })).unwrap()
            .then((res) => {
                if (res.uid) {
                    router.push({
                        pathname: '/admin/dashboard'
                    })
                }
            })
            .catch((e) => {
                
            })
        }
    }

    return (
        <div className={`${type === "small" ? "admin-login__box--small" : "admin-login__box"}`}>
            <div className={`login-box__title ${type === "small" ? "light" : ""}`}>
                Login
            </div>
            { error &&
            <div className="login-box__alert">
                {error}
            </div>
            }
            <div className="login-box__input">
                <div className={`login-box__label ${type === "small" ? "light" : ""}`}>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    <div>
                        Username
                    </div>
                </div>
                <input type="text" placeholder="Your username" value={username} onChange={(e) => {setUsername(e.target.value)}}></input>
            </div>
            <div className="login-box__input">
                <div className={`login-box__label ${type === "small" ? "light" : ""}`}>
                    <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                    <div>
                        Password
                    </div>
                </div>
                <input type="password" placeholder="Your password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>
            <div className="flex items-center">
                <button className="primary-button bg-primary-orange ml-auto" onClick={handleLogin}>Login</button>
            </div> 
        </div>
    )
}