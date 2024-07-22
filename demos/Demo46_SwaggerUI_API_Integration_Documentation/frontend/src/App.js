import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import HomePage from './HomePage/HomePage';
import DeletePostPage from './DeletePostPage/DeletePostPage';
import GetPostPage from './GetPostPage/GetPostPage';
import InsertPostPage from './InsertPostPage/InsertPostPage';
import UpdatePostPage from './UpdatePostPage/UpdatePostPage';
import Navbar from './Navbar/Navbar';

const App = () => {
  return (
    <QueryClientProvider client={ new QueryClient() }>
      <div className="App">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/delete-post-page" element={<DeletePostPage />} />
            <Route path="/insert-post-page" element={<InsertPostPage />} />
            <Route path="/get-post-page" element={<GetPostPage />} />
            <Route path="/update-post-page" element={<UpdatePostPage />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;