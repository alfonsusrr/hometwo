import FormSection from "../FormSection";
import FormItem from "../FormItem";
import { useState, useEffect, forwardRef} from "react";

export default function FormRules (props) {
    const { handleChangeFormInput, formInput, validityFormInput, isAlertOn, id} = props

    const [rulesFetched, setRulesFetched] = useState(false)

    useEffect(() => {
        fetch('/api/lists/rule', {
            method: "GET",
            header: {
                'Content-Type': 'application/json',
        }})
            .then(async (res) => {
                const response = await res.json()
                if (!response.success) {
                    console.log(response.message)
                    return
                }
                const rules = response.data.rules
                const mappedRules = rules.map((f) => {
                    return {
                        id: f._id,
                        label: f.label,
                        value: false
                    }
                })

                if (rules) {
                    setRulesFetched(true)
                    handleChangeFormInput({
                        rules: { 
                            ...formInput.rules,
                            listedRules: [...mappedRules]
                        }
                    })
                }
            })
    }, [])

    return (
        <FormSection title="Rules and Agreement" id={id}>
            <FormItem title="Rules" description="checklist the following rules or give your own rules that client need to obey">
                {
                    formInput.rules.listedRules.map((rule, i) => {
                        return (
                            <div className="grid-checkbox__checkbox-item" key={rule.id}>
                                <div className="grid-checkbox__input">
                                    <input 
                                        id={rule.id} 
                                        type="checkbox" 
                                        value={rule.value}
                                        onChange={(e) => {
                                            let rules = [...formInput.rules.listedRules]
                                            rules[i] = {
                                                ...rules[i],
                                                value: e.target.value === 'true' ? false : true
                                            }

                                            handleChangeFormInput({
                                                rules: {
                                                    ...formInput.rules,
                                                    listedRules: rules
                                                }
                                            })
                                        }}
                                    />
                                </div>
                                <div className="grid-checkbox__label">
                                    {rule.label}
                                </div>
                            </div>
                        )
                    })
                }
            </FormItem>
            <FormItem title="Additional House Rules">
                <textarea 
                    placeholder="e.g., Must keep each belonging in room" 
                    value={formInput.rules.additionalRules}
                    onChange={(e) => {
                        handleChangeFormInput({
                            rules: {
                                ...formInput.rules,
                                additionalRules: e.target.value
                            }
                        })
                    }}
                ></textarea>
            </FormItem>
            <div>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        value={formInput?.rules?.agreement} 
                        className="rounded-md w-4 h-4 cursor-pointer"
                        onChange={(e) => {
                            handleChangeFormInput({
                                rules: {
                                    ...formInput.rules,
                                    agreement: e.target.checked ? true : false
                                }
                            })
                        }}
                    ></input>
                    <div className="property-form__agreement">
                        By submitting, I have read and agree with Hometwo privacy policy and terms of service.
                    </div>
                </div>
                { !validityFormInput?.rules?.agreement && isAlertOn &&
                    <div className="property-form-item__alert" >
                        Please check the button above
                    </div>
                }
            </div>
        </FormSection>
    )
}