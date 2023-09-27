import React , {useState} from 'react'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux';
import RootState from '../../../../Redux/rootstate/rootState';
import { axiosInstance } from '../../../../api/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface EditProfileProps {
    userData : any;
    visible : boolean;
    closeEditModal : () => void;
}


const EditProfile: React.FC<EditProfileProps> = ({visible , closeEditModal , userData}) => {

    const user = useSelector((state : RootState) => state.user.userCred);
    const navigate = useNavigate();

    const [headline , setHeadline] = useState<string>(userData?.headline || '');
    const [location , setLocation] = useState<string>(userData?.location || '');
    const [profileImage , setImage] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
          }
    }

    const editSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('headline', headline);
        formData.append('location', location);

        if (profileImage) {
          formData.append('profileImage', profileImage);
        }
        
        axiosInstance.put(`/addBasic/${user?.userId}` , formData).then((res) => {

            if(res.data.message){
                setHeadline('');
                setLocation('');
                setImage(null);
                closeEditModal();

                toast.success(res.data.message);
            }else{
                toast.error(res.data.error);
            }
        }).catch((err) => console.log(err)
        )
    }

  return (
    <>
    {visible && (
        <div className='fixed z-50 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity'>
                    <div className='absolute inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm'>
                        <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
                            
                        </span>
                            &#8203;
    
                        <div className='inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                                role='dialog' aria-modal = 'true' aria-labelledby='modal-headline'>
                                
                            <div className='flex justify-between px-6 pt-5 pb-2'>
                                    <label 
                                    htmlFor="name"
                                    className='block font-medium text-xl text-ascent-1 text-left'>Edit Profile
                                    </label>
    
                                    <button className='text-ascent-1' onClick={closeEditModal}>
                                        <IoMdClose size={22} />
    
                                    </button>
                            </div>
                            
                                <form onSubmit={editSubmit} encType='multipart/form-data'  className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6'>
    
                                    <label className='text-ascent-2 text-sm mb-2' htmlFor="headline">Headline</label>
                                    <input type="text" value={headline} name='healine' 
                                    onChange={(e) => setHeadline(e.target.value)} className='w-full bg-secondary rounded border 
                                    border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]' 
                                    />
    
                                    <label className='text-ascent-2 text-sm mb-2' htmlFor="name">Location</label>
                                    <input type="text" value={location} name='location' 
                                    onChange={(e) => setLocation(e.target.value)} className='w-full bg-secondary rounded border 
                                    border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]' 
                                    />
    
                                    <label className='text-ascent-2 text-sm mb-2' htmlFor="name">Profile Picture</label>
                                    <input type="file"  accept="image/*" name='profileImage' 
                                    onChange={handleFileChange} className='w-full bg-secondary rounded border 
                                    border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]' 
                                    />

                                    <button type='submit' className='inline-flex mt-4 justify-center rounded-md bg-blue px-8 py-3 mb-4 text-sm font-medium text-white outline-none'>
                                        Save
                                    </button>
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