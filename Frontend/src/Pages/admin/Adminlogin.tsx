import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAxiosInstance } from '../../api/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAdminData } from '../../Redux/slices/adminSlice';
import { Helmet } from 'react-helmet-async';

const Adminlogin = () => {
    const [adminEmail , setAdminEmail] = useState<string>('');
    const [adminPassword , setAdminPassword] = useState<string>('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        adminAxiosInstance.post('/' , {email:adminEmail , password:adminPassword}).then((res) =>{
          
          if(res.data.message){
            dispatch(setAdminData(res.data.adminData))
            localStorage.setItem('adminToken' , JSON.stringify(res.data.token));
            toast.success(res.data.message , {duration : 2000 , style : {color : '#fff' , background : 'black'}});
            setTimeout(() => {
              navigate('/admin/users');
            }, 3000);
          } 

          if(res.data.error){
            toast.error(res.data.error , {duration : 2000 , style : {color : '#fff' , background : 'black'}});
          }
        }).catch((err) => console.log(err , 'axios catch error while admin login')
        )
    }

  return (
    <>
    <Helmet>
      <title>Admin - CareerUp</title>
    </Helmet>
    <Toaster position='top-right'/>
    <div className=" border-solid flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/admin.jpg"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            ADMIN LOGIN
          </h2>
        </div>

        <div className="border-2 rounded-md border-violet-950 p-5 bg-gray-300 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-black border-gray-200">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={adminEmail}
                  name="email"
                  type="email"
                  onChange={(e) => setAdminEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-black border-gray-200">
                  Password
                </label>  
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  value={adminPassword}
                  name="password"
                  type="password"
                  onChange={(e) => setAdminPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Do not have an Account?
            <Link to='/register' className="font-semibold leading-6 text-violet-900 hover:text-indigo-500">
              Sign up
            </Link>
          </p> */}
        </div>
    </div>
    </>
  )
}

export default Adminlogin