import React, { useEffect, useState } from 'react';

const useManager = (user) => {
    const [manager, setManager] = useState(false);
    const [managerLoading, setManagerLoading] = useState(true);

    useEffect( () =>{
      const email = user?.email;
    
      if(email){
        fetch(`https://whispering-gorge-29329.herokuapp.com/manager/${email}`, {
            method: 'GET',
            headers: {
                'content-type' : 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }   
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setManager(data.manager);
            setManagerLoading(false);
        }) 
      }
    }, [user]);

    return [manager, managerLoading];
}

export default useManager;