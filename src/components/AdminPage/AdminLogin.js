import LoginBox from "./LoginBox"
import Image from "next/image"

export default function AdminLogin() {
    return (
        <div className="admin-login__page">
            <div className="admin-login__container--small">
                <div className="admin-login__banner flex flex-col gap-5 items-center">
                    <div className="admin-login__greetings">
                        <Image src="/images/logo-transparent.png" width="70" height="40"></Image>
                        <div>
                        Welcome Back!
                        </div>
                        <div className="text-2xl font-light">
                            Please login to access admin page 
                        </div>
                    </div>
                    <LoginBox type="small"></LoginBox>                   
                </div>
            </div>
            <div className="admin-login__container--large">
                <LoginBox type="large"></LoginBox>
                <div className="admin-login__banner">
                    <div className="admin-login__greetings">
                        <Image src="/images/logo-transparent.png" width="70" height="40"></Image>
                        <div>
                        Welcome Back!
                        </div>
                        <div className="text-2xl font-light">
                            Please login to access admin page
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}