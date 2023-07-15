// Custom Bootstrap Alert wrapping into a React Component
const Alert = (props) => {
    const { type } = props;
    let message = '';

    let alertType = type.split("-")[0]; // Get the first part of the alert type for colouring

    switch ( type ) {
        case "danger-create-user":
            message = "Cannot create User! Please try again!";
            break;
        case "warning-delete-user":
            message = "Cannot delete user! Please try again!";
            break;
        case "warning-update-user":
            message="Cannot update user! Please try again!";
            break;
        case "warning-read-user":
            message = "Cannot find/read user data! Please try again!"
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