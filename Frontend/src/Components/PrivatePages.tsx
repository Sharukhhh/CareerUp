import React from 'react';
import  { Navigate ,Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import RootState from "../Redux/rootstate/rootState"
import AdminRootState from '../Redux/rootstate/AdminRootState';

interface PrivatePagesProps {
  isUser : boolean;
}

const PrivatePages : React.FC<PrivatePagesProps> = ({isUser}) => {
  
    const user = useSelector((state : RootState) => state.user.userCred);
    const admin = useSelector((state : AdminRootState) => state.admin.adminData);

    if(isUser){
      if(user){
        return <Outlet/>
      } else {
        return <Navigate to='/login' replace/>
      }
    } else {
      if(admin){
        return <Outlet/>
      } else {
        return <Navigate to='/admin' replace/>
      }
    }

}

export default PrivatePages