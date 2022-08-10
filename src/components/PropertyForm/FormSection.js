export default function FormSection (props) {
    const { title, children } = props
    return (
        <div className="property-form__section">
            <div className="property-form__section__title">
                {title}
            </div>
            {children}
        </div>
    )
}