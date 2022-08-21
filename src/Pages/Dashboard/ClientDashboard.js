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

const ClientDashboard = () => {
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center bg-base-200">
                <Navbar></Navbar>
                {/* <!-- Page content here --> */}               
                <Outlet></Outlet> 
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Dashboard</label>              
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="menu p-4 overflow-y-auto w-80 bg-teal-700 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    
                    <div className="flex flex-col gap-x-4 items-center">
                        
                        <img
                            src={logo}
                            className={`cursor-pointer duration-500 "rotate-[360deg]"
            }`}
                            alt="" />
                        <h1
                            className={`text-white origin-left font-medium text-xl duration-200 "scale-0"
            }`}
                        >
                            Designer
                        </h1>
                    </div>
                    <ul>
                        <li className='text-xl text-gray-50 '><Link to="/"><img src={home1} style={{width:'24px', height:'24px'}} alt="" />Home</Link></li>
                        <li className='text-xl text-gray-50 '><Link to="/add-task"><img src={task} alt="" />Add Task</Link></li>
                        <li className='text-xl text-gray-50 '><Link to="/add-employee"><img src={task} alt="" />Add New Employee</Link></li>
                        <li className='text-xl text-gray-50 '><Link to="/leaderboard"><img src={leaderboard} alt="" />Leaderboard</Link></li>
                        <li className='text-xl text-gray-50 '><Link to="/deadline"><img src={schedule} alt="" />Deadline</Link></li>
                        <li className='text-xl text-gray-50 '><Link to="/review"><img src={search} alt="" />Review</Link></li>
                        <li className='text-xl text-gray-50 '><Link to="/goal"><img src={analytics} alt="" />Goal</Link></li>
                        <li className='text-xl text-gray-50 '><Link to="/feedback"><img src={files} alt="" /> Feedback</Link></li>
                        <li className='text-xl text-gray-50 '><Link to="/management" className='flex'><img src={setting} alt="" />User Management</Link></li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default ClientDashboard;