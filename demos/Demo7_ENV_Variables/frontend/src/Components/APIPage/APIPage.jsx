import { useState, useEffect } from 'react';
import axios from 'axios';

const APIPage = () => {
    const [data, updateData] = useState(null);
    const [err, updateErrCheck] = useState(false);

    // Incorporating a useEffect hook to make API call on component render
    useEffect(() => {
        axios.get('http://localhost:5000/fetch-api-data')
        .then(response => {
            updateData(response.data.information);
            updateErrCheck(false);
        })
        .catch(() => {
            // If error is sent as a response, clear data and display nothing
            updateErrCheck(true);
            updateData(null);
        })
    }, []);

    // Return the data conditionally, using a ternary operator for simplicity
    return (
        <div className="api-page">
            <h1 style={{ marginTop: "2rem" }}>
                Listening to PORT { process.env.REACT_APP_PORT }
            </h1>
            {
                data && !err ?
                    <>
                        <h3 style={{ marginTop: '2rem' }}>
                            Token Name: { data.tokenName }
                        </h3>
                        <h3>
                            USD Price: { Number(data.usdPrice).toPrecision(4) }
                        </h3>
                        <h3>
                            Token Address: { data.tokenAddress }
                        </h3>
                    </>
                : null
            }
        </div>
    )
}

export default APIPage;