import { FC, useState } from 'react';

// Test Page Component
const TestPage: FC = () => {
    const [inputData, updateInputData] = useState('');

    return (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} className='test-page'> 
            <h1>Testing Page</h1>
            <p><i>Below are some page elements that can be accessed for the purposes of testing</i></p>
            <form>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={ e => updateInputData(e.target.value) } type="password" className="form-control" />
                </div>
                <button type="submit" onClick={ () => alert("Here is what you provided as input: " + inputData) } className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default TestPage;