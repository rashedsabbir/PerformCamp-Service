import './App.css';
import { Route, Routes } from 'react-router-dom';
import ClientDashboard from './Pages/Dashboard/ClientDashboard';
import UserProfile from './Pages/Dashboard/UserProfile';
import LeaderBoard from './Pages/Dashboard/LeaderBoard';
import AddTask from './Pages/Dashboard/Task/AddTask';
import Goal from './Pages/Dashboard/Goal';
import RequireManager from './Pages/Dashboard/RequireManager/RequireManager';
import AddEmployee from './Pages/Dashboard/AddEmployee';
import MakeAdmin from './Pages/Dashboard/MakeAdmin/MakeAdmin';
import Tasks from './Pages/Dashboard/Task/TaskList';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ClientDashboard></ClientDashboard>}>
        <Route index element={<UserProfile></UserProfile>}></Route>
          <Route path="leaderboard" element={<LeaderBoard></LeaderBoard>}></Route>
          <Route path="goal" element={<Goal></Goal>}></Route>

          <Route path="add-task" element={<RequireManager><AddTask/></RequireManager>}></Route>
          <Route path="add-employee" element={<RequireManager><AddEmployee/></RequireManager>}></Route>
          <Route path="makeManager" element={<RequireManager><MakeAdmin/></RequireManager>}></Route>
          <Route path="taskList" element={<RequireManager><Tasks/></RequireManager>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
