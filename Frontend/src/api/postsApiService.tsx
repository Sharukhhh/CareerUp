import { axiosInstance } from "./axiosInstance";
import toast from "react-hot-toast";


export const getLoginUserData = async () => {
    try {
        const response = await axiosInstance.get('/ownProfile')

        if(response.data.message){
            toast.success(response.data.message);
            return true;
        }

    } catch (error) {
        console.log(error , 'error while fetching user')
        return false;
    }
}

export const likeAndDislikePost = async (postId : string) => {
    try {
        const response = await axiosInstance.get(`/like/${postId}`)

        if(response.data.message){
            toast.success(response.data.message);
            return true;
        }
        if (response.data.error) {
            toast.error(response.data.error);
        }

    } catch (error) {
        console.log(error , 'error while liking post')
        return false;
    }
}


export const saveAndUnsavePost = async (postId : string) => {
    try {
        const response = await axiosInstance.get(`/save/${postId}`)

        if(response.data.message){
            toast.success(response.data.message);
            return true;
        }
        if (response.data.error) {
            toast.error(response.data.error);
        }

    } catch (error) {
        console.log(error , 'error while saving post')
        return false;
    }
}

export const deleteThePost = async (postId : string) => {
    try {
        const response = await axiosInstance.patch(`/deletepost/${postId}`)

        if(response.data.message){
            toast.success(response.data.message);
            return true;
        }
        if (response.data.error) {
            toast.error(response.data.error);
        }

    } catch (error) {
        console.log(error , 'error while deleting post')
        return false;
    }
}

export const deleteTheComment = async (commentId : string) => {
    try {
        const response = await axiosInstance.delete(`/delete-comment/${commentId}`)

        if(response.data.message){
            toast.success(response.data.message);
            return true;
        }
        if (response.data.error) {
            toast.error(response.data.error);
        }

    } catch (error) {
        console.log(error , 'error while deleting comment')
        return false;
    }
}