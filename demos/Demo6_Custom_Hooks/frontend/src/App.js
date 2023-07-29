import './App.css';
import useFetch from './hooks/useFetch';

const App = () => {
    // Using a custom hook to fetch data
    const data = useFetch('https://jsonplaceholder.typicode.com/todos/1');
    
    return (
        <div className='App'>
          <h3 style={{ marginTop: '1rem' }}><b>User ID:</b> { data.userId }</h3>
          <h4><b>ID:</b> { data.id }</h4>
          <h4><b>Title:</b> { data.title }</h4>
          <h4><b>Completed:</b> { String(data.completed) }</h4>
        </div>
    )
}

export default App;
