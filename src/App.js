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
import Login from './Pages/Login/Login';
import SignUp from './Pages/Signup/SignUp';
import RequireAuth from './Pages/Dashboard/RequireAuth/RequireAuth';
import NotFound from './Pages/NotFound/NotFound';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './Pages/Dashboard/Task/TaskList';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>


        <Route path='/' element={<RequireAuth><ClientDashboard></ClientDashboard></RequireAuth>}>
          <Route index element={<RequireAuth><UserProfile></UserProfile></RequireAuth>}></Route>
          <Route path='user-profile' element={<RequireAuth><UserProfile /></RequireAuth>}></Route>
          <Route path="leaderboard" element={<RequireAuth><LeaderBoard></LeaderBoard></RequireAuth>}></Route>
          <Route path="goal" element={<RequireAuth><Goal></Goal></RequireAuth>}></Route>

          <Route path="add-task" element={<RequireManager><AddTask /></RequireManager>}></Route>
          <Route path="add-employee" element={<RequireManager><AddEmployee /></RequireManager>}></Route>
          <Route path="makeManager" element={<RequireManager><MakeAdmin /></RequireManager>}></Route>
          <Route path="taskList" element={<RequireManager><TaskList /></RequireManager>}></Route>
          <Route path="managerReview" element={<RequireManager><ManagerReview /></RequireManager>}></Route>

          <Route path="user-task" element={<RequireAuth><UserTask /></RequireAuth>}></Route>
          <Route path="employeeReview" element={<RequireAuth><EmployeeReview /></RequireAuth>}></Route>


          <Route path="feedback" element={<RequireAuth><Feedback /></RequireAuth>}></Route>
          <Route path="deadline" element={<RequireAuth><Deadline /></RequireAuth>}></Route>
        </Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
