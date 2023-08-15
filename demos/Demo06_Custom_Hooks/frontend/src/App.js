import './App.css';
import useFetch from './hooks/useFetch';
import { useNavigate } from 'react-router';

const App = () => {
    // Using a custom hook to fetch data
    const data = useFetch('https://jsonplaceholder.typicode.com/todos/1');
    const navigate = useNavigate();

    return (
        <div className='App'>
          <h3 style={{ marginTop: '1rem' }}><b>User ID:</b> { data.userId }</h3>
          <h4><b>ID:</b> { data.id }</h4>
          <h4><b>Title:</b> { data.title }</h4>
          <h4><b>Completed:</b> { String(data.completed) }</h4>
          <button style={{ marginTop: '1rem' }} onClick={() => navigate("/alternative-page")} className="btn btn-success">
            Go Next
          </button>
        </div>
    )
}

export default App;
