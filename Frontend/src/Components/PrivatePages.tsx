import { Navigate ,Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import RootState from "../Redux/rootstate/rootState"

const PrivatePages = () => {
    const user = useSelector((state : RootState) => state.user.userCred);

  return user ? <Outlet/> : <Navigate to='/login' replace/>
}

export default PrivatePages