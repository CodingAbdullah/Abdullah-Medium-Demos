import './App.css';
import HomePage from './Components/HomePage/HomePage';
import Navbar from './Components/Navbar/Navbar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Navbar, HomePage components added to main App component
const App = ()  => {
  let queryClient = new QueryClient(); // Pass in Queryclient to be used anywhere in app

  return (
    <QueryClientProvider client={ queryClient }>
      <div className="App">
        <Navbar />
        <HomePage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
