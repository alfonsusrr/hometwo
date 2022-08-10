export default function ChooseRole (props) {
    const handleChooseRole = props.handleChooseRole
    return (
        <div className="auth-modal__body">
                <div className="my-10 mx-">
                    <div className="text-3xl font-bold">
                        Welcome to HomeTwo
                    </div>
                    <div className="mt-2 font-light text-lg">
                        I want to login as
                    </div>
                </div>
                <div className="">
                    <div className="auth-modal__role-box" onClick={() => {handleChooseRole("owner")}}>
                        <img src="https://static-asset.mamikos.com/assets/bangul/illustrations/login-tenant.svg?version=2.15.0"></img>
                        Home Owner
                    </div>
                    <div className="auth-modal__role-box" onClick={() => {handleChooseRole("customer")}}>
                        <img src="https://static-asset.mamikos.com/assets/bangul/illustrations/login-owner.svg?version=2.15.0"></img>
                        Home Seeker
                    </div>
                </div>
            </div>
    )
}