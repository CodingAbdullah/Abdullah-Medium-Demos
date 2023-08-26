import { useState, useRef } from 'react';
import ConversionSelector from '../ConversionSelector/ConversionSelector';
import axios from 'axios';

// Setting up conversion options
const ConversionPage = () => {
    const [conversionSelection, updateConversionSelection] = useState("dec-bin");
    const decimalValue = useRef();
    const binaryValue = useRef();
    const hexaDecimalValue = useRef();

    const conversionSelector = (e) => {
        // Update state of selection
        updateConversionSelection(e.target.value);
    }

    // Conditionally render the form based on selection 
    if (conversionSelection === 'dec-bin') {
        return (
            <div className='decimal-binary-form'>
                <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Number Converter Form</h1>
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                    <div className="mb-3">
                        <label className="form-label">Decimal Value</label>
                        <input ref={ decimalValue } type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Binary Value</label>
                        <input disabled type="number" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    else if (conversionSelection === 'dec-hex'){
        return (
            <div className='decimal-hexadecimal-form'>
                <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Number Converter Form</h1>
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                    <div className="mb-3">
                        <label className="form-label">Decimal Value</label>
                        <input ref={ decimalValue } type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hexadecimal Value</label>
                        <input disabled type="text" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    else if (conversionSelection === 'bin-dec'){
        return (
            <div className='binary-decimal-form'>
                <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Number Converter Form</h1>
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                    <div className="mb-3">
                        <label className="form-label">Binary Value</label>
                        <input ref={ binaryValue } type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Decimal Value</label>
                        <input disabled type="number" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    else if (conversionSelection === 'bin-hex'){
        return (
            <div className='decimal-binary-form'>
                <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Number Converter Form</h1>
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                    <div className="mb-3">
                        <label className="form-label">Binary Value</label>
                        <input ref={ binaryValue } type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hexadecimal Value</label>
                        <input disabled type="text" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    else if (conversionSelection === 'hex-bin'){
        return (
            <div className='decimal-binary-form'>
                <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Number Converter Form</h1>
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                    <div className="mb-3">
                        <label className="form-label">Hexadecimal Value</label>
                        <input ref={ hexaDecimalValue } type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Binary Value</label>
                        <input disabled type="number" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    else if (conversionSelection === 'hex-dec'){
        return (
            <div className='decimal-binary-form'>
                <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Number Converter Form</h1>
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                    <div className="mb-3">
                        <label className="form-label">Hexadecimal Value</label>
                        <input ref={ hexaDecimalValue } type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Decimal Value</label>
                        <input disabled type="number" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default ConversionPage;