import React from 'react';
import './UserProfile.css'
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
const UserProfile = () => {
  const [user] = useAuthState(auth)



  return (
    <div>

      <div class="text-2xl lg:text-4xl text-white leading-tight"><p>{user?.displayName}</p></div>
      <div class="text-normal text-gray-300 hover:text-gray-400 cursor-pointer"><span class="border-b-2  border-dashed lg:text-2xl border-white pb-1">Administrator</span></div>
      <div class="text-sm text-gray-300 lg:mt-2 hover:text-gray-400 cursor-pointer md:absolute pt-3 md:pt-0 bottom-15 right-0">Email: <b>{user?.email}</b></div>
    </div>
  );
};

export default UserProfile;