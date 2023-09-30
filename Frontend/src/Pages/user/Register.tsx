import {useState } from 'react';
import {useNavigate , Link} from 'react-router-dom';
import { axiosInstance } from '../../api/axiosInstance';
import { toast , Toaster} from 'react-hot-toast';
import { GoogleLogin ,GoogleOAuthProvider } from '@react-oauth/google';


const Register = () => {
    const [name , setName] = useState<string>('');
    const [email  , setEmail] = useState<string>('');
    const [role , setRole] = useState<string>('');
    const [password , setPassword] = useState<string>('');
    const [passwordStrength , SetPasswordstrength] = useState<string>('');

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
          } else if(res.data.error) {
            toast.error(res.data.error , {duration : 2000 , style : {color : '#fff' , background : 'black'}});
          }
        }).catch(error => console.log(error , 'Axios register error')
        )
    }

    const checkPasswordstrength = (password : string) => {

      const passwordRequirements = {
        minLength : 7,
        requireUpperCase : true,
        requireLowerCase: true,
        requireNumbers : true,
        requireSpecialChars : true
      }

    // Regular expressions for character classes
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numbersRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    let strength = 0;

    if(password.length >= passwordRequirements.minLength){
      strength ++;
    }

    if(passwordRequirements.requireUpperCase && uppercaseRegex.test(password)){
      strength++;
    }

    if(passwordRequirements.requireLowerCase && lowercaseRegex.test(password)){
      strength ++;
    }

    if(passwordRequirements.requireNumbers && numbersRegex.test(password)){
      strength++;
    }

    if(passwordRequirements.requireSpecialChars && specialCharRegex.test(password)){
      strength ++;
    }

    if (strength === 0) {
      return 'Weak';
    } else if (strength < 4) {
      return 'Moderate';
    } else {
      return 'Strong';
    }
  }

  const handlePasswordChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strength = checkPasswordstrength(newPassword);
    SetPasswordstrength(strength);
  }

  return (
    <>
    <GoogleOAuthProvider clientId='8989279973-hri4q1okjco23pch7n0mu8q0mp6ros97.apps.googleusercontent.com'>
    <Toaster position='top-right'/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/Cropped1-Logo.png"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="border-2 rounded-md border-violet-950 p-5 bg-gray-50 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  onChange={handlePasswordChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  {passwordStrength && (
                    <div
                      className={`text-sm mt-2 ${
                        passwordStrength === 'Strong'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      Password Strength: {passwordStrength}
                    </div>
                  )}
            </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue hover:bg-light-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
            <p className='lg:text-lg font-semibold text-center py-1 dark:text-black'>OR</p>
            
            <div className='flex w-full justify-center'>
              <GoogleLogin 
                onSuccess={credRes => {
                  axiosInstance.post('/auth/google' , credRes).then((res) => {
                    if(res.data){
                      toast.success(res.data.message, {duration : 2000 , style : {color : '#fff' , background : 'black'}});

                      setTimeout(() => {
                        navigate('/login');
                      }, 3000);
                    }
                  }).catch((err) => console.log(err, 'axios catch err google signup')
                  )
                }}

                onError={() => {
                  console.log('ggogle login failed');
                }}

                type='standard'
                theme='filled_black'
                size='large'
                text='continue_with'
                shape='square'
                logo_alignment='center'
                ux_mode='popup'
                
                
              />
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
      </GoogleOAuthProvider>
    </>
  )
}

export default Register