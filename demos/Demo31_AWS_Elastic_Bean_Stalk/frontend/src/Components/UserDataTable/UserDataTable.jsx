const UserDataTable = (props) => {
    const { userDatabaseInformation } = props;

    // Passing in fetched data as a prop to map each value into a table component
    return (
        <table style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
               className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Time Created</th>
                    <th scope="col">Date Updated</th>
                    <th scope="col">Time Updated</th>
                </tr>
            </thead>
            <tbody>
                {
                    userDatabaseInformation.map(user => {
                        return (
                            <tr>
                                <th scope="row">{ user.id }</th>
                                <td>{ user.firstName }</td>
                                <td>{ user.lastName }</td>
                                <td>{ user.email }</td>
                                <td>{ user.gender }</td>
                                <td>{ user.createdAt.split("T")[0] }</td>
                                <td>{ user.createdAt.split("T")[1].split(".")[0] }</td>
                                <td>{ user.updatedAt.split("T")[0] }</td>
                                <td>{ user.updatedAt.split("T")[1].split(".")[0] }</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default UserDataTable;