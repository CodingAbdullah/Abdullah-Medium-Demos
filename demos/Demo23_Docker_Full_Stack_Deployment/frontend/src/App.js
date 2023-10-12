import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import DockerFetchPage from './Components/DockerFetchPage/DockerFetchPage';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar />      
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/data-fetch" element={<DockerFetchPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;