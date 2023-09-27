import {useState , useEffect , lazy , Suspense  } from 'react';
import { Spinner } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { Toaster } from "react-hot-toast";
import {FaUserGraduate} from 'react-icons/fa6';
import ConnectionCard from "../../Components/user/cards/ConnectionCard";

import PostCards from '../../Components/user/postss/PostCards';
import UserNav from "../../Components/user/Nav/UserNav";
import ProfileCard from "../../Components/user/Profile/ProfileCard";
import RootState from "../../Redux/rootstate/rootState";
import { axiosInstance } from "../../api/axiosInstance";
import { BiSolidEdit} from 'react-icons/bi';
import {BsBriefcase} from 'react-icons/bs';
import {MdDelete} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const EditProfile = lazy(() => import('../../Components/user/modal/edit-user/EditProfile'));
const DeleteBox = lazy(() => import('../../Components/user/modal/PermissionBox'));
const EduConfirmBox = lazy(() => import('../../Components/user/modal/EduConfirmBox'));

const Profile = () => {

  const navigate = useNavigate();
  const [userData , setUserData]  = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);
  const [updateUI , setUpdateUI] = useState<boolean>(false);

  const [educationId , setEducationId] = useState<string>('');
  const [professionId , setProfessionId] = useState<string>('');

  //modals
  const [showModal , setShowModal] = useState<boolean>(false);
  const [showBox , setShowBox] = useState<boolean>(false);
  const [showEduBox , setShowEduBox] = useState<boolean>(false);

  const openEditModal = () => {
    setShowModal(true);
  }
  const closeEditModal = () => {
    setShowModal(false);
  }

  const openBox = (professionId : string) => {
    setProfessionId(professionId);
    setShowBox(true);
  }
  const closeBox = () => {
    setShowBox(false);
  }

  const openEduBox = (educationId : string) => {
    setEducationId(educationId);
    setShowEduBox(true);
  }
  const closeEduBox = () => {
    setShowEduBox(false);
  }

  const user = useSelector((state : RootState) => state.user.userCred);

  useEffect(() => {
    axiosInstance.get(`/profile/${user?.userId}`).then((res) => {
    
      if(res.data){
        setUserData(res.data.user);
      }
    }).catch((error) => console.log(error , 'axios')
    )

    axiosInstance.get('/getposts').then((res) => {
      if(res.data.message){
        setPosts(res.data.posts);
      }
    }).catch((err) => console.log(err, 'axios posts err')
    )
  }, [  user?.userId ,updateUI]);

  const navigateToInfo =(id : string) => {
    navigate(`/details/${id}`);
  }


  return (
    <>
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <Toaster position="top-center" />
        <UserNav userData={userData} />

        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* Left */}
          <div className="w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard userData = {userData} openEditModal={openEditModal} />
            <ConnectionCard />
          </div>

          {/* center */}
          <div className="flex-1 h-full border rounded-lg bg-primary px-4 flex flex-col gap-6 overflow-y-auto">
            <PostCards setUpdateUI={setUpdateUI} userData={userData} showAllposts={false} posts={posts} />

          </div>

          {/* right */}
            {/* User Profession /  */}
            {user?.role === 'Candidate' ? (
              <div className="w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
                <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                  <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b mb-2 border-[#66666645]">
                    <span>Experience / Profession</span>
                  </div>

                  {userData?.profession?.length > 0 ? (
                  <div className="w-full flex flex-col gap-4 pt-4 bg-light-blue-50 rounded-md p-4 shadow-lg">
                    {userData?.profession?.map((item : any) => {
                      return (
                      <div className="flex items-center justify-between" key={item?._id}>
                        <BsBriefcase size={25} className='w-14 h-14 me-5 text-blue' />
                        <div className='flex-1'>
                          <p className='font-bold text-lg text-gray-900'>{item?.role}</p>
                          <span className='text-md'>{item?.companyName}</span> <br />
                          <span className='text-ascent-2 text-sm'>{item?.location}</span>
                        </div>

                        {user?.userId === userData?._id && (
                        <div className='flex me-1 flex-col gap-4'>
                          <button onClick={() => navigateToInfo(item?._id)}
                          className='bg-gray-300 text-sm text-white p-1 rounded hover:bg-gray-900'>
                            <BiSolidEdit />
                          </button>
                          <button onClick={() => openBox(item?._id)}
                          className='bg-gray-300 text-sm text-white p-1 rounded hover:bg-gray-900'>
                            <MdDelete />
                          </button>
                        </div>
                        )}
                      </div>
                      )
                    })}
                  </div>
                  ) : (
                    <p className='text-gray-600 text-center'>Not Added </p>
                  )}
                </div>
            
              <div className="lg:hidden mt-4"></div>

                <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                  <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b mb-2 border-[#66666645]">
                    <span>Education</span>
                  </div>

                  {userData?.education?.length > 0 ? (
                  <div className="w-full flex flex-col gap-4 pt-4 bg-light-blue-50 rounded-md p-4 shadow-lg">
                    {userData?.education?.map((item : any) => {
                      return (
                      <>
                      <div className="flex items-center justify-between border-b border-[#423e3e87] p-1" key={item?._id}>
                        <FaUserGraduate size={25} className='w-14 h-14 me-5 text-blue' />
                        <div className='flex-1'>
                          <p className='font-bold text-lg text-gray-900'>{item?.fieldOfStudy}</p>
                          <span className='text-md'>{item?.institute}</span> <br />
                          <span className='text-ascent-2 text-sm'>{item?.location}</span> <br />
                          <span className='text-ascent-1 text-xs'>
                          {new Date(item?.from).toLocaleDateString()} - {new Date(item?.to).toLocaleDateString()}
                          </span>
                        </div>

                        <div className='flex me-1 flex-col gap-4'>
                          <button onClick={() => navigateToInfo(item?._id)}
                          className='bg-gray-300 text-sm text-white p-1 rounded hover:bg-gray-900'>
                            <BiSolidEdit />
                          </button>
                          <button onClick={() => openEduBox(item?._id)}
                          className='bg-gray-300 text-sm text-white p-1 rounded hover:bg-gray-900'>
                            <MdDelete />
                          </button>
                        </div>
                        
                      </div>
                      </>
                      )
                    })}
                  </div>
                  ):(
                    <p className='text-gray-600 text-center'>Not Added </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
                <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                  <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                    <span>Jobs By {user?.username}</span>
                  </div>
                  <div className="w-full flex flex-col gap-4 pt-4">
                    <div className="flex items-center justify-between">
              
                    </div>
                  </div>
                </div>
              </div>  
            )}
        </div>
      </div>

      <Suspense fallback={<Spinner/>}>
        <DeleteBox setUserData={setUserData} visible={showBox} closeBox={closeBox} professionId={professionId} />
      </Suspense>

      <Suspense fallback={<Spinner/>}>
        <EditProfile userData = {userData} visible={showModal} closeEditModal={closeEditModal} />
      </Suspense>

      <Suspense fallback={<Spinner/>}>
        <EduConfirmBox setUserData={setUserData} visible={showEduBox} closeEduBox={closeEduBox} educationId={educationId}   />
      </Suspense>
    </>  
  )
}

export default Profile