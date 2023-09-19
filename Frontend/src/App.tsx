import {Routes , Route, Navigate} from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import RootState from './Redux/rootstate/rootState';
import Home from './Pages/intro/Home';
import Register from './Pages/user/Register';
import Login from './Pages/user/Login';
import Profile from './Pages/user/Profile';
import UserFeed from './Pages/user/UserFeed';

import Adminlogin from './Pages/admin/Adminlogin';
import UsersList from './Pages/admin/UsersList';
import CompanyList from './Pages/admin/CompanyList';

import PrivatePages from './Components/PrivatePages';

function App() {


  return (
    <>
      <Routes>
        <Route index path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />

        <Route element={<PrivatePages/>}>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/feed' element={<UserFeed />} />
        </Route>

        <Route path='/admin' element={<Adminlogin/>}/>
        <Route path='/admin/users' element={<UsersList/>} />
        <Route path='/admin/companies' element={<CompanyList/>} />
      </Routes>
    </>
  )
}

export default App
