import { BadgeCoinType } from "../../types/BadgeCoinType";
import { BadgeDataType } from "../../types/BadgeDataType";

// Custom Bootstrap Badge Component
const Badge = ( props: { data : BadgeCoinType | BadgeDataType } ) => {
    // Destructure data
    const { data } = props;
    const { type } = data;

    // Check keys to verify type
    let messageValue = 'message' in data ? data.message : null;
    let dataValue = 'data' in data ? data.data : null;

    // Conditionally render components
    if ( messageValue ) {
        return (
            <span className={`badge text-bg-${type}`}>
                { messageValue.substring(0, 1).toUpperCase() + messageValue.substring(1) }
            </span>
        )
    }
    else {
        return (
            <span className={`badge text-bg-${type}`}>
                { String(dataValue) }
            </span>
        )
    }
}

export default Badge;