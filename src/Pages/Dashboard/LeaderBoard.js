import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const LeaderBoard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [user] = useAuthState(auth);

    

    useEffect(() => {
        if (user) {
            fetch(`https://whispering-gorge-29329.herokuapp.com/leaderboard`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('reviews from leaderboard', data);
                    setLeaderboard(data)
                })
        }
    }, [user]);

    leaderboard.sort((a, b) => b.ratings - a.ratings);

    return (
        <div className='h-10/12 w-10/12 '>
            <h1 className='text-3xl font-bold text-primary text-center py-8'>LeaderBoard</h1>

            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Rank</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Name</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Completed Task</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Total Rating</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        leaderboard.map((review, index) => <>

                            <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Rank</span>
                                    <span className="rounded bg-gray-300 py-1 px-3 text-xs font-bold">{index + 1}</span>
                                </td>
                                <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Name</span>
                                    <div className='flex lg:justify-start justify-center items-center'>
                                    <img referrerPolicy="no-referrer"
                                        className="h-8 w-8 rounded-full mr-4"
                                        referrerpolicy="no-referrer"
                                        src={review.employeeImage}
                                        alt=""
                                    />
                                    <span>{review?.employeeName}</span>
                                    </div>
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Completed Task</span>
                                    <span>{review.completedTasks}</span>
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Total Rating</span> {review.ratings}
                                </td>
                            </tr>
                        </>)
                    }

                </tbody>

            </table>
        </div>
    );
};

export default LeaderBoard;
