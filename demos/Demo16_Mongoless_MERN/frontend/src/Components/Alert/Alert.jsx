const Alert = (props) => {
    const { type } = props;

    let message = '';
    let alertType = type.split("-")[0];

    // Set data to be presented inside alert
    switch (type) {
        case "warning-not-found":
            message = "User(s) do not exist!";
            break;
        case "warning-user-exists":
            message = "User already exists!";
            break;
        case "danger-operation":
            message = "Could not process information";
            break;
        case "success-operation":
            message = "Successfully completed operation";
            break;
        default:
            alertType = 'danger';
            message = "Something went wrong"
            break;
    }
    
    // Return information related to Alert
    return (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem', 
                      marginBottom: '2rem', width: '50%' }} 
             className={`alert alert-${alertType}`} role="alert">
            { message }
        </div>
    )
}

export default Alert;