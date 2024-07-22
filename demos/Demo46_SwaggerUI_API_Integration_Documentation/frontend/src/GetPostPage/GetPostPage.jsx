import { useQuery } from "@tanstack/react-query";
import { getPost } from "../UtilFunctions/Posts";
import Alert from "../Alert/Alert";

const GetPostPage = () => {
    const postQuery = useQuery({ queryKey: ['post'], queryFn: getPost });
    
    if (postQuery.isLoading || postQuery.isFetching) {
        return <div>Loading...</div>
    }
    else if (postQuery.isError || postQuery.error) {
        return (
            <div>
                <h1 style={{ marginTop: '1rem' }}>Get Post Page</h1> 
                <Alert type="warning" />
            </div>
        )
    }
    else if (postQuery.isSuccess || postQuery.data || postQuery.isFetched) {
        // Dynamically rendering posts
        return (
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width:'50%' }}>
                <h1 style={{ marginTop: '1rem' }}>Get Post Page</h1>
                <p><i>Below are all posts currently within the database with their associated IDs</i></p>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Post</th>
                    </tr>
                    {
                        Object.keys(postQuery.data).map(post => {
                            return (
                                <tr key={ post }>
                                    <td style={{ padding: '2rem' }}><code>{ post }</code></td>
                                    <td style={{ padding: '2rem' }}><code>{ postQuery.data[post] }</code></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        )
    }
    else {
        return <div>Loading...</div>
    }
}

export default GetPostPage;