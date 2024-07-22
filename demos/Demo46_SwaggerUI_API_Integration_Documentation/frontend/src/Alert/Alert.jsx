const Alert = (props) => {
    const { type } = props;

    let message = '';

    switch (type) {
        case "success":
            message = 'Request successful!';
            break;
        case "warning":
            message = "Request could not be fulfilled!";
            break;
        default:
            break;
    }

    // Wrapping Bootstrap Alert using custom component
    return (
        <div style={{ marginTop: '2rem', width: '50%', marginLeft: 'auto', marginRight: 'auto' }} 
            className={ `alert alert-${type}` } role="alert">
            { message }
        </div>
    )
}

export default Alert;