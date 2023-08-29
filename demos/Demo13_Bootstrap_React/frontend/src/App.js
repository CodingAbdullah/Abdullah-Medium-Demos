import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import PricePage from './Components/PricePage/PricePage';
import Navbar from './Components/Navbar/Navbar';

// Custom Components for Demo: Navbar, Button, Form, Alert, Badges, Cards
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/prices" element={<PricePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;