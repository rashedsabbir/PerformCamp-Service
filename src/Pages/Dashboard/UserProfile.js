import React from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

import useManager from '../hooks/useManager';
import Loading from '../Loading/Loading';
import Clock from './Clock/Clock'
import ChatwootWidget from './Chatwoot/Chatwoot';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const [user, loading] =
   useAuthState(auth)
  const [manager] = useManager(user);

  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  // const imageStorageKey = process.env.REACT_APP_IMAGE_STORAGE_KEY;
  const imageStorageKey = 'a3c8d49eb8ed51861c1f1248826e3c72';
  const onSubmit = async data => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    console.log('user update data', data);
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        if (result.success) {
          const img = result.data.url;
          const employee = {
            displayName: data.name,
            employeeId: data.employeeId,
            address: data.address,
            phoneNo: data.phone,
            img: img
          }
          fetch('https://web-production-9e42.up.railway.app/employee', {
            method: "POST",
            headers: {
              'content-type': 'application/json',
              'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(employee)
          })
            .then(res => res.json())
            .then(inserted => {
              if (inserted.insertedId) {
                toast.success('New Employee Has Been Added to List Successfully');
                reset();
              }
              else {
                toast.error("Failed to Add Employee")
              }
            })
        }
        console.log('imgbb', result)
      })

  };


  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className='h-full w-full'>
      <div>
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


      <div className='p-2'>
        <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5  dark:bg-gray-800">
          <div className="flex justify-center">
            <p className="text-2xl text-green-500 dark:text-gray-100 font-bold ">Update your profile</p>
          </div>
        </div>
        <div className='mt-10 flex justify-center items-center'>
          <form onSubmit={handleSubmit(onSubmit)} >

              <div>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input {...register("name", { required: true })} className="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent" />
                {errors.name && <p className='text-red-500'>Name is required</p>}
              </div>

         
            <div>
              <label className="label">
                <span className="label-text">Employee ID</span>
              </label>
              <input {...register("employeeId", { required: "Employee ID number is required" })} className="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent" type='text' />
              <p className='text-red-500'>{errors.id?.message}</p>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input {...register("img", { required: "Employee's Photo is required" })} className=" border-transparent appearance-none rounded-full border border-gray-400 p-2 bg-white w-full shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent" type='file' />
              <p className='text-red-500'>{errors.img?.message}</p>
            </div>


            <input type="submit" className="hover:-translate-y-1 hover:scale-110 btn btn-error text-white font-bold w-full mt-5" value="Add Employee" />
          </form>
        </div>
      </div>




    </div>
  );
};

export default UserProfile;