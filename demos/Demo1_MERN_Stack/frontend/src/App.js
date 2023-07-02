import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  // Hooks are key to React. Here is the useState hook. "use" is the prefix used to define ready-made hooks & custom hooks
  const [postData, updatePostData] = useState(null);

  // Another hook, a useEffect, which runs as soon as the component mounts on the DOM
  // No dependencies in the second argument, an array in the useEffect(function, array), means function runs only once
  useEffect(() => {

    let options = {
      method: 'POST',
      headers : {
        'content-type': 'application/json'
      }
    }

    // We could in theory, just use the FETCH API and do away with a backend, but for the purposes of this demo we will not
    axios.get("http://localhost:5000/get-posts", options)
    .then(response => {
      updatePostData(response.data); // Update post data
    })
    .catch(() => {
      updatePostData(null); // Remove any post information, if request to backend failed
    });
  }, []);

  // Conditionally render the contents of the component, whenever state is modified, the component is re-rendered
  // UseEffect will run on re-render
  if ( postData === null ) {
    return <div>Loading...</div>
  }
  else {
    // On data fetch request success, render the content of the component and information from the PostData state variable
    return (
      <div className="App">
        <h1>Here is Fetched Post Data!</h1>
        <h3>User ID: { postData.data.userId }</h3>
        <h3>ID: { postData.data.id }</h3>
        <h3>Title: { postData.data.title }</h3>
        <h3>Completed: { String(postData.data.completed) }</h3>
      </div>
    );
  }
}

export default App;