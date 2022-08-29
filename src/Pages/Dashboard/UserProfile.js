import React from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

import useManager from '../hooks/useManager';
import Goal from './Goal';
import Feedback from './Feedback';
import Loading from '../Loading/Loading';
import Clock from './Clock/Clock'
import ChatwootWidget from './Chatwoot/Chatwoot';

const UserProfile = () => {
  const [user, loading] = useAuthState(auth)
  const [manager] = useManager(user);

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className='h-full w-full'>
      <h1 className='text-center text-teal-400 pt-2 font-bold text-2xl'>Welcome {user?.displayName}!</h1>
      <Clock></Clock>
      <div class="  flex flex-row flex-wrap p-3">
        <div class="mx-auto w-2/3 user-background">

          <div class="rounded-lg shadow-lg bg-teal-500 backdrop-blur-md w-full flex flex-row flex-wrap p-3 antialiased" >
            <div class="md:w-1/3 w-full">

              {
                user.photoURL ? <img referrerPolicy="no-referrer"
                  className="rounded-lg w-48 shadow-lg antialiased"
                  referrerpolicy="no-referrer"
                  src={user.photoURL}
                  alt=""
                /> : <img src="https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg" alt="" className="rounded-full w-32 shadow-lg antialiased" />
              }
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