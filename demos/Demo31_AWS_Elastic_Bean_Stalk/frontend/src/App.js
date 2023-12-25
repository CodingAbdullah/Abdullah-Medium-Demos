import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import CreateUserPage from './Components/CreateUserPage/CreateUserPage';
import ReadUserPage from './Components/ReadUserPage/ReadUserPage';
import UpdateUserPage  from './Components/UpdateUserPage/UpdateUserPage';
import DeleteUserPage from './Components/DeleteUserPage/DeleteUserPage';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  return (
    <div className="App">
        <Navbar />
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/create-user" element={<CreateUserPage />}></Route>
            <Route exact path="/read-user" element={<ReadUserPage />}></Route>
            <Route exact path="/update-user" element={<UpdateUserPage />}></Route>
            <Route exact path="/delete-user" element={<DeleteUserPage />}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
