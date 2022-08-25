import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import CompleteTaskModal from './Task/CompleteTaskModal';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [completeTask, setCompleteTask] = useState(null);
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/feedback/${user?.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setFeedbacks(data)
                })
        }
    }, [user]);

    const handleConfirm = ({ task, link, setLink }) => {


        console.log('inside user task', link);
        console.log('feedback', task);
        const pendingTask = {
            title: task.title,
            description: task.description,
            appointee: task.appointeeEmail,
            employeeName: user?.displayName,
            email: task.email,
            deadline: '',
            proof: link

        }

        fetch('http://localhost:5000/pendingReview', {
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
                    toast.success('posted successfully');
                    setLink('');
                }

            })

        fetch(`http://localhost:5000/feedback/${task._id}`, {
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
                    const remaining = feedbacks.filter(f => f._id !== task._id);
                    setFeedbacks(remaining);

                }

            })


    }
    return (
        <div>

            {
                feedbacks.length === 0 ?
                    <div class="xl:w-full  py-2  ">
                        <div class="flex justify-center">
                            <p class="text-2xl text-teal-400 font-bold ">You Have No Feedback</p>
                        </div>
                    </div>
                    :
                    <div class="xl:w-full py-5  ">
                        <div class="flex justify-center">
                            <p class="text-2xl text-teal-400 font-bold ">You have {feedbacks.length} {feedbacks.length > 1 ? 'feedbacks' : 'feedback'}</p>
                        </div>
                    </div>
            }
            <div className='grid grid-cols-1 lg:grid-cols-3 lg:mx-12'>
                {
                    feedbacks.map(feedback => <div class="card w-96 bg-base-100 shadow-xl bg-gradient-to-r from-orange-100 to-slate-200">
                        <div class="card-body">
                            <h2 class="card-title text-blue-400">Title: {feedback.title}</h2>
                            <p>Description: {feedback.description}</p>
                            <p>Deadline: {feedback.deadline}</p>
                            <p className='border-b-2 border-gray-600 text-md'>Assigned By:</p>
                            <p>Name: <span className='text-blue-400'>{feedback.appointeeName}</span></p>
                            <p>Email: <span className='text-blue-400'>{feedback.appointeeEmail}</span></p>
                            <p>Feedback: "{feedback.comment}"</p>
                            <label onClick={() => setCompleteTask(feedback)} for="complete-task-modal" className="btn btn-block btn-primary text-white mt-1">Complete</label>
                        </div>
                    </div>)
                }
            </div>
            {
                completeTask && <CompleteTaskModal
                    task={completeTask}
                    handleConfirm={handleConfirm}>
                </CompleteTaskModal>}
        </div>
    );
};

export default Feedback;