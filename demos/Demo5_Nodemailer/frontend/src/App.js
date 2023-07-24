import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import CreatePostPage from './Components/CreatePostPage/CreatePostPage';
import HomePage from './Components/HomePage/HomePage';
import LoginPage from './Components/LoginPage/LoginPage';
import LogoutPage from './Components/LogoutPage/LogoutPage';
import PasswordResetPage from './Components/PasswordResetPage/PasswordResetPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import ViewPostsPage from './Components/ViewPostsPage/ViewPostsPage';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/create-post" element={<CreatePostPage />}></Route>
          <Route exact path="/login-user" element={<LoginPage />}></Route>
          <Route exact path="/logout-user" element={<LogoutPage />}></Route>
          <Route exact path="/register-user" element={<RegisterPage />}></Route>
          <Route exact path="/reset-password" element={<PasswordResetPage />}></Route>
          <Route exact path="/view-posts" element={<ViewPostsPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;