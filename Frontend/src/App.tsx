import {Routes , Route} from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/user/Register';
import Login from './Pages/user/Login';
import Profile from './Pages/user/Profile';
import Adminlogin from './Pages/admin/Adminlogin';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />


        <Route path='/admin' element={<Adminlogin/>}/>
      </Routes>
    </>
  )
}

export default App
