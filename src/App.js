import './App.css';
import { Route, Routes } from 'react-router-dom';
import ClientDashboard from './Pages/Dashboard/ClientDashboard';
import UserProfile from './Pages/Dashboard/UserProfile';
import LeaderBoard from './Pages/Dashboard/LeaderBoard';
import Goal from './Pages/Dashboard/Goal';
import RequireManager from './Pages/Dashboard/RequireManager/RequireManager';
import AddTask from './Pages/Dashboard/Task/AddTask';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ClientDashboard></ClientDashboard>}>
        <Route index element={<UserProfile></UserProfile>}></Route>
          <Route path="leaderboard" element={<LeaderBoard></LeaderBoard>}></Route>
          <Route path="addtask" element={<RequireManager><AddTask/></RequireManager>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
