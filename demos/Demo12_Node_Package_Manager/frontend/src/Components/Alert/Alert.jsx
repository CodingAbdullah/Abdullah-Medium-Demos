const Alert = (props) => {
    const { type } = props;

    // Filtering type of alert to display based on type
    if (type === 'ERR') {
        return (
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
                className="alert alert-danger" role="alert">
                    Error making conversion!! Please try again.
            </div>
        )
    }
    else {
        return (
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
                className="alert alert-success" role="alert">
                    Conversion Successful!!
            </div>
        )
    }
}

export default Alert;