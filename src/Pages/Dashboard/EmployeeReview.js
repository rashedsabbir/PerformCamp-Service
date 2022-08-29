import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import Rating from 'react-rating';


const EmployeeReview = () => {

    const [reviews, setReviews] = useState([]);
    
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            fetch(`https://whispering-gorge-29329.herokuapp.com/employeeReviews/${user?.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setReviews(data)
                })
        }
    }, [user]);


const handleUpdate = () =>{

    function getRatingSum(a){
        console.log('get array', a);
        let total=0;
        for(let i in a) { 
            total += parseFloat(a[i].rating);
        }
        return total;
    }
    
    let ratings= getRatingSum(reviews);
    console.log(ratings);

const updateleaderboard = {
    employeeName: user?.displayName,
    employeeImage: user?.photoURL || 'https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg',
    employeeEmail: user?.email,
    completedTasks: reviews.length,
    ratings: ratings
}
    
    fetch(`https://whispering-gorge-29329.herokuapp.com/leaderboard/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updateleaderboard)
    })
        .then(res => res.json())
        .then(data => {
           console.log(data); 
           toast.success('You are short listed for employee of the month') 
        })

}
    
    return (
        <div>
            <h1 className='text-2xl font-bold text-primary text-center py-8'>You have {reviews.length} {reviews.length>1 ? 'reviews' : 'review'}  from Managers</h1>
            
            <p onClick={handleUpdate} className='text-rose-400 text-xl font-bold text-center'>Participate in the ''Best Employee of The Month'' Contest! <button className='btn btn-success rounded'>Participate</button></p>
            
            <div className='grid lg:grid-cols-2 lg:mx-16 '>
            {
                reviews.map(review =>
                    <div key={review._id} className="max-w-md py-4 px-8 mx-6 bg-white shadow-lg rounded-lg my-20">

                        <div className="flex justify-center md:justify-end -mt-16">

                            <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src={review.image} alt="" />
                        </div>
                        <div>
                            <h2 className="text-gray-800 text-3xl font-semibold">Task: {review.title}</h2>
                            <p className="mt-2 text-gray-600">{review.description}</p>
                        </div>

                        <div className="flex justify-between mt-4">
                            <div className='mr-2 lg: mr-8'>
                            <Rating
                                    initialRating={review.rating}
                                    emptySymbol={<FontAwesomeIcon icon={faStar} />}
                                    fullSymbol={<FontAwesomeIcon style={{ color: 'gold' }} icon={faStar} />}
                                    readonly
                                ></Rating> <span className='text-md font-medium text-indigo-500'>({review.rating}/5)</span>
                            </div>
                                <p className="text-xl font-medium text-indigo-500">{review.givenBy}</p>
                            </div>

                    </div>
                )}
        </div>
        </div>
        
        
    );
};

export default EmployeeReview;