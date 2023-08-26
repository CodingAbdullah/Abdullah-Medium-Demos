// Conversion Selector Component
const ConversionSelector = (props) => {
    // bin-dec, bin-hex, dec-bin, dec-hex, hex-bin, hex-dec
    return (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%', marginBottom: '2rem' }} 
            className='conversion-selector'>
            <label>Conversion Selector:</label>
            <select className="form-select" onChange={ props.conversionSelector }>
                <option name="conversion-selection" selected value="dec-bin">Decimal-Binary</option>
                <option name="conversion-selection" value="dec-hex">Decimal-Hexadecimal</option>
                <option name="conversion-selection" value="bin-dec">Binary-Decimal</option>
                <option name="conversion-selection" value="bin-hex">Binary-Hexadecimal</option>
                <option name="conversion-selection" value="hex-bin">Hexadecimal-Binary</option>
                <option name="conversion-selection" value="hex-dec">Hexadecimal-Decimal</option>
            </select>
        </div>
    )
}

export default ConversionSelector