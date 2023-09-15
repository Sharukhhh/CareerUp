import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : 'http://localhost:3000',

    headers : {
        
    }
});


export const adminAxiosInstance = axios.create({
    baseURL : 'http://localhost:3000/admin' , 

    headers : {
        'Authorization' : `Bearer ${localStorage.getItem('adminToken')}`
    }
    
});
const token = localStorage.getItem('adminToken')
console.log(token , 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');