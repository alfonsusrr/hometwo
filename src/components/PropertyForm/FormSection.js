export default function FormSection (props) {
    const { title, children, id } = props
    return (
        <div className="property-form__section" id={id}>
            <div className="property-form__section__title">
                {title}
            </div>
            {children}
        </div>
    )
}