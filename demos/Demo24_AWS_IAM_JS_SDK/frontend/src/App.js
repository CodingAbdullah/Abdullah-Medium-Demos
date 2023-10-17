import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import DeletePicturePage from './Components/DeletePicturePage/DeletePicturePage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path='/delete-photo' element={<DeletePicturePage />}></Route>
          <Route exact path="/upload-photo" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;