import React from 'react';
import './UserProfile.css'
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Clock from './Clock/Clock';
import useManager from '../hooks/useManager';

const UserProfile = () => {
  const [user] = useAuthState(auth)
  const [manager] = useManager(user);

    return (
        <div>
            <h1 className='text-center text-teal-400 pt-2 font-bold text-2xl'>Welcome {user?.displayName}!</h1>
            <Clock></Clock>
            <div class="w-screen h-screen  flex flex-row flex-wrap p-3">
  <div class="mx-auto w-2/3 user-background">
  
<div class="rounded-lg shadow-lg bg-rose-500 backdrop-blur-md w-full flex flex-row flex-wrap p-3 antialiased" >
  <div class="md:w-1/3 w-full">
    <img class="rounded-lg w-48 shadow-lg antialiased" src={user?.photoURL}/>  
  </div>
  <div class="md:w-2/3 w-full px-3  flex flex-row flex-wrap">
    <div class="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">

  

      <div class="text-2xl lg:text-4xl text-white leading-tight">
        <p>{user?.displayName}</p>
      </div>
      <div class="text-normal text-gray-300 hover:text-gray-400 cursor-pointer">
        
        {
        manager ? <p className=' lg:text-2xl'>Manager</p> : <p className=' lg:text-2xl '>Employee</p>
                            }
      </div>
      <div class="text-sm text-gray-300 lg:mt-2 border-t-2  border-dashed  border-white pb-1 hover:text-gray-400 cursor-pointer md:absolute pt-3 md:pt-0 bottom-15 right-0">Email: <b>{user?.email}</b>
      
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default UserProfile;