import React, { useState } from 'react';


const ManagerReviewModal = ({handleReviewSubmit, review}) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    
    
        

    const handleCommentBlur = event => {
        setComment(event.target.value);
        console.log(event.target.value);
        
    }
    const handleRatingBlur = event => {
        setRating(event.target.value);
        console.log(event.target.value);
        
    }

    function handleComment(){
        return document.getElementById('comment').value ="";
    }

    function handleRating(){
        return document.getElementById('rating').value ="";
    }

    return (
        
        <div>

  <input type="checkbox" id="manager-review-modal" className="modal-toggle" />
  
  <div className="modal modal-bottom sm:modal-middle">

      <div className="modal-box">
          <p className='text-lg text-orange-400'>Share your experience with this employee!</p>
          <textarea id="comment" onBlur={handleCommentBlur} class="form-control textarea textarea-info w-full rounded-2xl max-w-xs my-2" cols="25" rows="2" placeholder="Description" name='description' required></textarea>
          <input id="rating" onBlur={handleRatingBlur} type="number" step="0.01"  min="1" max="5" className="input input-bordered input-accent w-full max-w-xs mt-1" placeholder="rating out of 5" />
          <div className="modal-action">
              <label for="manager-review-modal" className="btn btn-xs btn-outline btn-error">Cancel</label>
              <button onClick={() => handleReviewSubmit({review, comment, rating, handleComment, handleRating})
              }  className="btn btn-outline btn-success btn-xs text-white" >Submit</button>
          </div>
      </div>
  </div>
  
</div>

);
};

export default ManagerReviewModal;