import { useQuery } from '@tanstack/react-query';
import { fetchUserData } from '../../utilFunctions/userData';
import UserInfoTable from '../UserInfoTable/UserInfoTable';

const ReadUserPage = () => {
    // Query Functions and React-Query being utilized to optimize data fetching
    let userDataQuery = useQuery({
        queryKey: ['user data'],
        queryFn: fetchUserData
    });

    // Conditionally render data
    if (userDataQuery.isLoading) {
        return <div style={{ marginTop: '2rem' }}>Loading User Data...</div>
    }
    if (userDataQuery.isError){
        return <div style={{ marginTop: '2rem' }}>ERROR: Could not fetch User data!</div>
    }
    if (userDataQuery.isSuccess){
        return (
            <div className='read-user-page'>
                <h1>Current Users</h1>
                <p><i>Following is a table showcasing current registered Users: </i></p>
                <UserInfoTable users={ userDataQuery.data.users } />
            </div>
        )
    }
}

export default ReadUserPage;