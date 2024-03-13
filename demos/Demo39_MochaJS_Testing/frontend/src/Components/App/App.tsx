import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Navbar from '../Navbar/Navbar';
import SearchPage from '../SearchPage/SearchPage';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;