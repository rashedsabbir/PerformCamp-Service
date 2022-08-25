import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import ReviewDetailModal from './ReviewDetailModal';
import { toast } from 'react-toastify';
import FeedbackModal from './FeedbackModal';
import ManagerReviewModal from './ManagerReviewModal';


const ManagerReview = () => {
    const [reviews, setReviews] = useState([]);
    const [detailsReview, setDetailsReview] = useState(null);
    const [employeeReview, setEmployeeReview] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/pendingReview/${user?.email}`, {
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

    const handleReviewSubmit = ({ review, comment, rating }) => {
        console.log('manager', review);
        const employeeReview = {
            title: review.title,
            description: review.description,
            email: review.email,
            employeeImage: review.employeeImage,
            appointeeEmail: user?.email,
            givenBy: user?.displayName,
            image: user?.photoURL,
            deadline: review.deadline,
            comment: comment,
            rating: rating

        }

        if (rating >= 1 && rating <= 5) {
            fetch(`http://localhost:5000/employeeReviews`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(employeeReview)

            })
                .then(res => res.json())
                .then(data => {

                    console.log(data)
                    if (data.acknowledged === true) {
                        toast("Review Has been submit Successfully!")
                        console.log(data);
                    }

                })

            fetch(`http://localhost:5000/pendingReview/${review._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        toast.success(`review: ${review.id} is deleted`);

                    }
                })
        }

        else {
            toast.error('Give rating between 1 to 5')
        }

    };



    const handleFeedbackSubmit = ({ review, comment }) => {
        console.log('inside review', review);

        const feedbackTask = {
            feedbackId: review._id,
            title: review.title,
            description: review.description,
            email: review.email,
            appointeeEmail: user?.email,
            appointeeName: user?.displayName,
            deadline: '',
            comment: comment

        }

        fetch('http://localhost:5000/feedback', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(feedbackTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    toast('Feedback is posted succesfully')
                }

            })

        fetch(`http://localhost:5000/pendingReview/${review._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {

                    toast.success(`review: ${review._id} is deleted`);
                    const remaining = reviews.filter(r => r._id !== review._id);
                    setReviews(remaining);
                }

            })
    }

    return (
        <div>
            <div class="xl:w-full border-b border-gray-300  py-5  ">
                <div class="flex justify-center">
                    <p class="text-2xl text-gray-800  font-bold ">Pending Review: {reviews.length}</p>
                </div>
            </div>
            <table class="border-collapse w-full mt-10">
                <thead>
                    <tr>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Title</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Done by</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Proof</th>
                        <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                    </tr>
                </thead>


                <tbody>
                    {
                        reviews.map(review => (

                            <tr key={review._id} class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Title</span>
                                    <span class="rounded bg-amber-300 py-1 px-3 text-xs font-bold">{review.title}</span>
                                </td>
                                <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Done by</span>
                                    {review.employeeName}
                                </td>
                                <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Proof</span>
                                    <span cols='20' rows='3'>{review.proof}</span>
                                </td>
                                <td class="w-full lg:w-auto text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                                    <label onClick={() => setDetailsReview(review)} for="details-review-modal" className="btn text-stone-100 btn-sm border-none bg-secondary rounded-md p-1 hover:text-yellow-100 mr-2">Details</label>


                                    <label onClick={() => setEmployeeReview(review)} for="manager-review-modal" className="btn text-stone-100 btn-sm border-none bg-success rounded-md p-1 hover:text-yellow-100 mr-2">Review</label>



                                    <label onClick={() => setFeedback(review)} for="feedback-modal" className="btn btn-sm text-stone-100 border-none bg-error rounded-md p-1 hover:text-success hover:text-yellow-100 mr-2">Feedback</label>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
            {
                detailsReview && <ReviewDetailModal
                    review={detailsReview}>
                </ReviewDetailModal>}

            {
                employeeReview && <ManagerReviewModal
                    review={employeeReview}
                    handleReviewSubmit={handleReviewSubmit}

                >
                </ManagerReviewModal>}


{
    feedback && <FeedbackModal
        review={feedback}
        handleFeedbackSubmit={handleFeedbackSubmit}>
    </FeedbackModal>
}

        </div >
    );
};

export default ManagerReview;