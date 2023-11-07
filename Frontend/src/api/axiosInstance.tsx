import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
    // baseURL :'http://localhost:3000'
    baseURL :  'https://careerup.website' 
});

axiosInstance.interceptors.request.use((config) => {

    const userToken = localStorage.getItem('userToken');

    if (userToken !== null) {
        config.headers.authorization = `Bearer ${userToken}`;
    }
    return config;
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.error || 'An error occurred';
            // Show error toast with errorMessage
            toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
        } else {
            console.error('Axios error:', error);
        }
        return Promise.reject(error);
    }
)



export const adminAxiosInstance = axios.create({
    // baseURL :  'http://localhost:3000' 
    baseURL :  'https://careerup.website/admin' 

});

adminAxiosInstance.interceptors.request.use((config) => {
    const adminToken = localStorage.getItem('adminToken');

    if(adminToken !== null){
        config.headers.authorization = `Bearer ${adminToken}`;
    }
    return config;
})

adminAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.error || 'An error occurred';
            // Show error toast with errorMessage
            toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
        } else {
            console.error('Axios error:', error);
        }
        return Promise.reject(error);
    }
)
