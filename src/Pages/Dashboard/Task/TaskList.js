import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import './TaskList.css'
import UpdateModal from './UpdateTask';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isReload, setIsReload] = useState(false);
    const [user] = useAuthState(auth);


    useEffect(() => {

        if(user){
            fetch(`https://whispering-gorge-29329.herokuapp.com/managerTask/${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log('manger task', data);
                setTasks(data)
            })
        }

    }, [user]);



    return (
        <div>
            <div className="xl:w-full border-b border-gray-300  py-5  ">
                <div className="flex justify-center">
                    <p className="text-2xl text-green-500 font-bold ">Task List</p>
                </div>
            </div>
            <div className='mid-content mt-10 task-background border lg:m-12 text-black shadow-2xl rounded-lg'>            
                <div className='grid lg:grid-cols-3 grid-cols-1 lg:mx-12 gap-6 my-9 mx-6 '>
                    {tasks.map((task) => (
                        <div className="relative bg-white py-6 px-6 my-2 rounded-3xl w-64 shadow-xl">
                            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="mt-8">
                                <p className="text-xl font-semibold my-2">{task?.title}</p>
                                <div className="flex space-x-2 text-gray-400 text-sm">


                                    <p>{task?.description}</p>
                                </div>
                                
                                <div className="border-t-2"></div>

                                <div className="flex  justify-center">
                                    <div className="my-2">

                                        <UpdateModal setIsReload={setIsReload} isReload={isReload} id={task?._id} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default TaskList;