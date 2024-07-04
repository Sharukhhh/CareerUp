import React from 'react'
import InputAuth from '../../Components/user/fields/InputAuth'
import {Link, useNavigate} from 'react-router-dom'
import { useAuthFormHook } from '../../hooks/authFormHook'
import { GoogleLogin ,GoogleOAuthProvider } from '@react-oauth/google';
import { validateCreds, validatePassword } from '../../utils/authFormValidate';
import { errorPopAlert, passwordValidationAlert } from '../../utils/alerts';
import DotsLoader from '../../Components/loaders/DotsLoader';
import { login, signUp } from '../../api/authApiService';
import { toast } from 'react-hot-toast';
import { otpHandler } from '../../utils/otpHandler';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../Redux/slices/slice';
import { axiosInstance } from '../../api/axiosInstance';


interface AuthProps {
    isLogin: boolean
}

const Auth: React.FC<AuthProps> = ({isLogin}) => {

    const {userData , setIsLoading , handleChangeData , isLoading} = useAuthFormHook();
    const { showOtpModal } = otpHandler()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            if(!isLogin) {
                const {result , message} = validateCreds(userData , true);
                if(!result) {
                    errorPopAlert(message);
                    return;
                }

                if(!validatePassword(userData.password)) {
                    passwordValidationAlert();
                    return;
                }
                const response = await signUp(userData , '', true);
                toast.success(response?.data?.message);
                const otp = await showOtpModal();
                const res = await signUp(userData , otp, false);
                if(res.data.message) {
                    toast.success(response?.data?.message);
                    navigate('/login');
                }

            } else {
                const {result , message} = validateCreds(userData , false);
                if(!result) {
                    errorPopAlert(message);
                    return;
                }
                const response = await login(userData);
                if(response.data.userData){
                    dispatch(setUserInfo(response.data.userData));
                    const token = response.data.token;
                    localStorage.setItem('userToken', JSON.stringify(token));
            
                } else if(response.data.companyData){
                    dispatch(setUserInfo(response.data.companyData));
                    const token = response.data.token;
                    localStorage.setItem('userToken', JSON.stringify(token));
                }
                toast.success(response.data.message , {duration : 2000 , style : {color : '#fff' , background : 'black'}});
                setTimeout(() => {
                    navigate('/feed');
                }, 3000);           
            }
        } catch (error) {
            return error;
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <>  
            <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
                <div className='bg-white shadow-md rounded-lg overflow-hidden w-full max-w-3xl mx-auto md:flex'>
                    <div className='w-full md:w-1/2 p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-gray-300'>
                        <h2 className='text-2xl font-bold mb-4'>
                            {isLogin ? 'Welcome Back!' : 'Join CareerUP'}
                        </h2>
                        <p className='text-gray-600 mb-4'>
                            {isLogin ? 'Login to Continue' : 'Sign up to explore new opportunities'}
                        </p>
                        {isLogin ? (
                            <p className='mt-10 text-center text-sm text-gray-500"'>
                                Do not have an Account?  
                                <Link to={'/register'} className='font-semibold leading-6 text-violet-900 hover:text-indigo-500'>
                                    Register
                                </Link>
                            </p>
                        ) : (
                        <p className='mt-10 text-center text-sm text-gray-500"'>
                            Already a user? 
                            <Link to={'/login'} className='font-semibold leading-6 text-violet-900 hover:text-indigo-500'>
                                Sign in
                            </Link>
                        </p>
                        )}
                    </div>

                    <div className='w-full md:w-1/2 p-8'>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            {isLogin ? (
                                <>
                                    <InputAuth
                                        labelName='email'
                                        name='email'
                                        value={userData.email}
                                        onChange={handleChangeData}
                                        placeholder='user@gmail.com'
                                        type='email'
                                        isNormalInput={true}
                                    />
                                    <InputAuth
                                        labelName='password'
                                        name='password'
                                        value={userData.password}
                                        onChange={handleChangeData}
                                        placeholder='**********'
                                        type='password'
                                        isNormalInput={true}
                                    />
                                </>
                            ) : (
                                <>
                                    <InputAuth
                                        labelName='username'
                                        name='username'
                                        value={userData.username}
                                        onChange={handleChangeData}
                                        placeholder='John Doe'
                                        type='text'
                                        isNormalInput={true}
                                    />
                                    <InputAuth
                                        labelName='email'
                                        name='email'
                                        value={userData.email}
                                        onChange={handleChangeData}
                                        placeholder='user@gmail.com'
                                        type='email'
                                        isNormalInput={true}
                                    />
                                    <InputAuth
                                        labelName='phone'
                                        name='phone'
                                        value={userData.phone}
                                        onChange={handleChangeData}
                                        placeholder='95*******3'
                                        type='text'
                                        isNormalInput={true}
                                    />
                                    <InputAuth
                                        labelName='role'
                                        name='role'
                                        type=''
                                        value={userData.role}
                                        onChange={handleChangeData}
                                        placeholder='Select Your Role'
                                        isNormalInput={false}
                                    />
                                    <InputAuth
                                        labelName='password'
                                        name='password'
                                        value = {userData.password}
                                        onChange={handleChangeData}
                                        placeholder='**********'
                                        type='password'
                                        isNormalInput={true}
                                    />
                                </>
                            )}
                            {isLoading ? (
                                <DotsLoader/>
                            ) : (
                                <button type='submit' className='w-full bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                                {   isLogin ? 'Login' : 'Signup'}
                                </button>
                            )}

                            
                            <p className='lg:text-lg font-semibold text-center py-1 text-black'>OR</p>

                            <GoogleLogin
                            onSuccess={ credRes  => {
                                if(!isLogin) {
                                    axiosInstance.post('/auth/google' , credRes).then((res) => {
                                        if(res.data){
                                            toast.success(res.data.message, {duration : 2000 , style : {color : '#fff' , background : 'black'}});
                                            setTimeout(() => {
                                                navigate('/login');
                                            }, 3000);
                                        }
                                    }).catch((err) => console.log(err, 'axios catch err google signup')
                                    )
                                } else {
                                    axiosInstance.post('/auth/google/login' , credRes).then((res) => {

                                        if(res.data.message){
                                            dispatch(setUserInfo(res.data.userData));
                                            localStorage.setItem('userToken' , JSON.stringify(res.data.token));
                                            toast.success(res.data.message , {duration : 2000 , style : {color : '#fff' , background : 'black'}});
                                            setTimeout(() => {
                                                navigate('/feed');
                                            }, 3000);
                                        } else if(res.data.error){
                                            toast.error(res.data.error);
                                        }
                                    }).catch((err) => console.log(err , 'axio catch err g login')
                                    )
                                }
                            } }
                            onError={() => {
                                errorPopAlert('Google authentication failed! Please Try Later');
                                return;
                            }}
                            type='standard'
                            theme='filled_black'
                            size='large'
                            text='continue_with'
                            shape='rectangular'
                            logo_alignment='center'
                            ux_mode='popup'
                            />
                        </form>
                    </div>
                </div>
            </div>
            </GoogleOAuthProvider>
        </>
    )
}

export default Auth