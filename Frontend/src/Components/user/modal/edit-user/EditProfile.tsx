import React , {useState , useEffect} from 'react'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux';
import RootState from '../../../../Redux/rootstate/rootState';
import { axiosInstance } from '../../../../api/axiosInstance';
import toast from 'react-hot-toast';
import DotsLoader from '../../../loaders/DotsLoader';



interface EditProfileProps {
    userData : any;
    visible : boolean;
    setUpdateUI :(data: any) => void;
    closeEditModal : () => void;
}


const EditProfile: React.FC<EditProfileProps> = ({visible , closeEditModal , userData , setUpdateUI}) => {

    const user = useSelector((state : RootState) => state.user.userCred);
    

    const [headline , setHeadline] = useState<string>(userData?.headline);
    const [location , setLocation] = useState<string>(userData?.location);
    const [profileImage , setProfileImage] = useState<File | null>(null);
    const [resume , setResume] = useState<File | null>(null);
    const [profileImageError, setProfileImageError] = useState<string | null>(null);
    const [resumeError, setResumeError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const clearError = () => {
            setTimeout(()=> {
                setProfileImageError(null);
                setResumeError(null);
            }, 3000);
        };

        if(profileImageError || resumeError){
            clearError();
        }
    }, [profileImageError , resumeError]);

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if(file){
            if(file.type.startsWith('image/')){
                setProfileImage(file);
                setProfileImageError(null);
            } else {
                setProfileImage(null);
                setProfileImageError('Invalid file format Please choose an image.');
            }
        }
    }

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if(file){
            if(file.type === 'application/pdf'){
                setResume(file);
                setResumeError(null);
            } else {
                setResume(null);
                setResumeError('Invalid file format. Please choose a PDF file.');
            }
        }
    }

    const editSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(!loading);
            if(!headline || !location || !profileImage ){
                return toast.error('Provide Details' , {duration : 2000});
            }

            const formData = new FormData();
            formData.append('headline' , headline);
            formData.append('location' , location);
            if(profileImage){
                formData.append('profileImage' , profileImage);
            }
            if(resume){
                formData.append('resume' , resume);
            }

            const response = await axiosInstance.put(`/addBasic` , formData);
            if(response.data?.message) {
                setUpdateUI((prev : any) => !prev);
                closeEditModal();
                toast.success(response.data.message);
            }else{
                toast.error(response.data.error);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(!loading);
        }
    }

  return (
    <>
    {visible && (
        <div className='fixed z-50 inset-0 overflow-y-auto' onClick={closeEditModal} >
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity'>
                    <div className='absolute inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm'>
                        <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
                            
                        </span>
                            &#8203;
    
                        <div className='inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                                role='dialog' aria-modal = 'true' aria-labelledby='modal-headline' onClick={(e) => e.stopPropagation()}>
                                
                            <div className='flex justify-between px-6 pt-5 pb-2'>
                                    <label 
                                    htmlFor="name"
                                    className='block font-medium text-xl text-ascent-1 text-left'>Provide
                                    </label>
    
                                    <button className='text-ascent-1 cursor-pointer' onClick={closeEditModal}>
                                        <IoMdClose size={22} />
    
                                    </button>
                            </div>
                            
                                <form onSubmit={editSubmit} encType='multipart/form-data' className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6'>
    
                                    <label className='text-ascent-2 text-sm mb-2' htmlFor="headline">Headline</label>
                                    <input type="text" value={ headline} name='healine' 
                                    onChange={(e) => setHeadline(e.target.value)} className='w-full bg-secondary rounded border 
                                    border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]' 
                                    />
    
                                    <label className='text-ascent-2 text-sm mb-2' htmlFor="name">Location</label>
                                    <input type="text" value={  location} name='location' 
                                    onChange={(e) => setLocation(e.target.value)} className='w-full bg-secondary rounded border 
                                    border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]' 
                                    />

                                    <div className='flex gap-2'>
                                        <div>
                                            <label htmlFor="profileImage" className='text-ascent-2 text-sm mb-2'>Profile Picture</label>
                                            <div className='relative w-16 h-16 rounded-full border-2 border-dashed overflow-hidden'>
                                                {profileImage ? (
                                                    <img src={URL.createObjectURL(profileImage)} alt="img" className='w-full h-full object-cover' />
                                                ) : (
                                                    <div className='w-full h-full bg-secondary flex items-center justify-center'>
                                                        <span className='text-ascent-1 text-sm'>Add</span>
                                                    </div>
                                                )}
                                            </div>
                                            <input type='file' accept='image/*' name='profileImage' 
                                            onChange={handleProfileImageChange} className='mt-3' />
                                            {profileImageError && (
                                                <p className='text-red-500 text-xs mt-1'>{profileImageError}</p>
                                            )}
                                        </div>
                                        {user?.role === 'Candidate' && (
                                        <div>
                                            <label htmlFor="resume" className='text-ascent-2 text-sm mb-2'>Resume</label>
                                            <div className='relative w-32 h-16 rounded-lg border-2 border-dotted overflow-hidden'>
                                                {resume ? (
                                                    <a href={URL.createObjectURL(resume)} target='_blank' rel='noopener noreferrer'>
                                                        <div className='w-full h-full bg-secondary flex items-center justify-center'>
                                                            <span className='text-ascent-1 texts-sm'>Resume Added</span>
                                                        </div>
                                                    </a>
                                                ) : (
                                                    <div className='w-full h-full bg-secondary flex items-center justify-center'>
                                                        <span className='text-ascent-1 text-sm'>Add Resume</span>
                                                    </div>
                                                )}
                                            </div>
                                            <input type="file" name="resume" accept='.pdf' 
                                            onChange={handleResumeChange} className='mt-3' />
                                            {resumeError && (
                                                <p className='text-red-500 text-xs mt-1'>{resumeError}</p>
                                            )}
                                        </div>
                                        )}
                                    </div>
                                    {loading ? (
                                        <div className='flex justify-center items-center'>
                                            <DotsLoader/>
                                        </div>
                                    ) : (
                                        <button type='submit' className='inline-flex mt-4 justify-center rounded-md bg-blue px-8 py-3 mb-4 text-sm font-medium text-white outline-none'>
                                            Save
                                        </button>
                                    )}
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>





    )}
    </>
  )
}

export default EditProfile