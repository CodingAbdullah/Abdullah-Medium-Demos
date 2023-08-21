import './App.css';
import BitcoinDataPage from './Components/BitcoinDataPage/BitcoinDataPage';
import MultipleCoinPage from './Components/MultipleCoinPage/MultipleCoinPage';
import MultiplePostsPage from './Components/MultiplePostsPage/MultiplePostsPage';
import Navbar from './Components/Navbar/Navbar';
import OnePostPage from './Components/OnePostPage/OnePostPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Routers for the application
const App = () => {

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/bitcoin-data-page" element={<BitcoinDataPage />}></Route>
          <Route exact path='/one-post-page' element={<OnePostPage />}></Route>
          <Route exact path='/multiple-coins-page' element={<MultipleCoinPage />}></Route>
          <Route exact path='/multiple-posts-page' element={<MultiplePostsPage />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;