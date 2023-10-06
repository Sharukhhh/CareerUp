import {Routes , Route} from 'react-router-dom';
// import './index.css';
import Home from './Pages/intro/Home';
import Register from './Pages/user/Register';
import Login from './Pages/user/Login';
import Profile from './Pages/user/Profile';
import UserFeed from './Pages/user/UserFeed';
import AddInfoPage from './Pages/user/AddInfoPage';
import SavedPosts from './Pages/user/SavedPosts';  
import RecruiterJobsPage from './Pages/user/RecruiterJobsPage';
import Chat from './Pages/user/Chat';

import Adminlogin from './Pages/admin/Adminlogin';
import UsersList from './Pages/admin/UsersList';
import CompanyList from './Pages/admin/CompanyList';

import PrivatePages from './Components/PrivatePages';
import { useSelector } from 'react-redux';
import RootState from './Redux/rootstate/rootState';
import JobsPage from './Pages/user/JobsPage';
import CategoryAdd from './Pages/admin/CategoryAdd';


function App() {
  const user = useSelector((state : RootState) => state.user.userCred);

  const isCandidate = user?.role === 'Candidate';

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
          {isCandidate ? (
            <Route path='/jobs' element={<JobsPage />} />
          ) : (
            <Route path='/jobs' element={<RecruiterJobsPage/>}/>
          )}
        </Route>

        <Route path='/admin' element={<Adminlogin/>}/>
        <Route path='/admin/users' element={<UsersList/>} />
        <Route path='/admin/companies' element={<CompanyList/>} />
        <Route path='/admin/categories' element={<CategoryAdd />}/>
      </Routes>
    </>
  )
}

export default App
