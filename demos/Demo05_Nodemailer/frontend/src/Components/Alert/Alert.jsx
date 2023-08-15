// Wrapping Bootstrap Alert into a custom one within a React component
const Alert = (props) => {
    const { type } = props;
    let message = '';

    switch (type) {
        case "warning-invalid-register":
            message = "Could not register User!";
            break;
        case "success-valid-register":
            message = "User successfully registered!";
            break;
        case "warning-invalid-login":
            message = "Invalid Login!";
            break;
        case "success-valid-login":
            message = "User logged in!";
            break;
        case "warning-invalid-post":
            message = "Post could not be created!";
            break;
        case "success-valid-post":
            message = "Post was created!";
            break;
        case "warning-fetch-post":
            message = "User posts could not be fetched";
            break;
        case "success-fetch-post":
            message = "User posts were fetched successfully!";
            break;        
        case "success-password-reset":
            message = "Password successfully reset!";
            break;        
        case "warning-invalid-reset":
            message = "Password could not be reset successfully!";
            break;
        case "warning-invalid-token":
            message = "Email token could not be sent to this email";
            break;
        case "success-valid-token":
            message = "Email token successfully sent!";
            break;
        default:
            message = "Oops! Something went wrong";
            break;
    }

    let alertType = type.split("-")[0]; // Fetch the first argument for the alertType

    return (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} className={`alert alert-${alertType}`} role="alert">
            { message }
        </div>  
    )
}

export default Alert;