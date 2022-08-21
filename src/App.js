import './App.css';
import { Route, Routes } from 'react-router-dom';
import ClientDashboard from './Pages/Dashboard/ClientDashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ClientDashboard></ClientDashboard>}>     
        </Route>
      </Routes>
    </div>
  );
}

export default App;
