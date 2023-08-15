import './App.css';
import CreateUserPage from '../src/Components/CreateUserPage/CreateUserPage';
import DeleteUserPage from './Components/DeleteUserPage/DeleteUserPage';
import HomePage from './Components/HomePage/HomePage';
import LookupUserPage from './Components/LookupUserPage/LookupUserPage';
import Navbar from '../src/Components/Navbar/Navbar';
import Page404 from './Components/Page404/Page404';
import UpdateUserPage from './Components/UpdateUserPage/UpdateUserPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/create-user" element={<CreateUserPage />}/>
          <Route exact path="/delete-user" element={<DeleteUserPage />}/>
          <Route exact path="/lookup-user" element={<LookupUserPage />}/>
          <Route exact path="/update-user" element={<UpdateUserPage />}/>
          <Route exact path="/" element={<HomePage />}/>
          <Route exact path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;