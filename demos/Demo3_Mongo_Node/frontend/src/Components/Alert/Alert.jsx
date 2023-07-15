// Custom Bootstrap Alert wrapping into a React Component
const Alert = (props) => {
    const { type } = props;
    let message = '';

    let alertType = type.split("-")[0]; // Get the first part of the alert type for colouring

    switch ( type ) {
        case "success-create-user":
            message = "Successfully created User!"
            break;
        case "warning-create-user":
            message = "Cannot create User! Please try again!";
            break;
        case "warning-delete-user":
            message = "Cannot delete User! Please try again!";
            break;        
        case "success-delete-user":
            message = "Successfully deleted User!";
            break;
        case "warning-update-user":
            message="Cannot update User! Please try again!";
            break;         
        case "success-update-user":
            message="Successfully updated User!";
            break;      
        case "warning-read-user":
            message = "Cannot find/read User data! Please try again!"
            break;
        default:
            message = "Oops! Looks like something went wrong :("
            break;
    }

    return (
        <div className={`alert alert-${alertType}`} role="alert">
            { message }
        </div>
    )
}

export default Alert;