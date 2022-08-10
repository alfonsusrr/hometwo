export default function FormItem (props) {
    const {title, description, children} = props
    return (
        <div className="property-form__section__items">
            <div className="property-form__section__item">
                <div className="property-form-item__label">
                    <div className="">
                        {title}
                    </div>
                    <div className="text-gray-400 text-sm">
                        {description}
                    </div>
                </div>
                <div className="property-form-item__input">
                    {children}
                </div>
            </div>
        </div>
    )
}