import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import PageTwo from './Components/PageTwo/PageTwo';
import Navbar from './Components/Navbar/Navbar';

const App = () => {

  // Main app component for handling content to be displayed and component page routing
  return (
    <div className="App">
      <Navbar />
        <HashRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path='/page-two' element={<PageTwo />}></Route>
          </Routes>
        </HashRouter>
    </div>
  );
}

export default App;