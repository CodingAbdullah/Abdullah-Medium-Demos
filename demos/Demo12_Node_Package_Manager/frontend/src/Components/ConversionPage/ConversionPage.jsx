import { useState, useRef } from 'react';
import ConversionSelector from '../ConversionSelector/ConversionSelector';
import axios from 'axios';
import Alert from '../Alert/Alert';

// Setting up conversion options
const ConversionPage = () => {
    const [conversionSelection, updateConversionSelection] = useState("dec-bin");
    const [conversionValue, updateConversionValue] = useState("");
    const [isError, updateError] = useState(false);
    const [isSuccess, updateSuccess] = useState(false);

    const decimalValue = useRef();
    const binaryValue = useRef();
    const hexaDecimalValue = useRef();

    const conversionSelector = (e) => {
        // Update state of selection
        updateError(false);
        updateSuccess(false);
        updateConversionSelection(e.target.value);
    }

    const conversionFormHandler = (e) => {
        e.preventDefault(); // Prevent page refreshing

        // Setting options for request
        let options = {
            method: 'POST',
            body: conversionSelection.split("-")[0] === 'dec' ? JSON.stringify({ dec: decimalValue.current.value }) :
                ( conversionSelection.split("-")[0] === 'bin' ? JSON.stringify({ bin: binaryValue.current.value }) :
                JSON.stringify({ hex: hexaDecimalValue.current.value }) ),
            headers : {
                'content-type' : 'application/json'
            }
        }

        // Make request to specific URL based on conversion selection
        if (conversionSelection === 'dec-bin') {
            axios.post("http://localhost:5000/dec-bin-conversion", options)
            .then(response => {
                updateConversionValue(response.data.value);
                updateSuccess(true);
                updateError(false);
            })
            .catch(() => {
                updateError(true);
                updateSuccess(false);
            });
        }
        else if (conversionSelection === 'dec-hex') {
            axios.post("http://localhost:5000/dec-hex-conversion", options)
            .then(response => {
                updateConversionValue(response.data.value);
                updateSuccess(true);
                updateError(false);
            })
            .catch(() => {
                updateError(true);
                updateSuccess(false);
            });
        }
        else if (conversionSelection === 'bin-dec') {
            axios.post("http://localhost:5000/bin-dec-conversion", options)
            .then(response => {
                updateConversionValue(response.data.value);
                updateSuccess(true);
                updateError(false);
            })
            .catch(() => {
                updateError(true);
                updateSuccess(false);
            });
        }
        else if (conversionSelection === 'bin-hex') {
            axios.post("http://localhost:5000/bin-hex-conversion", options)
            .then(response => {
                updateConversionValue(response.data.value);
                updateSuccess(true);
                updateError(false);
            })
            .catch(() => {
                updateError(true);
                updateSuccess(false);
            });
        }
        else if (conversionSelection === 'hex-bin') {
            axios.post("http://localhost:5000/hex-bin-conversion", options)
            .then(response => {
                updateConversionValue(response.data.value);
                updateSuccess(true);
                updateError(false);
            })
            .catch(() => {
                updateError(true);
                updateSuccess(false);
            });
        }
        else if (conversionSelection === 'hex-dec') {
            axios.post("http://localhost:5000/hex-dec-conversion", options)
            .then(response => {
                updateConversionValue(response.data.value);
                updateSuccess(true);
                updateError(false);
            })
            .catch(() => {
                updateError(true);
                updateSuccess(false);
            });
        }
    }

    // Conditionally render the form based on selection 
    if (conversionSelection === 'dec-bin') {
        return (
            <div className='decimal-binary-form'>
                <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Number Converter Form</h1>
                { isError ? <Alert type="ERR" /> : 
                    ( isSuccess ? <Alert /> : null )
                }
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
                    onSubmit={ conversionFormHandler }>
                    <div className="mb-3">
                        <label className="form-label">Decimal Value</label>
                        <input ref={ decimalValue } type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Binary Value</label>
                        <input disabled type="number" 
                            value={ isError ? "" : conversionValue } 
                            className="form-control" />
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
                { isError ? <Alert type="ERR" /> : 
                    ( isSuccess ? <Alert /> : null )
                }
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
                    onSubmit={ conversionFormHandler }>
                    <div className="mb-3">
                        <label className="form-label">Decimal Value</label>
                        <input ref={ decimalValue } type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hexadecimal Value</label>
                        <input disabled type="text" 
                            value={ isError ? "" : conversionValue } 
                            className="form-control" />
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
                { isError ? <Alert type="ERR" /> : 
                    ( isSuccess ? <Alert /> : null )
                }
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
                    onSubmit={ conversionFormHandler }>
                    <div className="mb-3">
                        <label className="form-label">Binary Value</label>
                        <input ref={ binaryValue } type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Decimal Value</label>
                        <input disabled type="number" 
                            value={ isError ? "" : conversionValue } 
                            className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    else if (conversionSelection === 'bin-hex'){
        return (
            <div className='binary-hexadecimal-form'>
                <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Number Converter Form</h1>
                { isError ? <Alert type="ERR" /> : 
                    ( isSuccess ? <Alert /> : null )
                }
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
                    onSubmit={ conversionFormHandler }>
                    <div className="mb-3">
                        <label className="form-label">Binary Value</label>
                        <input ref={ binaryValue } type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hexadecimal Value</label>
                        <input disabled type="text"
                            value={ isError ? "" : conversionValue } 
                            className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    else if (conversionSelection === 'hex-bin'){
        return (
            <div className='hexadecimal-binary-form'>
                <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Number Converter Form</h1>
                { isError ? <Alert type="ERR" /> : 
                    ( isSuccess ? <Alert /> : null )
                }
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
                    onSubmit={ conversionFormHandler }>
                    <div className="mb-3">
                        <label className="form-label">Hexadecimal Value</label>
                        <input ref={ hexaDecimalValue } type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Binary Value</label>
                        <input disabled type="number" 
                            value={ isError ? "" : conversionValue } 
                            className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    else if (conversionSelection === 'hex-dec'){
        return (
            <div className='hexadecimal-binary-form'>
                <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>Number Converter Form</h1>
                { isError ? <Alert type="ERR" /> : 
                    ( isSuccess ? <Alert /> : null )
                }
                <ConversionSelector conversionSelector={ conversionSelector } />
                <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
                    onSubmit={ conversionFormHandler }>
                    <div className="mb-3">
                        <label className="form-label">Hexadecimal Value</label>
                        <input ref={ hexaDecimalValue } type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Decimal Value</label>
                        <input disabled type="number" 
                            value={ isError ? "" : conversionValue } 
                            className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default ConversionPage;