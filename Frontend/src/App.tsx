import {Routes , Route} from 'react-router-dom';
// import './index.css';
import Home from './Pages/intro/Home';
import Register from './Pages/user/Register';
import Login from './Pages/user/Login';
import Profile from './Pages/user/Profile';
import UserFeed from './Pages/user/UserFeed';
import AddInfoPage from './Pages/user/AddInfoPage';
import SavedPosts from './Pages/user/SavedPosts';  
import Chat from './Pages/user/Chat';

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
          <Route path='/account' element={<Profile/>} />
          <Route path='/account/:id' element={<Profile/>} />
          <Route path='/feed' element={<UserFeed />} />
          <Route path='/details' element={<AddInfoPage />}/>
          <Route path='/details/:id' element={<AddInfoPage/>}/>
          <Route path='/saved' element={<SavedPosts/>}/>
          <Route path='/message' element={<Chat />}/>
        </Route>

        <Route path='/admin' element={<Adminlogin/>}/>
        <Route path='/admin/users' element={<UsersList/>} />
        <Route path='/admin/companies' element={<CompanyList/>} />
      </Routes>
    </>
  )
}

export default App
