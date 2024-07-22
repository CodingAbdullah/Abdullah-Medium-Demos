import { useQuery } from '@tanstack/react-query';
import { getPostIDs } from '../UtilFunctions/PostIDs';

// Incorporating the useQuery hook to fetch post IDs
const PostSelector = (props) => {
    const { postIDChangeHandler } = props;

    const postIDQuery = useQuery({ queryKey: ['post IDs'], queryFn: getPostIDs }); 

    // Conditionally rendering the Post Selector component
    if (postIDQuery.isLoading || postIDQuery.isFetching) {
        return <div>Loading...</div>
    }
    else if (postIDQuery.isError || postIDQuery.error) {
        return <div>Error: Could not fetch post IDs</div>
    }
    else if (postIDQuery.isSuccess || postIDQuery.data || postIDQuery.isFetched) {
        // Dynamically rendering post IDs
        return (
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                <label class="form-label" htmlFor="post-selector">Select a post</label>
                <select class="form-select" id="post-selector" onChange={ postIDChangeHandler }>
                    <option value="---">Select a post</option>
                    {
                        postIDQuery.data.map(postID => {
                            return <option key={ postID } value={ postID }>{ postID }</option>
                        })
                    }
                </select>
            </div>
        )
    }
    else {
        return <div>Loading...</div>
    }
}

export default PostSelector;