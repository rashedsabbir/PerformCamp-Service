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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons"


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
            <form id="myForm" className="shadow-lg" onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <div className="container mx-auto  rounded">
                        <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5  ">
                            <div className="flex justify-center">
                                <p className="text-2xl text-green-500 font-bold ">Add a New Task</p>
                            </div>
                        </div>

                        <div className="">
                            <div className="mt-3 flex flex-col items-center">
                                <label for="description" className="pb-2 text-sm font-bold text-black">Sender</label>
                                <input {...register("appointee")} id="appointee" name="appointee" className="input border-transparent flex-1 appearance-none w-72 border border-gray-300 p-2 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" readOnly value={user?.email} />
                            </div>
                            <div className="mt-3 flex flex-col items-center ">
                                <input {...register("title", { required: "Title is required" })} tabindex="0" type="text" id="title" name="title" required className="input border-transparent flex-1 appearance-none border border-gray-300 p-2 w-72 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Task title" />
                                <p className='text-red-500'>{errors.title?.message}</p>
                            </div>
                            <div className="mt-3 flex flex-col items-center">
                                <textarea {...register("description", { required: "Description is required" })} id="description" name="description" required className="bg-white w-72 border border-gray-300 dark:border-gray-700 rounded text-sm focus:outline-none p-2 focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400" placeholder="Detailed description of the task" ></textarea>
                                <p className='text-red-500'>{errors.description?.message}</p>
                                <p className="w-full text-center text-xs pt-1 text-gray-600 dark:text-gray-400">Character Limit: 200</p>
                            </div>
                            <div className="form-control flex flex-col items-center mt-3">
                                <label className="label">
                                    <span className="label-text font-semibold">Select A Date From Calendar <FontAwesomeIcon icon={faCalendarDays} /></span>
                                </label>
                                <div className="mb-3 w-72 rounded-full" data-mdb-toggle-button="false">
                                    <span className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ">
                                        <Controller
                                            control={control}
                                            name="deadline"
                                            render={({ field }) => (
                                                <DatePicker
                                                    placeholderText="Deadline"
                                                    className="bg-white borde rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400"
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


                    <div className="container mx-auto">
                        <div className="container mx-auto w-64">
                            <div className=" flex flex-col items-center">
                                <label className="label">
                                    <span className="label-text font-bold">Receiver</span>
                                </label>
                                <input {...register("employeeName", { required: "Employee Name Address is required" })} className="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 mb-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder='Employee Name' />

                                <input {...register("email", { required: "Email Address is required" })} className="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder='Email' />
                                <p className='text-red-500'>{errors.email?.message}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container mx-auto mt-6 rounded  ">

                    <div className="flex items-center text-center mx-auto">
                        <div className="container mx-auto">
                            <div className="mx-auto ">
                                <p className="text-lg text-black font-bold">Alerts</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 pt-1">Send updates of this activity.</p>
                            </div>
                        </div>

                    </div>
                    <div className="container flex justify-center items-center mx-auto pb-6">
                        <div className=" pb-4 border-r border-gray-300 dark:border-gray-700 px-8 text-gray-800 ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <polyline points="3 7 12 13 21 7" />
                            </svg>
                            <p className="text-sm font-bold  text-gray-800 ">Via Email</p>
                        </div>
                        <div className="px-8">
                            <div className="flex justify-between items-center mb-8 mt-4">
                                <div className="w-9/12">
                                    <div className='border-b border-gray-300'>
                                        <p className="text-sm  text-gray-800  pb-1">Email notification</p>
                                    </div>
                                    <p id="cb1" className="text-sm pt-2 text-gray-600 ">Send Email notification of this task to the employee</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto w-11/12 xl:w-full">
                    <div className="w-full pb-10 sm:px-0  flex justify-center">
                        <button role="button" aria-label="cancel form" className="bg-error focus:outline-none transition duration-150 ease-in-out hover:bg-gray-400  rounded text-gray-100 px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">Cancel</button>
                        <button role="button" aria-label="Save form" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-green-400 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 mr-4 py-2 text-sm" type="submit">Save</button>
                    </div>
                </div>

                <ToastContainer></ToastContainer>
            </form>



        </div>
    );
};

export default AddTask;