import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import PageTwo from './Components/PageTwo/PageTwo';
import Navbar from './Components/Navbar/Navbar';

// Root file containing all the components
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/page-two" element={<PageTwo />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;