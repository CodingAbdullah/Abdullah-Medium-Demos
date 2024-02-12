import { ChangeEventHandler } from "react";

// Custom Select component for storing dynamic task IDs
// Map each ID to option
const IDSelector = (props: { ids: Array<string>, idSelector: ChangeEventHandler<HTMLSelectElement> }) => {
    const { ids, idSelector } = props;

    // Check to see the list of IDs present in ID Selector
    if (ids.length === 0) {
        return <div>No IDs to delete</div>
    }
    else {
        return (
            <div className='id-selector-component'>
                <select className="form-select" value={ ids[0] } onChange={ idSelector }>
                    {
                        ids.map(id => {
                            return (
                                <option value={id}>{id}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }
}

export default IDSelector;