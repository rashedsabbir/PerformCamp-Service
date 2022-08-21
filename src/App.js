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
import UserTask from './Pages/Dashboard/Task/UserTask';
import EmployeeReview from './Pages/Dashboard/EmployeeReview';
import ManagerReview from './Pages/Dashboard/ManagerReview';
import Feedback from './Pages/Dashboard/Feedback';
import Deadline from './Pages/Dashboard/Deadline';

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

          <Route path="user-task" element={<UserTask/>}></Route>
          <Route path="employeeReview" element={<EmployeeReview></EmployeeReview>}></Route>
          <Route path="managerReview" element={<ManagerReview></ManagerReview>}></Route>
          <Route path="feedback" element={<Feedback></Feedback>}></Route>
          <Route path="deadline" element={<Deadline></Deadline>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
