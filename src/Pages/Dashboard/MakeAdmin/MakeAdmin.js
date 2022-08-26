import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MakeAdmin = () => {
  const [userData, setUserData] = useState([]);

  const roleChangeRef = useRef()
  useEffect(() => {
    fetch('https://whispering-gorge-29329.herokuapp.com/user')
      .then(res => res.json())
      .then(data => setUserData(data))
  }, [userData])

  const handleEdit = (email) => {
    //   // const roleChange = roleChangeRef.current.value;
    //   const selectElement = document.querySelector('#select1');
    //  const output = selectElement.options[selectElement.selectedIndex].value;
    //   // document.querySelector('.output').textContent = output;
    //   console.log(output);

    fetch(`https://whispering-gorge-29329.herokuapp.com/user_admin/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },

    })
      .then(res => res.json())
      .then(data => {

        if (data.modifiedCount > 0) {

          toast("Role Has been Update Successfully!")

        }
      })



  }

  return (
    <div>
      <ToastContainer />
      <div class="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5  dark:bg-gray-800">
        <div class="flex justify-center">
          <p class="text-2xl text-gray-800 dark:text-gray-100 font-bold ">Add a New Manager</p>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <div className=" overflow-x-auto ">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full text-center divide-y divide-gray-200">
                <thead className="bg-gray-50 font-bold">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                    >
                      Edit
                    </th>
                    {/* <th scope="col" className="relative px-6 py-3  lg:table-cell">
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y lg:divide-none divide-blue-400">
                  {userData.map((person) => (
                    <tr key={person._id} className='flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap'>
                      <td className="px-6 py-4 whitespace-nowrap w-full lg:w-auto text-gray-800 text-center block lg:table-cell relative lg:static lg:border-none border-b border-1">
                      <span class="lg:hidden absolute top-3 left-0 text-blue-400 px-4 py-1 text-md font-bold uppercase">Name</span>
                        <div className="flex justify-end lg:justify-start items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            
                            {
                  person.image ? <img
                  src={person.image}
                  referrerPolicy="no-referrer" className="h-10 w-10 rounded-full" 
                  alt="" /> : <img src="https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg" alt="" className="h-10 w-10 rounded-full" />
                }
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 ">{person.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap px-6 py-4 whitespace-nowrap w-full lg:w-auto text-gray-800 text-center block lg:table-cell relative lg:static lg:border-none border-b border-1">
                      <span class="lg:hidden absolute top-3 left-0 text-blue-400 px-4 py-1 text-md font-bold uppercase">Email</span>
                        <div className="text-sm text-gray-900 flex justify-end">{person.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap px-6 py-4 whitespace-nowrap w-full lg:w-auto text-gray-800 text-center block lg:table-cell relative lg:static lg:border-none border-b border-1">
                      <span class="lg:hidden absolute top-3 left-0 text-blue-400 text-blue-400 px-4 py-1 text-md font-bold uppercase">Status</span>
                        <div className='flex justify-end'>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap px-6 py-4 whitespace-nowrap w-full lg:w-auto text-gray-800 text-center block lg:table-cell relative lg:static lg:border-none border-b border-1">
                      <span class="lg:hidden absolute top-3 left-0 text-blue-400 px-4 py-1 text-md font-bold uppercase">Role</span>
                        <div className='flex justify-end'>{person.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap px-6 py-4 whitespace-nowrap w-full lg:w-auto text-gray-800 text-center  block lg:table-cell relative lg:static lg:border-none border-b border-1">
                        <span class="lg:hidden absolute top-3 left-0 text-blue-400 px-4 py-1 text-md font-bold uppercase">Edit</span>
                        <div className='flex justify-end w-full'>
                        <button className=" btn btn-outline  btn-error rounded-2xl" onClick={() => handleEdit(person.email)}>
                          Make Manager
                        </button>
                        </div>

                        {/* modal for edit  */}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MakeAdmin;