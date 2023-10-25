import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import HomePage from './Components/HomePage/HomePage';
import InsertUserPage from './Components/InsertUserPage/InsertUserPage';
import DeleteUserPage from './Components/DeleteUserPage/DeleteUserPage';
import ReadUserPage from './Components/ReadUserPage/ReadUserPage';
import UpdateUserPage from './Components/UpdateUserPage/UpdateUserPage';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  // Main app component for handling content to be displayed and component page routing, setting Query Client
  let queryClient = new QueryClient();

  return (
    <div className="App">
      <Navbar />
      <QueryClientProvider client={ queryClient }>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path='/insert-user' element={<InsertUserPage />}></Route>
            <Route exact path="/delete-user" element={<DeleteUserPage />}></Route>
            <Route exact path="/read-user" element={<ReadUserPage />}></Route>
            <Route exact path="/update-user" element={<UpdateUserPage />}></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;