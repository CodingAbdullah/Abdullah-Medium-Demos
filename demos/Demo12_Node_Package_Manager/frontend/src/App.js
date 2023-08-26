import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import ConversionPage from './Components/ConversionPage/ConversionPage';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/number-conversion-page" element={<ConversionPage />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;