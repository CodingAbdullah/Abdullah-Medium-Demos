const Badge = (props) => {
    const { type, message } = props;
    
    // Bootstrap Badge component wrapped into a custom component for easy display
    return (
        <span className={`badge bg-${ type }`}>
            { message.substring(0, 1).toUpperCase() + message.substring(1) }
        </span>
    )
}

export default Badge;