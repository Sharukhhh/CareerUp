import {Routes , Route, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState from './Redux/rootstate/rootState';
import Home from './Pages/Home';
import Register from './Pages/user/Register';
import Login from './Pages/user/Login';
import Profile from './Pages/user/Profile';
import Adminlogin from './Pages/admin/Adminlogin';
import UsersList from './Pages/admin/UsersList';
import CompanyList from './Pages/admin/CompanyList';

function App() {

  const isAuthenticated = useSelector((state : RootState) => state.user.isAuthenticated);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />

        {isAuthenticated ? (
          <Route path='/profile' element={<Profile/>} />
        ) : (
          <Route path='/profile' element={<Navigate to='/login' />} />
        )}


        <Route path='/admin' element={<Adminlogin/>}/>
        <Route path='/admin/users' element={<UsersList/>} />
        <Route path='/admin/companies' element={<CompanyList/>} />
      </Routes>
    </>
  )
}

export default App
