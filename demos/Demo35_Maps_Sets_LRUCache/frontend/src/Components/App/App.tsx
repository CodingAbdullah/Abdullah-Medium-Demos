import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Navbar from '../Navbar/Navbar';
import ToDoList from '../ToDoList/ToDoList';
import * as Redux from 'react-redux';
import { store } from '../../redux/store/store';
import './App.css';

// React Router Dom for Navigation and Parent Level Component Structure
const App: FC = () => {
  return (
    <div className="App">
      <Redux.Provider store={store}>
        <Navbar />
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path="/to-list" element={<ToDoList />}></Route>
          </Routes>
        </Router>
      </Redux.Provider>
    </div>
  );
}

export default App;