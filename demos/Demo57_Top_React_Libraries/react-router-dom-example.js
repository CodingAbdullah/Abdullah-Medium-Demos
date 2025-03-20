import './App.css';
import Navbar from './Components/Navbar/Navbar';
import AboutPage from './Components/AboutPage/AboutPage';
import SearchPicturesPage from './Components/SearchPicturesPage/SearchPicturesPage';
import MyPicturesPage from './Components/MyPicturesPage/MyPicturesPage';
import HomePage from './Components/HomePage/HomePage';
import LoginPage from './Components/LoginPage/LoginPage';
import LogoutPage from './Components/LogoutPage/LogoutPage';
import SignupPage from './Components/SignupPage/SignupPage';
import UploadPicturePage from './Components/UploadPicturePage/UploadPicturePage';
import Footer from './Components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPasswordPage from './Components/ForgotPasswordPage/ForgotPasswordPage';

// Custom App page utilizing React-Router for handling page routes for a SPA
const App = () => {
  
  return ( 
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/about" element={<AboutPage />}></Route>
          <Route exact path="/forgot-password" element={<ForgotPasswordPage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/logout" element={<LogoutPage />}></Route>
          <Route exact path="/my-pictures" element={<MyPicturesPage />}></Route>
          <Route exact path="/search-pictures" element={<SearchPicturesPage />}></Route>
          <Route exact path="/signup" element={<SignupPage />}></Route>
          <Route exact path="/upload-pictures" element={<UploadPicturePage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;