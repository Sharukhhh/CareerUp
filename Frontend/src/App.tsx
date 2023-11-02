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
import Adminlogin from './Pages/admin/Adminlogin';
import UsersList from './Pages/admin/UsersList';
import CompanyList from './Pages/admin/CompanyList';
import PrivatePages from './Components/PrivatePages';
import { useSelector } from 'react-redux';
import RootState from './Redux/rootstate/rootState';
import JobsPage from './Pages/user/JobsPage';
import CategoryAdd from './Pages/admin/CategoryAdd';
import Applicants from './Pages/user/Applicants';
import Dashboard from './Pages/admin/Dashboard';
import PostTable from './Pages/admin/PostTable';
import Notifications from './Pages/user/Notifications';
import NotFound from './Pages/intro/NotFound';
import Explore from './Pages/user/Explore';
import ChatPage from './Pages/user/ChatPage';
import { Toaster } from 'react-hot-toast';


function App() {
  const user = useSelector((state : RootState) => state.user.userCred);

  const isCandidate = user?.role === 'Candidate';

  return (
    <>
      <Routes>
        <Route index path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />

        <Route element={<PrivatePages isUser={true}/>}>
          <Route path='/account' element={<Profile/>} />
          <Route path='/account/:id' element={<Profile/>} />
          <Route path='/feed' element={<UserFeed />} />
          <Route path='/details' element={<AddInfoPage />}/>
          <Route path='/details/:id' element={<AddInfoPage/>}/>
          <Route path='/saved' element={<SavedPosts/>}/>
          <Route path='/message' element={<ChatPage/>}/>
          <Route path='/notifications' element={<Notifications/>}/>
          <Route path='/explore' element={<Explore/>}/>
          {isCandidate ? (
            <Route path='/jobs' element={<JobsPage />} />
          ) : (
            <>
            <Route path='/jobs' element={<RecruiterJobsPage/>}/>
            <Route path='/applicants/:jobId' element={<Applicants/>}/>
            </>
          )}
        </Route>

        <Route path='/admin' element={<Adminlogin/>}/>
        
        <Route element={<PrivatePages isUser={false}/>}>
          <Route path='/admin/users' element={<UsersList/>} />
          <Route path='/admin/companies' element={<CompanyList/>} />
          <Route path='/admin/categories' element={<CategoryAdd />}/>
          <Route path='/admin/dashboard' element={<Dashboard />}/>
          <Route path='/admin/posts' element={<PostTable/>}/>
        </Route>

        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Toaster position='top-right'/>
    </>
  )
}

export default App
