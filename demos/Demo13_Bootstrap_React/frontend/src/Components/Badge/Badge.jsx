const Badge = (props) => {
    const { type, message } = props;

    // Bootstrap Badge component wrapped into a custom component for easy display
    return (
        <span className={`badge bg-${ type }`}>
            { message }
        </span>
    )
}

export default Badge;