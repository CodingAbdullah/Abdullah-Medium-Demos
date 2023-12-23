import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import DeletePicturePage from './Components/DeletePicturePage/DeletePicturePage';
import Navbar from './Components/Navbar/Navbar';
import UploadPicturePage from './Components/UploadPicturePage/UploadPicturePage';

// Root file containing all the components
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path='/delete-photo' element={<DeletePicturePage />}></Route>
          <Route exact path="/upload-photo" element={<UploadPicturePage />}></Route>
          <Route exact path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;