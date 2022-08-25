import { Link, Outlet } from 'react-router-dom';
import home1 from '../../Images/Icons/home2.png';
import task from '../../Images/Icons/Chat.png';
import leaderboard from "../../Images/Icons/User.png";
import schedule from "../../Images/Icons/Calendar.png";
import search from "../../Images/Icons/Search.png";
import analytics from "../../Images/Icons/Chart.png";
import files from "../../Images/Icons/Folder.png";
import setting from "../../Images/Icons/Setting.png";
import logo from "../../Images/logo/logo.png";
import Navbar from './Navbar';
import useManager from '../hooks/useManager';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const ClientDashboard = () => {

    const [user] = useAuthState(auth);
    const [manager] = useManager(user);

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content w-full h-full flex flex-col items-center bg-base-200">
                <Navbar></Navbar>
                
                {/* <!-- Page content here --> */}
                <Outlet className=''></Outlet>
                
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="menu p-4 overflow-y-auto w-80 bg-teal-500 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <span class="absolute right-28 my-4 z-10 inline-flex rounded-full h-3 w-3 bg-green-300"></span>
                    <div className="flex flex-col gap-x-4 items-center">
                    
                        <img
                            src={user?.photoURL}
                            className="cursor-pointer mask mask-circle duration-500 hover:transition hover:animation-ping" 
                            alt="" />

                        <div>
                            {
                                manager ? <p className='text-white font-semibold'>Manager</p> : <p className='text-white font-semibold'>Employee</p>
                            }
                        </div>

                        <h1
                            className={`text-white origin-left font-medium text-xl duration-200 "scale-0"
            }`}
                        >
                            {user?.displayName}
                        </h1>
                    </div>
                    <ul>
                        <li className='text-xl text-gray-50 '><Link to="/"><img src={home1} style={{ width: '24px', height: '24px' }} alt="" />Home</Link></li>
                        


                        {
                            manager && <>
                                <li className='text-xl text-gray-50 '><Link to="/add-task"><img src={analytics} alt="" />Give Task to Employee</Link></li>
                                <li className='text-xl text-gray-50 '><Link to="/taskList"><img src={task} alt="" />Tasks</Link></li>
                                <li className='text-xl text-gray-50 '><Link to="/add-employee"><img src={files} alt="" />Add New Employee</Link></li>
                                <li className='text-xl text-gray-50 '><Link to="/makeManager"><img src={leaderboard} alt="" />Make A New Manager</Link></li>
                                <li className='text-xl text-gray-50 '><Link to="/managerReview"><img src={search} alt="" />Review</Link></li>
                            </>
                        }



                        {
                            !manager && <>
                            <li className='text-xl text-gray-50 '><Link to="/goal"><img src={analytics} alt="" />Goal</Link></li>
                             <li className='text-xl text-gray-50 '><Link to="/leaderboard"><img src={leaderboard} alt="" />Leaderboard</Link></li>
                             <li className='text-xl text-gray-50 '><Link to="/deadline"><img src={schedule} alt="" />Deadline</Link></li>
                                <li className='text-xl text-gray-50 '><Link to="/user-task"><img src={task} alt="" />Tasks</Link></li>
                                <li className='text-xl text-gray-50 '><Link to="/feedback"><img src={files} alt="" /> Feedback</Link></li>
                                <li className='text-xl text-gray-50 '><Link to="/employeeReview"><img src={search} alt="" />Review</Link></li>
                            </>
                        }

                    </ul>
                </div>

            </div>
        </div>
    );
};

export default ClientDashboard;