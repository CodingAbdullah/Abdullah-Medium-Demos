import { FC, useState } from 'react';

const SearchPage: FC = () => {
    const [searchData, updateSearchData] = useState<string>('');

    const formHandler = () => {
        alert("Searching for: " + searchData);
    }

    return (
        <form style={{ marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} onSubmit={ formHandler }>
            <div className='search-page'>
                <div className="form-group">
                    <h3>Search Form</h3>
                    <p><i>Testing application search functionality</i></p>
                    <input onChange={ e => updateSearchData(e.target.value) } type="text" className="form-control" placeholder="Search" />
                </div>
                <button style={{ marginTop: '1rem' }} type="submit" className="btn btn-success">Submit</button>
            </div>
        </form>
    )
}

export default SearchPage;