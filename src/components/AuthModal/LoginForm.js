import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from "next/link"
import validator from "validator"
import { logIn, toggleAuthBox } from "../../features/reducers/authReducer"
import PhoneInput from 'react-phone-number-input'

export default function LoginForm (props) {
    const dispatch = useDispatch()
    const router = useRouter()
    const isLoggingIn = useSelector((state) => state.auth.logRequest)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const handlePage = props.handlePage
    const [isEmail, setIsEmail] = useState(true)
    const allowedMethods = useSelector((state) => state.auth.allowedMethod)

    const handleChangeMethod = () => {
        setIsEmail(!isEmail)
    }

    const initialInput = {
        user: {
            value: '',
            valid: true,
            alert: ''
        },
        password: {
            value: '',
            valid: true,
            alert: ''
        }
    }
        
    const [loginInput, setLoginInput] = useState(initialInput)

    const validateUser = (user) => {
        if (user === '' || undefined) {
            return {
                valid: false,
                alert: "User credentials must be filled"
            }
        }

        if (!validator.isEmail(user || '') && isEmail) {
            return {
                valid: false,
                alert: "Invalid email"
            }
        }

        if (!validator.isMobilePhone(user || '') && !isEmail) {
            return {
                valid: false,
                alert: "Invalid phone number"
            }
        }

        return {
            valid: true, 
            alert: ""
        }
    }

    const handleUserChange = (e) => {
        const { valid, alert } = validateUser(e.target.value)
        const user = {
            value: e.target.value,
            valid,
            alert
        }
        setLoginInput({ ...loginInput, user })
    }

    const validatePassword = (password) => {
        if (password === '') {
            return {
                valid: false,
                alert: "Password must be filled"
            }
        }

        return {
            valid: true,
            alert: ""
        }
    }

    const handlePasswordChange = (e) => {
        const { valid, alert } = validatePassword(e.target.value)
        const password = {
            value: e.target.value,
            valid,
            alert
        }
        setLoginInput({ ...loginInput, password })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        
        const user = loginInput.user.value
        const password = loginInput.password.value

        const { valid: userValid, alert: userAlert} = validateUser(user)
        const { valid: passwordValid, alert: passwordAlert } = validatePassword(password)

        setLoginInput({
            ...loginInput,
            user: {
                ...loginInput.user,
                valid: userValid,
                alert: userAlert
            },
            password: {
                ...loginInput.password,
                valid: passwordValid,
                alert: passwordAlert
            }
        })
        if (!userValid) {
            return
        }

        const credentials = {
            user, 
            password,
            method: 'email'
        }

        if (isEmail) {
            dispatch(logIn(credentials)).unwrap().then((result) => {
                if (result?.role === 'owner') {
                    router.push({
                        pathname: '/owner'
                    })
                } else if (result?.role === 'customer') {
                    router.push({
                        pathname: '/home'
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const handleSignInWithGoogle = async () => {
        if (!allowedMethods.includes("google")) {
            return
        }

        dispatch(logIn({ method: 'google'})).unwrap().then((result) => {
            if (result?.role === 'owner') {
                router.push({
                    pathname: '/owner'
                })
            } else if (result?.role === 'customer') {
                router.push({
                    pathname: '/user'
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSignInWithFacebook = async () => {
        if (!allowedMethods.includes("facebook")) {
            return
        }
        dispatch(logIn({ method: 'facebook'})).unwrap().then((result) => {
            if (result?.role === 'owner') {
                router.push({
                    pathname: '/owner'
                })
            } else if (result?.role === 'customer') {
                router.push({
                    pathname: '/user'
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSignInWithApple = async () => {
        if (!allowedMethods.includes("apple")) {
            return
        }
    }

    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() =>{
        const e = { target: { value: phoneNumber }}
        handleUserChange(e)
    }, [phoneNumber])

    useEffect(() => {
        setLoginInput(initialInput)
    }, [])

    useEffect(() => {
        setLoginInput(initialInput)
    }, [isEmail])
    return (
        <div>
        <form onSubmit={handleLogin} className="login-email">
            <div className="login-input-group">
                <div className="login-input-group__title">{isEmail ? "Email" : "Phone Number"}</div>
                { isEmail ?
                <input 
                    className={`login-input-group__input-box ${ !loginInput?.user?.valid ? "alert" : ""}`}
                    type="text"
                    value={loginInput?.user?.value}
                    onChange={handleUserChange}
                ></input> : 
                <PhoneInput 
                    className={`login-input-group__input-box ${ !loginInput?.user?.valid ? "alert" : ""}`}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                ></PhoneInput>
                }
                <div className="login-input-group__alert">{loginInput?.user?.alert}</div>
            </div>
            
            <div className="login-input-group">
                <div className="login-input-group__title">Password</div>
                <input 
                    className={`login-input-group__input-box ${ !loginInput?.password?.valid ? "alert" : ""}`}
                    type="password"
                    value={loginInput?.password?.value}
                    onChange={handlePasswordChange}
                ></input>
                <div className="login-input-group__alert">{loginInput?.password?.alert} </div>
            </div>
            <button 
                className={`primary-button w-[100%] rounded-lg ${isLoggingIn ? "disabled" : ""}`} 
                type="submit"
                disabled={isLoggingIn ? "disabled" : ""}
            >
                {isLoggingIn ? "Logging in..." : "Login"}
            </button>
        </form>
        <div className="login-page__choose-line">
                or
        </div>
        <div className="login-others">
            <div className={`login-others__box ${!allowedMethods.includes("google") ? "disabled" : ""}`} onClick={handleSignInWithGoogle}>
                <div className="login-others__icon">
                    <img src="https://img.icons8.com/fluency/48/000000/google-logo.png" className="w-8 h-8 mr-4"/>
                </div>
                Sign In with Google
            </div>
            <div className={`login-others__box ${!allowedMethods.includes("facebook") ? "disabled" : ""}`} onClick={handleSignInWithFacebook}>
                <div className="login-others__icon">
                    <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" className="w-8 h-8 mr-4"/>
                </div>
                Sign In with Facebook
            </div>
            <div className={`login-others__box ${!allowedMethods.includes("apple") ? "disabled" : ""}`} onClick={handleSignInWithApple}>
                <div className="login-others__icon">
                    <img src="https://img.icons8.com/ios-filled/50/000000/mac-os.png" className="w-8 h-8 mr-4"/>
                </div>
                Sign In with Apple
            </div>
            <div className={`login-others__box ${!allowedMethods.includes("phone") ? "disabled" : ""}`} onClick={handleChangeMethod}>
                <div className="login-others__icon">
                    <img src={isEmail ? "https://img.icons8.com/ios-filled/50/000000/cell-phone.png" : "https://img.icons8.com/fluency-systems-filled/48/000000/circled-envelope.png"} className="w-8 h-8 mr-4"/>
                </div>
                Sign In with {isEmail ? "Phone number" : "Email"}
            </div>
        </div>
        <div className="login-text">
            New to HomeTwo? <span className="login-link" onClick={() => handlePage("registerMethod")}>Register here</span>
        </div>
        <div className="login-text">
            <Link href="/reset_password"><span className="login-link">Forgot Password?</span></Link>
        </div>
    </div>
    )
}