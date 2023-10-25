const UserInfoTable = (props) => {
    const { users } = props;

    // Creating a dynamic table to detail every User stored in the database
    return (
        <div className='user-info-table'>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Date Created</th>
                        <th scope="col">Date Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Dynamically render data into the table
                        users.map(user => {
                            return (
                                <tr>
                                    <th scope="row">{ user.ID }</th>
                                    <th scope="row">{ user.firstName }</th>
                                    <th scope="row">{ user.lastName }</th>
                                    <th scope="row">{ user.emailAddress }</th>
                                    <th scope="row">{ user.dateCreated }</th>
                                    <th scope="row">{ user.dateModified }</th>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default UserInfoTable;