// Setting custom Alert component
// Setting message and alertType attributes to the Alert Custom Component
const Alert = (props: { type: string }) => {
    const { type } = props;
    let message = '';
    let alertType = '';

    switch (type) {
        case "success":
            message = "Successfully performed action!";
            alertType = 'success';
            break;
        case "failure":
            message = "Could not perform action"
            alertType = 'warning';
            break;
    }
    
    return (
        <div style={{ 
            marginLeft: 'auto', 
            marginRight: 'auto', 
            width: '50%' }} className={`alert alert-${alertType}`} role="alert">
            { message }
        </div>
    )
}

export default Alert;