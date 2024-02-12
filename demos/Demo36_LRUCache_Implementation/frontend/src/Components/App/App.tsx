import { FC } from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import HomePage from '../HomePage/HomePage';
import ViewTaskPage from '../ViewTasksPage/ViewTasksPage';
import InsertTaskPage from '../InsertTaskPage/InsertTaskPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeleteTaskPage from '../DeleteTaskPage/DeleteTaskPage';
import UpdateTaskPage from '../UpdateTaskPage/UpdateTaskPage';

// Setting parent component to be mounted
// Wrapping parent component using QueryClientProvider
const App: FC = () => {
  let queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={ queryClient }>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path='/delete-task' element={<DeleteTaskPage />}></Route>
            <Route path="/insert-task" element={<InsertTaskPage />}></Route>
            <Route path="/update-task" element={<UpdateTaskPage />}></Route>
            <Route path="/view-tasks" element={<ViewTaskPage />}></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;