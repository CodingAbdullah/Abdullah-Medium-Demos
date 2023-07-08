import './App.css';
import ContentPage from '../ContentPage/ContentPage';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import Navbar from '../Navbar/Navbar';
import WelcomePage from '../WelcomePage/WelcomePage';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../../redux/store/store';
import { Provider } from 'react-redux';
import LogoutPage from '../LogoutPage/LogoutPage';

const App = () => {
  // Wrapping global redux store using a Provider
  // Wrapping React Router to components, switching pages on routes, you can see Navbar is independent of Router Wrapper
  return (
    <div className="App">
      <Provider store={ store }>
        <Navbar />
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/content" element={<ContentPage />}></Route>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route exact path="/logout" element={<LogoutPage />}></Route>
            <Route exact path="/welcome" element={<WelcomePage />}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;