import Select from 'react-select'
import Option from './Option'
import MenuList from './MenuList'

export default function FormSelect(props) {
    const { isLoading, isMulti, isDisabled, value, onChange, options, placeholder } = props

    let customStyles = {}
    if (isMulti) {
        customStyles={
            valueContainer: (provided) => ({
                ...provided,
                maxWidth: 'fit-content'
            })
        }
    }
    return (
        <Select 
            isLoading={isLoading}
            isMulti={isMulti}
            isDisabled={isDisabled}
            isClearable={true}
            ignoreAccents={false}
            value={value}
            onChange={onChange}
            options={options}
            className="property-form__select"
            classNamePrefix="property-form__select"
            placeholder={placeholder}
            styles={customStyles}
            theme={(theme) => ({
                ...theme,
                borderRadius: 10,
                colors: {
                    ...theme.colors,
                    primary: '#fd7300',
                    primary75: '#FFC7AD',
                    primary50: '#FFC7AD',
                    primary25: '#FFC7AD'
                }
            })}
            components={{
                MenuList,
                Option
              }}
        ></Select>
    )
}