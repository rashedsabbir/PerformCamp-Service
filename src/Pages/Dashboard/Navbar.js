import { faEllipsisVertical, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'firebase/auth';
import React, { Fragment } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
    if (!user) {
      navigate('/login')
    }
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className="navbar sticky top-0 z-50 bg-teal-600">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Company Logo</a>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

        {/* Profile dropdown */}
        {
          user ? <div>
            <Menu as="div" className="ml-3 z-30 relative">
            <span class="absolute right-8 my-1 z-10 animate-ping inline-flex rounded-full h-1 w-1 bg-green-300"></span>
              <div className="flex justify-center items-center gap-3">
                <span className="text-white font-bold lg:block hidden">{user.displayName}</span>
                
                {
                  user.photoURL ? <img referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full "
                    referrerpolicy="no-referrer"
                    src={user.photoURL}
                    alt=""
                  /> : <img src="https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg" alt="" className="h-8 w-8 rounded-full" />
                }
                <Menu.Button className=" flex text-sm rounded-full focus:outline-none hover:transition-all">

                  <span className="sr-only">Open user menu</span>

                  <FontAwesomeIcon icon={faEllipsisVertical} className="h-6 hover:animate-spin w-5 text-white font-bold group-hover:text-rose-600" aria-hidden="true" />

                </Menu.Button>


              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden text-center bg-amber-500 text-white ring-1 ring-black ring-opacity-5 cursor-pointer focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/user-profile" className={classNames(active ? 'bg-teal-700' : '', 'block px-4 py-2 text-sm font-semibold ')}
                      >
                        My Profile
                      </Link>
                    )}
                  </Menu.Item>

                  <button onClick={handleSignOut} className='border-t-2 hover:text-gray-100 w-full font-bold hover:bg-teal-700 px-4 py-2 text-sm '
                  >
                    Log out <FontAwesomeIcon icon={faRightFromBracket} className="h-4 hover:translate-x-2 w-5 text-white   group-hover:text-rose-600" aria-hidden="true" />
                  </button>


                </Menu.Items>
              </Transition>
            </Menu>
          </div> :
            <div>
              <Link to="/login">
                <button className='btn btn-outline rounded-full lg:px-7 font-bold'
                >Login</button>
              </Link>
            </div>
        }
      </div>
    </div>
  );
};

export default Navbar;