import React , {useState} from 'react';
import {BiImages, BiSend, BiSolidVideo } from 'react-icons/bi';
import { axiosInstance } from '../../../api/axiosInstance';
import toast from 'react-hot-toast';
import { errorPopAlert } from '../../../utils/alerts';
import DotsLoader from '../../loaders/DotsLoader';
interface CreatePostProps{
    userData : any;
    addNewPost: (newPost: any) => void;
}

const CreatePost : React.FC<CreatePostProps> = ({userData , addNewPost }) => {

    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif' ];
    const allowedVideoExtensions = ['mp4', 'mov', 'avi'];

    const [content , setContent] = useState<string>('');
    const [image , setImage] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [isUploading , setIsUploading] = useState<boolean>(false);

    const displayFile = () => {
        if(image){
            return <img src={URL.createObjectURL(image)} alt='image' className="w-3/4 h-1/2 max-h-fit mt-2  rounded-3xl"/>
        } else if(video){
            return <img src={URL.createObjectURL(video)} alt='video' className="w-3/4 h-1/2 max-h-fit mt-2  rounded-3xl" />
        } else {
            return null;
        }
    }

    const handleImageChange = (e  :any ) => {
        const inputImage = e.target.files[0];

        if(inputImage){
            const fileExtension = inputImage.name.split('.').pop().toLowerCase();

            if(allowedImageExtensions.includes(fileExtension)){
                setImage(inputImage);
            }else{
                toast.error('Invalid Image Format');
            }
        }
    }

    const handleVideoChange = (e : any) => {
        const videoInput = e.target.files[0];

        if(videoInput){
            const fileExtension = videoInput.name.split('').pop().toLowerCase();

            if(allowedVideoExtensions.includes(fileExtension)){
                setVideo(videoInput);
            } else {
                toast.error('Invalid video format');
            }
        }
    }


    const postSubmit = async (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try {
            setIsUploading(true)
            if(!content && !image && !video){
                errorPopAlert('Invalid Entry');
                return ;
            }
            const formData = new FormData();
            if(content){
                formData.append('content' , content);
            }
            if(image){
                formData.append('image' , image);
            }
            if(video){
                formData.append('video' , video);
            }

            const response = await axiosInstance.post(`/addPost` , formData)
            if(response.data.message){
                toast.success(response.data.message);
                setContent('');
                setImage(null);
                setVideo(null);
                addNewPost(response.data.newPost)
            }

            if(response.data.error){
                toast.error(response.data.error);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsUploading(false)
        }
    } 

    return (
        <>
            <form onSubmit={postSubmit} className="bg-primary px-4 rounded-lg flex flex-col " encType='multipart/form-data'>
                <div className='flex flex-col p-2 border-b border-[#66666645]'>
                    <div className="w-full flex items-center gap-2 py-4">
                        {userData?.profileImage ? (
                            <img 
                            src={userData?.profileImage} 
                            alt=""
                            className="w-14 h-14 object-cover rounded-full bg-gray-700"
                            />
                        ) : (
                            <img src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`} alt="" className='w-14 h-14 object-cover rounded-full opacity-70'/>
                        )}
                        <div className='w-full flex flex-col'>
                            <textarea rows={2} name="description"
                            value={content} onChange={(e) => setContent(e.target.value)}
                            className="rounded-lg border border-[#66666645] outline-none text-sm 
                            text-ascent-1 resize-none px-4 bg-gray-100 py-4 w-full placeholder:text-[#666] break-words" placeholder="Add a Post!" 
                            />
                        </div>
                    </div>
                <div className='image-show flex flex-grow justify-center'>{displayFile()}</div>
                </div>
                <div className='flex items-center justify-between py-4'>
                    <label htmlFor="imgUpload" className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
                        <input type="file" onChange={handleImageChange} 
                        className='hidden' name='image' accept='.jpg .png .jpeg' id='imgUpload' />
                        <BiImages />
                        <span>Images</span>
                    </label>

                    <label htmlFor="videUpload" className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
                        <input type="file" onChange={handleVideoChange}
                        className='hidden' name='video' accept='.mp4, .avi, .mov, video/*' id='videoUpload' />
                        <BiSolidVideo />
                        <span>Videos</span>
                    </label>
                    
                    {isUploading ? (
                        <DotsLoader/>
                    ) : (
                        <button
                            className="flex items-center text-white font-semibold bg-[#0444a4] hover:scale-105 ml-4 px-4 py-2 rounded-full"
                            type="submit"
                        >
                            <BiSend className="w-5 h-5 mr-2" />
                            Post
                        </button>
                    )}
                </div>
            </form>
        </>
    )
}

export default CreatePost