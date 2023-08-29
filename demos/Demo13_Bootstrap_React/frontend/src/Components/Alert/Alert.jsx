const Alert = () => {

    // Bootstrap Alert component wrapped into a custom component for easy display
    return (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
            className="alert alert-success" role="alert">
            Data Requested is now available!!
        </div>
    )
}

export default Alert;