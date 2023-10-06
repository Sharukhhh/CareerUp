import {useState , useEffect } from 'react';
import {useNavigate , Link} from 'react-router-dom';
import { axiosInstance } from '../../api/axiosInstance';
import { toast , Toaster} from 'react-hot-toast';
import { GoogleLogin ,GoogleOAuthProvider } from '@react-oauth/google';
import { Spinner } from '@material-tailwind/react';


const Register = () => {
    const [name , setName] = useState<string>('');
    const [email  , setEmail] = useState<string>('');
    const [mobNumber, setMobNumber] = useState<string>(''); 
    const [role , setRole] = useState<string>('');
    const [password , setPassword] = useState<string>('');
    const [otp , setOtp] = useState<string>('');
    
    const [passwordStrength , SetPasswordstrength] = useState<string>('');
    const [showOtpModal , setShowOtpModal] = useState<boolean>(false);
    const [waitingForOtp , setWaitingForOtp] = useState<boolean>(false);
    const [resendTimer , setResendTimer] = useState<number>(0);
    const [isResentDisabled , setIsResentDisabled] = useState<boolean>(false);

    const openOtpModal = () => {
      setShowOtpModal(true);
    }

    const closeOtpModal = () => {
      setShowOtpModal(false);
    }

    const navigate = useNavigate();

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setWaitingForOtp(true);
        
        axiosInstance.post('/auth/register' , {name , email , phone: mobNumber, role , password})
        .then((res) => {
          
          if(res.data.message){
            toast.success(res.data.message, {duration : 2000 , style : {color : '#fff' , background : 'black'}});

            openOtpModal()
          } 

          if(res.data.error) {
            toast.error(res.data.error , {duration : 2000 , style : {color : '#fff' , background : 'black'}});
          }
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          setWaitingForOtp(false);
        });
    }

    const otpSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      axiosInstance.post('/auth/otpregister', {name , email , phone: mobNumber, role , password , otp})
      .then((res) => {
        if(res.data.message){
          closeOtpModal();
          toast.success(res.data.message, {duration : 2000 , style : {color : '#fff' , background : 'black'}});

        setTimeout(() => {
          navigate('/login');
        }, 3000);
        }

        if(res.data.error){
          toast.error(res.data.error , {duration : 2000 , style : {color : '#fff' , background : 'black'}});
        }

      }).catch((error) => {
        console.log(error , 'axios otp submit err');
        
      })
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

  const resendOTP = () => {

    if(resendTimer === 0 && !isResentDisabled){

      axiosInstance.post('/auth/resend', {phone : mobNumber , email , name , password , role})
      .then((res) => {
        if(res.data.message){
          toast.success(res.data.message , {duration : 2000 , style : {color : '#fff' , background : 'black'}})
          setResendTimer(60);
          setIsResentDisabled(true);
        }

        if(res.data.error){
          toast.error(res.data.error , {duration : 2000 , style : {color : '#fff' , background : 'black'}});
        }
      }).catch((error) => console.log(error, 'resend otp error')
      )
    }
  }

  useEffect(() => {
    if(resendTimer > 0){
      const countDown = setInterval(() => {
        setResendTimer((prevTime) => {
          if (prevTime === 0) {
            clearInterval(countDown);
            setIsResentDisabled(false); // Reset isResentDisabled when timer reaches 0
            return 0;
          }
          return prevTime - 1;
        })
      }, 1000);
    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(countDown);
    };
    }
  } , [resendTimer]);

  return (
    <>
    <Toaster position='top-right'/>
    <GoogleOAuthProvider clientId='8989279973-hri4q1okjco23pch7n0mu8q0mp6ros97.apps.googleusercontent.com'>
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

        <div className="border-2 border-black border-dotted rounded-md bg-[#fafafa] p-5 shadow-md mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6" onSubmit={handleSubmit} >
            <div className='flex space-x-4'>
              <div className='w-1/2'>
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

            <div className='w-1/2'>
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
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone No.
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  value={mobNumber}
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  onChange={(e) => setMobNumber(e.target.value)}
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
                          ? 'text-[#5dc43e]'
                          : 'text-[#e84848]'
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


      {waitingForOtp ?  (
        <div className='fixed inset-0 bg-[#000] bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className='bg-[#fefefe] p-2 rounded w-72 flex justify-center'>
            <Spinner className='h-10 w-10' />
          </div>
        </div>
      ) : (
        null
      )}

      {showOtpModal && (
        <div className='fixed inset-0 bg-[#000] bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className='bg-[#fefefe] p-2 rounded w-72'>
            <h1 className='font-bold text-center text-xl'>Enter OTP</h1>

            <div className='flex flex-co justify-center'>
              <form onSubmit={otpSubmit}>
              <input type="text" value={otp} onChange={(e) => {
                const inputValue = e.target.value.replace(/\D/g, '');
                setOtp(inputValue);
              }}
              placeholder='OTP' className='border p-2 rounded mb-2' />
                  <div className='flex justify-end mb-2'>
                    <button type='button' onClick={resendOTP} disabled={isResentDisabled}
                    className={`px-5 py-2 rounded text-blue ${isResentDisabled ? 'bg-gray-400 cursor-not-allowed' : 'hover:text-[#2d2d78]'}`}>
                      Resend OTP {isResentDisabled ? `in ${resendTimer} seconds` : ''}
                    </button>
                  </div>

                <div className='text-center'>
                  <button  className='px-5 py-2 text-white rounded bg-blue'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Register