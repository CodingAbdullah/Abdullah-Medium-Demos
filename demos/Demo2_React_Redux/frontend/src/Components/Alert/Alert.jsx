const Alert = (props) => {
    let message = "";
    let alertType = props.type;

    switch (alertType) {
        case "warning":
            message = "Invalid Email or password!";
            break;
        default:
            message = "Invalid email or password!";
            break;
    }
    
    return (
        <div className={`alert alert-${alertType}`} role="alert">
            { message }
        </div>
    )
}

export default Alert;