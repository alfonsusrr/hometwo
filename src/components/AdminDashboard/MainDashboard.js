import { faMagnifyingGlassDollar, faMoneyBill, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import SmallCard from "../ui/DashboardCard/SmallCard"

export default function MainDashboard() {
    const authInfo = useSelector((state) => state.admin)
    return (
        <div>
            <div>
                <div className="text-2xl font-bold">
                    Hello, <span className="font-semibold">{authInfo?.user?.name}</span>
                </div>
                <div className="text-xl font-light">
                    Welcome back! Here are some statistics for you
                </div>
            </div>
            <div className="dashboard-section">
                <div className="dashboard-section__title">
                    Analytics Dashboard 
                </div>
                <div className="flex items-center gap-2">
                    <SmallCard title="Sales Weekly" value="21" color="red" icon={faMagnifyingGlassDollar}></SmallCard>
                    <SmallCard title="Revenue Weekly" value="$ 1,500" color="green" icon={faMoneyBill}></SmallCard>
                    <SmallCard title="Visitor Weekly" value="1,391" color="orange" icon={faUsers}></SmallCard>
                    <SmallCard title="New User Weekly" value="219" color="blue" icon={faUser}></SmallCard>
                </div>
            </div>
        </div>
    )
}