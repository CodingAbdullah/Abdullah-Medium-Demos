// Setting the ToDoListItem component
const ToDoListItem = (props : { itemData: string }) => {
    const { itemData } = props;

    return (
        <div className='to-do-list-item'>
            <p>{ itemData }</p>
        </div>
    )
}

export default ToDoListItem;