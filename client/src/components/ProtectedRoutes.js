import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { hideloading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';
export default function ProtectedRoute({children}){

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    
    //get user
    //eslint-disable-next-line
    const getUser = async() =>{
        try{
            dispatch(showLoading());
            const res = await axios.post('http://localhost:8005/api/v1/user/getUserData',{
                token: localStorage.getItem('token')},
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch(hideloading())
            if(res.data.success){
                dispatch(setUser(res.data.data))
            }
            else{
                <Navigate to="/login" />
                localStorage.clear();
            }
        }
        catch(error){
            dispatch(hideloading());
            localStorage.clear();
            console.log(error)
        }
    }

    useEffect(() => {
        if(!user){
            getUser();
        }
    },[user]);

    if(localStorage.getItem('token')){
        return children;
    }
    else{
        return <Navigate to="./login" />
    }
}