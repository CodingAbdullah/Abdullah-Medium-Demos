import { FC } from 'react';

// Custom Bootstrap Alert
const Alert: FC = () => {

    return (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
             className="alert alert-success" role="alert">
            Successful Data Fetch!   
        </div>
    )
}

export default Alert;