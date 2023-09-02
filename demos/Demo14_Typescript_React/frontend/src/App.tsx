import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Navbar from './Components/Navbar/Navbar';
import PricePage from './Components/PricePage/PricePage';
import './App.css';

// App component
const App: FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/prices" element={<PricePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
