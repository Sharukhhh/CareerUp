import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : 'http://localhost:3000',


    // headers : {
    //     'authorization' : `Bearer ${localStorage.getItem('userToken')}`
    // }
});

axiosInstance.interceptors.request.use((config) => {

    const userToken = localStorage.getItem('userToken');

    if (userToken !== null) {
        config.headers.authorization = `Bearer ${userToken}`;
    }
    return config;
})


export const adminAxiosInstance = axios.create({
    baseURL : 'http://localhost:3000/admin' , 

    // headers : {
    //     'Authorization' : `Bearer ${localStorage.getItem('adminToken')}`
    // }
    
});

adminAxiosInstance.interceptors.request.use((config) => {
    const adminToken = localStorage.getItem('adminToken');

    if(adminToken !== null){
        config.headers.authorization = `Bearer ${adminToken}`;
    }
    return config;
})
