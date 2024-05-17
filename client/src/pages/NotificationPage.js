import { Tabs, message } from 'antd';
import Layout from '../components/Layout';
import React from 'react';
// import TabPane from 'antd/es/tabs/TabPane';
import { useDispatch, useSelector } from 'react-redux';
import { hideloading, showLoading } from '../redux/features/alertSlice';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.user);
    const handleMarkAllRead = async () => {
        try{
            dispatch(showLoading())
            const res = await axios.post('http://127.0.0.1:8005/api/v1/user/get-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideloading());
            if(res.data.message){
                message.success(res.data.message)
            }
            else{
                message.error(res.data.message);
            }
        }
        catch(error){
            dispatch(hideloading());
            console.log(error)
            message.error('Something went wrong in notifications')
        }
    };
    const handleDeleteAllRead = async (req,res) => {
        try{
            dispatch(showLoading());
            const res = await axios.post('http://127.0.0.1:8005/api/v1/user/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideloading());
            if(res.data.message){
                message.success(res.data.message);
            }
            else{
                message.error(res.data.message)
            }
        }
        catch(error){
            dispatch(hideloading());
            console.log(error);
            message.error('Something went wrong while deleting notifications')
        }
    };
    return (
        <Layout>
            <h4 className='p-3 text-center'>Notification Page</h4>  
            <Tabs>
                <Tabs.TabPane tab="Unread" key={0}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
                    </div>
                    {
                        user?.notification.map(notificationMsg => (
                            <div className='card'  style={{cursor:'pointer'}}> 
                                <div className='card-text' onClick={navigate(notificationMsg.onClickPath)}>
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>

                <Tabs.TabPane tab="Read" key={1}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2 text-primary' style={{cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</h4>
                    </div>
                    {
                        user?.seenotification.map(notificationMsg => (
                            <div className='card'  style={{cursor:'pointer'}}> 
                                <div className='card-text' onClick={navigate(notificationMsg.onClickPath)}>
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>

            </Tabs>
        </ Layout>
    )
}

export default NotificationPage;