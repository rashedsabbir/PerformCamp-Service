import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Modal from "react-modal";
import { toast } from 'react-toastify';

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      margin: "0 auto",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      
      backgroundColor: "#15998E",
    },
  };
  
  Modal.setAppElement("#root");

export default function UpdateModal({ id, setIsReload, isReload }) {
    // console.log(id);
    const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
  }

  


  const handleUpdate = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;

    function closeModal() {
      setIsOpen(false);
    }

    fetch(`https://whispering-gorge-29329.herokuapp.com/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
      
    })
      .then((res) => res.json())
      .then((data) => {
        setIsReload(!isReload);
        toast.success('posted successfully');
        closeModal();
      }
      )
      
  };

    return (
        <div className=" rounded-lg">
      
      <button onClick={openModal} className=' py-4 shadow-lg rounded-lg bg-pink-500 flex justify-center px-4'>
        <FontAwesomeIcon className='text-white ' icon={faEdit}></FontAwesomeIcon>
      </button>
      <Modal
        isOpen={modalIsOpen}
        
        onAfterOpen={afterOpenModal}
        
        style={customStyles}
        contentLabel="Example Modal">
        <div className='flex justify-end'>
        
        </div>
        <div className='text-center text-white'>Update task!</div>
        <div className=" mt-3">
          <form className="container " onSubmit={handleUpdate}>
            <div className=" mb-3 mt-5 ">
            
              <input
                type="text"
                className="form-control input input-warning text-black border px-5 py-2 rounded-xl"
                required
                placeholder="Add title"
                aria-label="With input"
                name="title">
              </input>
            </div>

            <div className=" ">
              
              <textarea class="form-control textarea textarea-warning w-full rounded-2xl max-w-xs mb-3" cols="25" rows="3" placeholder="Update description" name='description' required></textarea>
            </div>
            <div className="mt-4 flex justify-center">
              <input type="submit" value="submit" className="btn text-white btn-error hover:btn-success " />
            </div>
          </form>
        </div>
      </Modal>
    </div>
    );
};
