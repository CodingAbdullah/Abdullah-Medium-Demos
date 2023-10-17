const Alert = (props) => {
    const { type } = props;

    let message = '';

    switch (type) {
        case "success-upload":
            message = 'Photo uploaded successfully';
            break;
        case "danger-upload":
            message = "Could not upload photo!";
            break;
        case 'success-delete':
            message = 'Photo deleted successfully';
            break;
        case 'danger-delete':
            message = 'Photo could not be deleted';
            break;
        default:
            break;
    }

    // Wrapping Bootstrap Alert using custom component
    return (
        <div style={{ marginTop: '2rem' }} className={`alert alert-${type}`} role="alert">
            { message }
        </div>
    )
}

export default Alert;