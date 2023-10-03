import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import MainPage from './Components/MainPage/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/main" exact element={<MainPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
