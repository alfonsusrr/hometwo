import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from "next/link"
import validator from "validator"
import PhoneInput from "react-phone-number-input"
import { logIn, signUp } from "../../features/reducers/authReducer"
import 'react-phone-number-input/style.css'

export default function RegisterForm (props) {
    const dispatch = useDispatch()
    const isLogging = useSelector((state) => state.auth.logRequest)
    const { handlePage, email, otherMethods, name} = props
    const initEmail = email ? true : false
    const [phoneNumber, setPhoneNumber] = useState('')
    const initialInput = {
        name: {
            value: name,
            valid: true,
            alert: ''
        },
        email: {
            value: email,
            valid: true,
            alert: ''
        },
        phoneNumber: {
            value: '',
            valid: true,
            alert: ''
        },
        password: {
            value: '',
            valid: true,
            alert: ''
        },
        confirmPassword: {
            value: '',
            valid: true,
            alert: ''
        },
    }
    const [registerInput, setRegisterInput] = useState(initialInput)

    const validateName = (name) => {
        if (name === '') {
            return {
                valid: false,
                alert: "Name must be filled"
            }
        }

        return {
            valid: true, 
            alert: ""
        }
    }

    const validateEmail = (email) => {
        if (email === '') {
            return {
                valid: false,
                alert: "Email must be filled"
            }
        }

        if (!validator.isEmail(email)) {
            return {
                valid: false,
                alert: "Invalid email"
            }
        }

        return {
            valid: true, 
            alert: ""
        }
    }

    const validatePhoneNumber = (phoneNumber) => {
        if (phoneNumber === '') {
            return {
                valid: false,
                alert: "Phone number must be filled"
            }
        }

        if (!validator.isMobilePhone(phoneNumber || '')) {
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

    const handleNameChange = (e) => {
        const { valid, alert } = validateName(e.target.value)
        const name = {
            value: e.target.value,
            valid,
            alert
        }
        setRegisterInput({ ...registerInput, name })
    }

    const handleEmailChange = (e) => {
        const { valid, alert } = validateEmail(e.target.value)
        const email = {
            value: e.target.value,
            valid,
            alert
        }
        setRegisterInput({ ...registerInput, email })
    }

    useEffect(() => {
        const { valid, alert } = validatePhoneNumber(phoneNumber)
        const newPhoneNumber = {
            value: phoneNumber,
            valid,
            alert
        }
        setRegisterInput({ ...registerInput, phoneNumber: newPhoneNumber })
    }, [phoneNumber])

    useEffect(() => {
        setRegisterInput(initialInput)
    }, [])

    const validatePassword = (password) => {
        if (password === '') {
            return {
                valid: false,
                alert: "Password must be filled"
            }
        }

        if (!validator.isLength(password, {
            min: 8
        }) ) {
            return {
                valid: false,
                alert: "Password length less than 8 characters"
            }
        }

        return {
            valid: true,
            alert: ""
        }
    }

    const validateConfirmPassword = (password) => {
        if (password === '') {
            return {
                valid: false,
                alert: "You must confirm your password"
            }
        }

        if (password !== registerInput.password.value) {
            return {
                valid: false,
                alert: "Confirmation password must be the same"
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
        setRegisterInput({ ...registerInput, password })
    }

    const handleConfirmPasswordChange = (e) => {
        const { valid, alert } = validateConfirmPassword(e.target.value)
        const confirmPassword = {
            value: e.target.value,
            valid,
            alert
        }
        setRegisterInput({ ...registerInput, confirmPassword })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        const name = registerInput.name.value
        const email = registerInput.email.value
        const phoneNumber = registerInput.phoneNumber.value
        const password = registerInput.password.value
        
        if (!registerInput.name.valid || !registerInput.email.valid|| !registerInput.phoneNumber.valid || !registerInput.password.valid) {
            if (!otherMethods) {
                return
            }
        }

        const credentials = {
            name,
            email, 
            phoneNumber, 
            method: otherMethods ? 'others' : 'email'
        }

        if (!otherMethods) {
            credentials.password = password
        }

        await dispatch(signUp(credentials))
        handlePage("login")
    }

    return (
        <div>
        <form autoComplete='off' onSubmit={handleSignUp} className="login-email">
            <div className="login-input-group">
                <div className="login-input-group__title">Name</div>
                <input 
                    className={`login-input-group__input-box ${ !registerInput?.name?.valid ? "alert" : ""}`}
                    type="text"
                    value={registerInput?.name?.value}
                    onChange={handleNameChange}
                    name="name"
                ></input>
                <div className="login-input-group__alert">{registerInput?.name?.alert}</div>
            </div>

            <div className="login-input-group">
                <div className="login-input-group__title">Email</div>
                <input 
                    className={`login-input-group__input-box ${ !registerInput?.email?.valid ? "alert" : ""}`}
                    type="text"
                    value={registerInput?.email?.value}
                    onChange={handleEmailChange}
                    name="email"
                    disabled={initEmail ? "disabled" : ""}
                ></input>
                <div className="login-input-group__alert">{registerInput?.email?.alert}</div>
            </div>

            <div className="login-input-group">
                <div className="login-input-group__title">Phone Number</div>
                <PhoneInput 
                    className={`login-input-group__input-box ${ !registerInput?.phoneNumber?.valid ? "alert" : ""}`}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                ></PhoneInput>
                <div className="login-input-group__alert">{registerInput?.phoneNumber?.alert}</div>
            </div>
            { !otherMethods ? <div>
            <div className="login-input-group">
                <div className="login-input-group__title">Password</div>
                <input 
                    className={`login-input-group__input-box ${ !registerInput?.password?.valid ? "alert" : ""}`}
                    type="password"
                    value={registerInput?.password?.value}
                    onChange={handlePasswordChange}
                ></input>
                <div className="login-input-group__alert">{registerInput?.password?.alert} </div>
            </div>

            <div className="login-input-group">
                <div className="login-input-group__title">Confirm Password</div>
                <input 
                    className={`login-input-group__input-box ${ !registerInput?.confirmPassword?.valid ? "alert" : ""}`}
                    type="password"
                    value={registerInput?.confirmPassword?.value}
                    onChange={handleConfirmPasswordChange}
                ></input>
                <div className="login-input-group__alert">{registerInput?.confirmPassword?.alert} </div>
            </div></div>: ""
            }

            <button 
                className={`primary-button w-[100%] rounded-lg ${isLogging ? "disabled" : ""}`} 
                type="submit"
                disabled={isLogging ? "disabled" : ""}
            >
                {isLogging ? (otherMethods ? "Saving data..." : "Signing Up") : (otherMethods ? "Save details" : "Sign Up")}
            </button>
        </form>

        { otherMethods ? '' :
        <div>
            <div className="login-text mt-3">
                Already have an account? <span className="login-link" onClick={() => {handlePage("login")}}>Login here</span>
            </div>
            <div className="login-text">
                <Link href="/reset_password"><span className="login-link">Forgot Password?</span></Link>
            </div>
        </div>
        }
        </div>
    )
}