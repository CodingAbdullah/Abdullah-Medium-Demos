// Wrapping Bootstrap Alert into custom component

const Alert = (props) => {
    const { type } = props;

    // Setting up an empty message to be displayed correctly according to alert
    let message = '';

    switch (type) {
        case "danger-insertUser":
            message = "Could not insert User! It exists!";
            break;
        case "success-insertUser":
            message = "User signed up successfully!";
            break;
        case "danger-updateUser":
            message = "Could not update User information!";
            break;
        case "success-updateUser":
            message = "User updated successfully!";
            break;
        case "success-deleteUser":
            message = "User deleted successfully!";
            break;
        case "danger-deleteUser":
            message = "User could not be deleted!";
            break;
        default:
            message = "Oops! Something went wrong!";
            break;
    }

    // Wrapping Bootstrap Alert component into a custom component
    return (
        <div style={{ marginTop: '2rem' }} className={`alert alert-${ type.split("-")[0] }`} role="alert">
            { message }
        </div>
    )
}

export default Alert;