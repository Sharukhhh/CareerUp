import {useState } from 'react';
import {useNavigate , Link} from 'react-router-dom';
import { axiosInstance } from '../../api/axiosInstance';
import { toast , Toaster} from 'react-hot-toast';


const Register = () => {
    const [name , setName] = useState<string>('');
    const [email  , setEmail] = useState<string>('');
    const [role , setRole] = useState<string>('');
    const [password , setPassword] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axiosInstance.post('/auth/register' , {name , email , role , password}).then((res) => {
          console.log(res , ': Registered user Data');

          if(res.data.message){
            toast.success(res.data.message, {duration : 2000 , style : {color : '#fff' , background : 'black'}});

            setTimeout(() => {
              navigate('/login');
            }, 3000);
          } else {
            toast.error(res.data.error , {duration : 2000 , style : {color : '#fff' , background : 'black'}});
          }
        }).catch(error => console.log(error , 'Axios register error')
        )
    }

  return (
    <>
    <Toaster position='top-right'/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 laptop:px-8">
        <div className="mobile:mx-auto mobile:w-full mobile:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="public/Cropped1-Logo.png"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="border-2 rounded-md border-violet-950 p-5 bg-gray-50 mt-10 mobile:mx-auto mobile:w-full mobile:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  value={name}
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Select your Role
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  value={role}
                  name="role"
                  required
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                <option >Select a Role</option>
                <option >Candidate</option>
                <option>Company</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                  value={password}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-violet-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already an User?
            <Link to='/login' className="font-semibold leading-6 text-violet-900 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register