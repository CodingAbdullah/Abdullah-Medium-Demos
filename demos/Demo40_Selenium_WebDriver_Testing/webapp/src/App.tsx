import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import TestPage from './Components/TestPage/TestPage';

// Main App Component
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='test-page' element={<TestPage />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;