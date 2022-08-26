import ReactModal from 'react-modal';
// import { app, db } from '../../../firebase/firebaseConfig'
// import { ref, child, push, set} from "firebase/database"
import Cookies from 'universal-cookie'
import { useState } from 'react';
import validator from 'validator'

export default function OptInModal(props) {
    const [validEmail, setValidEmail] = useState(false)

    const handleOptInSubmit = async function (e) {
        e.preventDefault()
        const email = e.target.parentNode.querySelector('#email').value

        // const newMailRef = push(child(ref(db), 'mails'))
        // set(newMailRef, {
        //     email,
        //     optedIn: true
        // })

        const response = await fetch('/api/user/optIn', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })

        const result = await response.json()
        if (result.success) {
            const cookies = new Cookies()
            cookies.set('opted-in', true, { path: '/'})
        }
        props.handleCloseOption()
    }

    const handleValidEmail = function (e) {
        const email = e.target.value
        setValidEmail(validator.isEmail(email))
    }
    return (
        <ReactModal
            isOpen={!props.optedIn}
            onRequestClose={props.handleCloseOption}
            contentLabel="Subsribe Email"    
            closeTimeoutMS={200}
            className="modal"
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                }
            }}
        >
            <div className="modal__title">
                Find a new home that suits you!
            </div>
            <div className="modal__body">
                Subsribe and get a newest info right into your inbox!

                <form className="modal__form">
                    <input type="email" id="email" name="email" placeholder="Your Email" className="modal__form__input" onChange={handleValidEmail}></input>
                    <button type="submit" className="modal__form__button" onClick={handleOptInSubmit} disabled={!validEmail}>Submit</button>
                </form>
            </div>
        </ReactModal>
    )

}