import { faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function SmallCard(props) {
    const {
        title,
        value,
        icon,
        color
    } = props

    const colors = {
        red: {
            dark: "#ef4444",
            light: "#fca5a5"
        },
        green: {
            dark: "#22c55e",
            light: "#bbf7d0"
        },
        yellow: {
            dark: "#facc15",
            light: "#fefce8"
        }, 
        blue: {
            dark: "#06b6d4",
            light: "#a5f3fc"
        }, 
        orange: {
            dark: "#ea580c",
            light: "#fed7aa"
        }
    }
    return (
        <div className="dashboard-card small">
            <div className="dashboard-card__title">
                {title}
            </div>
            <div className="dashboard-card__content">
                <div style={{
                    backgroundColor: colors[color].dark,
                    color: colors[color].light,
                }}
                 className={`dashboard-card__icon`}>
                    <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
                </div>
                <div className="dashboard-card__value">
                    {value}
                </div>
            </div>
        </div>
    )
}