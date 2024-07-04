import { axiosInstance } from "./axiosInstance"

interface UserData {
    username: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}


export const signUp = async(userData: UserData , otp: string, isNotOtp: boolean) => {
    let response ;

    if(isNotOtp) {
        response = await axiosInstance.post('/auth/register' , {userData});

    } else {
        response  = await axiosInstance.post('/auth/otpregister' , {userData , otp});
    }
    return response;
}



export const login = async (userData: UserData) => {
    const response = await axiosInstance.post('/auth/login' , {userData});
    return response;
}

export const manageGoogleAuth = async (purpose: string) => {
    let response;
    if(purpose === 'signup') {
        response = await axiosInstance.post('/auth/google');

    } else if (purpose === 'login') {
        response = await axiosInstance.post('/auth/google/login');
    }
    return response;
}