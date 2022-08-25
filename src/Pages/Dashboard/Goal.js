import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Clock from './Clock/Clock';



const Goal = () => {

  const [tasks, setTasks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [user] = useAuthState(auth);


  //get tasks by email
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/task/${user?.email}`, {
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

    //get review by email
    useEffect(() => {
      if (user) {
          fetch(`http://localhost:5000/employeeReviews/${user?.email}`, {
              method: 'GET',
              headers: {
                  'authorization': `Bearer ${localStorage.getItem('accessToken')}`
              }
          })
              .then(res => res.json())
              .then(data => {
                  
                  setReviews(data)
              })
      }
  }, [user]);

  //get feedback by email
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

    return (
        <div>
          
<div class="min-h-screen py-20 px-10 ">
  <div class="grid grid-cols-1 gap-20 lg:grid-cols-2  lg:gap-10">
    <h2 className='text-center lg:text-3xl text-xl font-bold text-teal-500'>Task Progress</h2>
    <div class="flex items-center flex-wrap max-w-md px-10 bg-white shadow-xl rounded-2xl h-20"
       x-data="{ circumference: 2 * 2 * Math.PI, percent: 20 }"
       >
          <div class="flex items-center justify-center -m-6 overflow-hidden bg-white rounded-full">
          <svg class="w-32 h-32 transform translate-x-1 translate-y-1" x-cloak aria-hidden="true">
            <circle r="50" cx="55" cy="49" stroke="#d3d3d3" stroke-width="12" fill="none" stroke-dasharray="" stroke-dashoffset="0" pathlength="360" transform="rotate(135 55 55)" />
            <circle r="50" cx="55" cy="49" stroke="blue" stroke-width="8" fill="none" stroke-dasharray="180 270" stroke-dashoffset="0" stroke-linecap="round" pathlength="360" transform="rotate(135 55 55)" id="knobinsidering" />
            <g color="green">
            <text x="60" y="60" text-anchor="middle" fill='blue' class='text-2xl Rrrrr font-bold' alignment-baseline="middle" >{tasks.length}</text></g>
            </svg>
            
          </div>
          <p class="ml-10 font-medium text-blue-600 sm:text-xl">In Progress</p>

          
      </div>
    
    
    <div class="flex items-center flex-wrap max-w-md px-10 bg-white shadow-xl rounded-2xl h-20"
       
       >
          <div class="flex items-center justify-center -m-6 overflow-hidden bg-white rounded-full">
          <svg class="w-32 h-32 transform translate-x-1 translate-y-1" x-cloak aria-hidden="true">
            <circle r="50" cx="55" cy="49" stroke="wheat" stroke-width="12" fill="none" stroke-dasharray="" stroke-dashoffset="0" pathlength="360" transform="rotate(135 55 55)" />
            <circle r="50" cx="55" cy="49" stroke="green" stroke-width="8" fill="none" stroke-dasharray="250 270" stroke-dashoffset="0" stroke-linecap="round" pathlength="360" transform="rotate(135 55 55)" id="knobinsidering" />
            <text x="60" y="60" text-anchor="middle" fill='green' className='text-2xl font-bold' alignment-baseline="middle" >{reviews.length}</text>
            </svg>
            
            
          </div>
          <p class="ml-10 font-medium text-green-600 sm:text-xl">Completed</p>
      </div>
    <div class="flex items-center  flex-wrap max-w-md px-10 lg:my-10 bg-white shadow-xl rounded-2xl h-20"
       
       >
          <div class="flex items-center justify-center -m-6 overflow-hidden bg-white rounded-full">
            <svg class="w-32 h-32 transform translate-x-1 translate-y-1" x-cloak aria-hidden="true">
            <circle r="50" cx="55" cy="49" stroke="pink" stroke-width="12" fill="none" stroke-dasharray="" stroke-dashoffset="0" pathlength="360" transform="rotate(135 55 55)" />
            <circle r="50" cx="55" cy="49" stroke="red" stroke-width="8" fill="none" stroke-dasharray="90 270" stroke-dashoffset="0" stroke-linecap="round" pathlength="360" transform="rotate(135 55 55)" id="knobinsidering" />
            <text x="60" y="60" text-anchor="middle" fill='red' className='text-2xl font-bold' alignment-baseline="middle" >{feedbacks.length}</text>
            </svg>
            
            
          </div>
          <p class="ml-10 font-medium text-red-600 sm:text-xl">Backlogged</p>
      </div>
  </div>
</div>

        </div>
    );
};

export default Goal;