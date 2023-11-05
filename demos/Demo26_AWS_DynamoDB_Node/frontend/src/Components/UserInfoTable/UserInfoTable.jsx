const UserInfoTable = (props) => {
    const { users } = props;

    // Creating a dynamic table to detail every User stored in the database
    return (
        <div className='user-info-table'>
            <table class="table">
                <thead>
                    <tr>
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
                            const { firstName, lastName, emailAddress, dateCreated, dateUpdated } = user;
                            
                            return (
                                <tr>
                                    <th scope="row">{ firstName.S }</th>
                                    <th scope="row">{ lastName.S }</th>
                                    <th scope="row">{ emailAddress.S }</th>
                                    <th scope="row">{ dateCreated?.S.split("T")[0] + ' - ' + dateCreated?.S.split("T")[1].split("Z")[0].split(".")[0] }</th>
                                    <th scope="row">{ dateUpdated?.S.split("T")[0] + ' - ' + dateUpdated?.S.split("T")[1].split("Z")[0].split(".")[0] }</th>

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