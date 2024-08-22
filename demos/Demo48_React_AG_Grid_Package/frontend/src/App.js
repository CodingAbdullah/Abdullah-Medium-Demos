import './App.css';
import HomePage from './Components/HomePage/HomePage';
import Navbar from './Components/Navbar/Navbar';
import ReactAgGridChart from './Components/ReactAgGridChart/ReactAgGridChart';
import ReactAgChartTable from './Components/ReactAgGridTable/ReactAgGridTable';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Navbar, HomePage, Ag Chart, Ag Table components added to main App component
const App = ()  => {
  let queryClient = new QueryClient(); // Pass in Queryclient to be used anywhere in app

  return (
    <QueryClientProvider client={ queryClient }>
      <div className="App">
        <Navbar />
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/chart' element={<ReactAgGridChart />}></Route>
            <Route path='/table' element={<ReactAgChartTable />}></Route>
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
