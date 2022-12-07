import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import CompleteTaskModal from './CompleteTaskModal';
import DetailsTaskModal from './DetailsTaskModal';

const UserTask = () => {
    const [tasks, setTasks] = useState([]);
    const [detailsTask, setDetailsTask] = useState(null);
    const [completeTask, setCompleteTask] = useState(null);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            fetch(`https://web-production-9e42.up.railway.app/task/${user?.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('user task', data);
                    setTasks(data)
                })
        }
    }, [user]);

    const handleConfirm = ({ task, link, handleInputField }) => {

        console.log('inside user task', link);
        const pendingTask = {
            title: task.title,
            description: task.description,
            appointee: task.appointee,
            employeeName: task.employeeName,
            employeeImage: user?.photoURL,
            email: task.email,
            deadline: task.deadline,
            proof: link

        }

        fetch('https://web-production-9e42.up.railway.app/pendingReview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(pendingTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {

                }

            })

        fetch(`https://web-production-9e42.up.railway.app/task/${task._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success(`task: ${task._id} is deleted`);
                    const remaining = tasks.filter(t => t._id !== task._id);
                    setTasks(remaining);

                }
            })

        handleInputField();
    }



    return (
        <div>
            <div>
                {
                    tasks.length === 0 ? <>
                        <div className="  py-5  ">
                            <div className="flex justify-center">
                                <p className="text-2xl text-teal-400  font-bold ">You Have No Task</p>
                            </div>
                        </div>
                    </>
                        :

                        <>
                            <div className=" py-5  ">
                                <div className="flex justify-center">
                                    <p className="text-2xl text-teal-400  font-bold ">You have {tasks.length} {tasks.length > 1 ? 'tasks' : 'task'}</p>
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-1 ">
                                    <div className=" overflow-x-auto ">
                                        <div className="py-2 align-middle inline-block  ">
                                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <table className="min-w-full text-center divide-y divide-gray-200">
                                                    <thead className="bg-gray-50 font-bold">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Serial
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Title
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Deadline
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Appointee
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Action
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {
                                                            tasks.map((task, index) => {
                                                                return (
                                                                    <tr key={task._id}>
                                                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="">
                                                                                {task.title}
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">{task.deadline}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">{task?.appointee}</div>
                                                                        </td>

                                                                        <td className="px-6 flex gap-4 py-4 whitespace-nowrap text-right text-sm font-medium">

                                                                            <div className='lg:ml-12'>

                                                                                <label onClick={() => setDetailsTask(task)} for="details-task-modal" className="btn btn-primary rounded-xl mx-2 text-white">Details</label>

                                                                                <label onClick={() => setCompleteTask(task)} for="complete-task-modal" className="btn btn-outline btn-error rounded-2xl">Complete</label>

                                                                            </div>

                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }

                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>

            {
                detailsTask && <DetailsTaskModal
                    task={detailsTask}>
                </DetailsTaskModal>}
            {
                completeTask && <CompleteTaskModal
                    task={completeTask}
                    handleConfirm={handleConfirm}>
                </CompleteTaskModal>}

        </div>
    );
};

export default UserTask;