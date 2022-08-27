import React, { useState } from 'react';
import './AddTask.css'
import banner_1 from '../../../Images/logo/BrosCreation3.PNG'
import 'tw-elements';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddTask = () => {
    const [user] = useAuthState(auth);
    const { handleSubmit, register, formState: { errors }, reset, control } = useForm();
    const onSubmit = data => {

        console.log(data)

        fetch('https://whispering-gorge-29329.herokuapp.com/task', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged === true) {
                    toast("Task Has been submit Successfully!")
                    reset();
                }

            })

    };

    return (
        <div className=''>
            <form id="myForm" onSubmit={handleSubmit(onSubmit)}>
                <div class="">
                    <div class="container mx-auto  rounded">
                        <div class="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5  ">
                            <div class="flex justify-center">
                                <p class="text-2xl text-teal-400 font-bold ">Add a New Task</p>
                            </div>
                        </div>
                        <div class="">
                            <div class="">
                                <div class="mt-10 flex flex-col items-center ">
                                    <label for="title" class="pb-2 font-bold text-black">Title</label>
                                    <input {...register("title", { required: "Title is required" })} tabindex="0" type="text" id="title" name="title" required class="border border-gray-300 dark:border-gray-700 pl-3 py-3  shadow-xl rounded text-sm focus:outline-none focus:border-indigo-700 bg-amber-200 placeholder-gray-500 text-gray-600 dark:text-gray-400" cols="30" rows="1" placeholder="Task title" />
                                    <p className='text-red-500'>{errors.title?.message}</p>
                                </div>
                                <div class="mt-8 flex flex-col items-center  ">
                                    <label for="description" class="pb-2 text-sm font-bold text-black">Description</label>
                                    <textarea {...register("description", { required: "Description is required" })} id="description" cols="48" rows="3" name="description" required class="bg-amber-200 border border-gray-300 dark:border-gray-700  shadow-xl rounded text-sm focus:outline-none p-4 focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="Detailed description of the task" ></textarea>
                                    <p className='text-red-500'>{errors.description?.message}</p>
                                    <p class="w-full text-center text-xs pt-1 text-gray-600 dark:text-gray-400">Character Limit: 200</p>
                                </div>
                                <div class="mt-8 flex flex-col items-center">
                                    <label for="description" class="pb-2 text-sm font-bold text-black">Sender</label>
                                    <textarea {...register("appointee", { required: "Appointee is required" })} id="appointee" name="appointee" required class="bg-amber-200 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-xl rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-600 dark:text-gray-400" cols="36" rows="1" value={user?.email} ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mx-auto pt-4">
                        <div class="container mx-auto">

                            <div class="mx-auto pt-4">
                                <div class="container mx-auto w-64">
                                    <div class=" flex flex-col items-center mb-6">
                                        <label class="label">
                                            <span class="label-text font-bold">Receiver</span>
                                        </label>
                                        <input {...register("employeeName", { required: "Employee Name Address is required" })} class="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 mb-2 px-4 bg-amber-200 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder='Employee Name' />
                                        <input {...register("email", { required: "Email Address is required" })} class="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-amber-200 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder='Email' />
                                        <p className='text-red-500'>{errors.email?.message}</p>
                                    </div>
                                </div>
                                <div class="flex justify-center">
                                    <div class="mb-3 xl:w-96" data-mdb-toggle-button="false">
                                        <label class="label flex justify-center">
                                            <span class="label-text font-bold">Select a Deadline From Calendar</span>
                                        </label>

                                        <span className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-amber-200 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ">
                                            <Controller
                                                control={control}
                                                name="deadline"
                                                render={({ field }) => (
                                                    <DatePicker
                                                        placeholderText="Select date"
                                                        onChange={(date) => field.onChange(date)}
                                                        selected={field.value}

                                                    />
                                                )}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container mx-auto mt-10 rounded  ">

                    <div class="flex items-center text-center mx-auto">
                        <div class="container mx-auto">
                            <div class="mx-auto ">
                                <p class="text-lg text-black font-bold">Alerts</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400 pt-1">Send updates of this activity.</p>
                            </div>
                        </div>

                    </div>
                    <div class="container flex justify-center items-center mx-auto pb-6">
                        <div class=" pb-4 border-r border-gray-300 dark:border-gray-700 px-8 text-gray-800 ">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <polyline points="3 7 12 13 21 7" />
                            </svg>
                            <p class="text-sm font-bold  text-gray-800 ">Via Email</p>
                        </div>
                        <div class="px-8">
                            <div class="flex justify-between items-center mb-8 mt-4">
                                <div class="w-9/12">
                                    <div className='border-b border-gray-300'>
                                        <p class="text-sm  text-gray-800  pb-1">Email notification</p>
                                    </div>
                                    <p id="cb1" class="text-sm pt-2 text-gray-600 ">Send Email notification of this task to the employee</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container mx-auto w-11/12 xl:w-full">
                    <div class="w-full py-4 pb-10 sm:px-0  flex justify-center">
                        <button role="button" aria-label="cancel form" class="bg-error focus:outline-none transition duration-150 ease-in-out hover:bg-gray-400  rounded text-gray-100 px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">Cancel</button>
                        <button role="button" aria-label="Save form" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-green-400 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 mr-4 py-2 text-sm" type="submit">Save</button>
                    </div>
                </div>

                <ToastContainer></ToastContainer>
            </form>



        </div>
    );
};

export default AddTask;