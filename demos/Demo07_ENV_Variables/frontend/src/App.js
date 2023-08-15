import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import APIPage from './Components/APIPage/APIPage';

// Incorporating React router to display component
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<APIPage />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;