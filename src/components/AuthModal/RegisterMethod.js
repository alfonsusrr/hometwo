import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signUpOthers } from '../../features/reducers/authReducer'
import validator from 'validator'
import Link from 'next/link'

export default function RegisterMethod (props) {
    const dispatch = useDispatch()
    const { handlePage } = props
    const allowedMethods = useSelector((state) => state.auth.allowedMethod)
    const user = useSelector((state) => state.auth.user)
    const [emailInput, setEmailInput] = useState({
        email: {
            value: '',
            valid: true, 
            alert: ''
        }
    })
    const handleEmailChange = (e) => {
        const email = e.target.value
        if (!validator.isEmail(emailInput.email.value)) {
            setEmailInput({
                email: {
                    value: email,
                    valid: false,
                    alert: 'Invalid email'
                }
            })
        } else {
            setEmailInput({
                email: {
                    value: email,
                    valid: true,
                    alert: ''
                }
            })
        }
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if (validator.isEmail(emailInput.email.value)) {
            handlePage("register", emailInput.email.value)
        }
    }

    const handleSignUpWithGoogle = async (e) => {
        if (!allowedMethods.includes("google")) {
            return
        }
        const data = await dispatch(signUpOthers({ method: "google" }))
    }  

    const handleSignUpWithFacebook = async (e) => {
        if (!allowedMethods.includes("facebook")) {
            return
        }
    }

    const handleSignUpWithApple = async (e) => {
        if (!allowedMethods.includes("apple")) {
            return
        }
    }

    useEffect(() => {
        const { email, name } = user
        if (user.name && user.email) {
            handlePage("register", email, true, name)
        }
        
    }, [user])

    return (
        <div>
            <form onSubmit={handleRegister} className="login-email">
                <div className="login-input-group">
                    <div className="login-input-group__title">Email</div>
                    <input 
                        className={`login-input-group__input-box ${ !emailInput?.email?.valid ? "alert" : ""}`}
                        type="text"
                        value={emailInput?.email?.value}
                        onChange={handleEmailChange}
                    ></input>
                    <div className="login-input-group__alert">{emailInput?.email?.alert}</div>
                </div>
                
                <button 
                    className={`primary-button w-[100%] rounded-lg ${!emailInput?.email?.valid ? "disabled" : ""}`} 
                    type="submit"
                    disabled={!emailInput?.email?.valid ? "disabled" : ""}
                >
                    Continue
                </button>
            </form>
            <div className="login-page__choose-line">
                    or
            </div>
            <div className="login-others">
                <div className={`login-others__box ${!allowedMethods.includes("google") ? "disabled" : ""}`} onClick={handleSignUpWithGoogle}>
                    <div className="login-others__icon">
                        <img src="https://img.icons8.com/fluency/48/000000/google-logo.png" className="w-8 h-8 mr-4"/>
                    </div>
                    Sign Up with Google
                </div>
                <div className={`login-others__box ${!allowedMethods.includes("facebook") ? "disabled" : ""}`} onClick={handleSignUpWithFacebook}>
                    <div className="login-others__icon">
                        <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" className="w-8 h-8 mr-4"/>
                    </div>
                    Sign Up with Facebook
                </div>
                <div className={`login-others__box ${!allowedMethods.includes("apple") ? "disabled" : ""}`} onClick={handleSignUpWithApple}>
                    <div className="login-others__icon">
                        <img src="https://img.icons8.com/ios-filled/50/000000/mac-os.png" className="w-8 h-8 mr-4"/>
                    </div>
                    Sign Up with Apple
                </div>
            </div>

            <div className="login-text">
                Already have an account? <span className="login-link" onClick={() => {handlePage("login")}}>Login here</span>
            </div>
            <div className="login-text">
                <Link href="/reset_password"><span className="login-link">Forgot Password?</span></Link>
            </div>
        </div>
    )
}