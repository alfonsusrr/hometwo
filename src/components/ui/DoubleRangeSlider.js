export default function DoubleRangeSlider (props) {
    const { minValue, maxValue, setMinValue, setMaxValue } = props

    const handleMinValueChange =  function (e) {
        if (e.target.value < maxValue) {
            setMinValue({ value: e.target.value })
        } else {
            e.target.value = maxValue - 10
            setMinValue({ value: e.target.value })
        }
    }

    const handleMaxValueChange = function (e) {
        if (e.target.value > minValue) {
            setMaxValue({ value: e.target.value })
        } else {
            e.target.value = minValue + 10
            setMaxValue({ value: e.target.value })
        }
    }

    return (
        <div className="double-slider">
            <div className="slider">
                <div className="progress" style={{left: `${minValue/100}%`, right: `${100 - maxValue/100}%`}}>
                </div>
            </div>
            <div className="range-input">
                <input type="range" className="range-min" min="10" step="10" max="10000" value={minValue} onChange={handleMinValueChange}></input>
                <input type="range" className="range-max" min="10" step="10" max="10000" value={maxValue} onChange={handleMaxValueChange}></input>
            </div>
        </div>
    )
}
