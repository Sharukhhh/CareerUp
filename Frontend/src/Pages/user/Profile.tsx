import {useState , useEffect , lazy , Suspense  } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import {FaUserGraduate} from 'react-icons/fa6';
import PostCards from '../../Components/user/postss/PostCards';
import UserNav from "../../Components/user/Nav/UserNav";
import ProfileCard from "../../Components/user/Profile/ProfileCard";
import RootState from "../../Redux/rootstate/rootState";
import { axiosInstance } from "../../api/axiosInstance";
import { BiSolidEdit} from 'react-icons/bi';
import {BsBriefcase} from 'react-icons/bs';
import {MdDelete} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const EditProfile = lazy(() => import('../../Components/user/modal/edit-user/EditProfile'));
const DeleteBox = lazy(() => import('../../Components/user/modal/PermissionBox'));

const Profile = () => {

  const storedUserInfo = useSelector((state: RootState) => state.user.userCred);
  const navigate = useNavigate();
  const [userData , setUserData]  = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);
  const [jobs , setJobs] = useState<any>([]);
  const [updateUI , setUpdateUI] = useState<boolean>(false);
  const [loading ,setIsLoading] = useState<boolean>(true);

  const [deleteType, setDeleteType] = useState<'education' | 'profession' | 'job'>('education');
  const [deleteId, setDeleteId] = useState<string>('');

  //modals
  const [showModal , setShowModal] = useState<boolean>(false);
  const [showBox , setShowBox] = useState<boolean>(false);

  const openEditModal = () => {
    setShowModal(true);
  }
  const closeEditModal = () => {
    setShowModal(false);
  }

  const openBox = (type: 'education' | 'profession' | 'job', id: string) => {
    setDeleteType(type);
    setDeleteId(id);
    setShowBox(true);
  }
  const closeBox = () => {
    setShowBox(false);
  }


  const user = useSelector((state : RootState) => state.user.userCred);

  const isCompany = user?.role === 'Company'; 

  const{ id } = useParams() ;

  const getOwnProfileData = () => {
    setIsLoading(true);
    axiosInstance.get('/ownProfile')
    .then((res) => {
      if(res.data.message){
        setUserData(res.data.user);
      }
    }).catch((error) => console.log(error , 'axios')
    ).finally(() => setIsLoading(false));
  }

  const fetchProfileData = (profileId : string) => {
    setIsLoading(true);
    axiosInstance.get(`/profile/${profileId}`).then((res) => {
      if(res.data.message){
        setUserData(res.data.user);
      }
    }).catch((error) => console.log(error , 'axios')
    ).finally(() => setIsLoading(false));
  }

  const fetchUserPosts = () => {
    setIsLoading(true);
    axiosInstance.get('/getposts').then((res) => {
      if(res.data.message){
        setPosts(res.data.posts);
      }
    }).catch((err) => console.log(err, 'axios posts err')
    ).finally(() => setIsLoading(false));
  }

  const otherUserPostsFetch = (userId : string) => {
    setIsLoading(true);
    axiosInstance.get(`/userposts/${userId}`).then((res) => {
      if(res.data.message){
        setPosts(res.data.posts);
      }
    }).catch((error) => console.log(error , 'user own posts fetch error')
    ).finally(() => setIsLoading(false))
  }

  const fetchPostedJobs = () => {
    setIsLoading(true);
    axiosInstance.get(`/postedjobs`).then((res) => {
      if(res.data.message){
        setJobs(res.data.jobs);
      }
    }).catch((error) => console.log('jobs fetch error', error)
    )
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if(id){
      fetchProfileData(id);
      otherUserPostsFetch(id);
    } else {
      getOwnProfileData();
      fetchUserPosts();
    }
  },[updateUI , id]);


  useEffect(() => {
    if(isCompany){
      fetchPostedJobs();
    }
  }, [isCompany , updateUI])
  

  const navigateToInfo =(id : string) => {
    navigate(`/details/${id}`);
  }

  const navigateJobs = () => {
    navigate('/jobs');
  }


  return (
    <>
      <Helmet>
        <title>
          {id ? `${userData?.name}` : `${storedUserInfo?.username}`}
        </title>
      </Helmet>
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <UserNav />

        {loading ? (
          <span className='flex items-center justify-center mx-auto my-16'>
            <Spinner  className='h-24 w-24'/>
          </span> 
        ) : (
        <>  
          <div className="w-full flex flex-col md:flex-row gap-2 lg:gap-4 pt-5 pb-10 h-full md:overflow-y-auto">
            {/* Left */}
            <div className="w-full md:w-1/4 lg:w-1/4 h-auto flex flex-col gap-6 overflow-y-auto">
              <ProfileCard  userData = {userData} openEditModal={openEditModal} />
              {/* <ConnectionCard userData={userData} /> */}
            </div>

            {/* center */}
            <div className="w-full flex-1 bg-bgColor px-4 flex flex-col gap-6 overflow-y-auto">
              <PostCards setUpdateUI={setUpdateUI} userData={userData} showAllposts={false} posts={posts} />

            </div>

            {/* right */}
              {/* User Profession /  */}
              {user?.role === 'Candidate' ? (
                <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
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
                            <span className='text-ascent-2 text-sm'>{item?.jobLocation}</span>
                          </div>

                          {user?.userId === userData?._id && (
                          <div className='flex me-1 flex-col gap-4'>
                            <button onClick={() => navigateToInfo(item?._id)}
                            className='text-sm p-1 rounded text-[#333030] hover:scale-125'>
                              <BiSolidEdit />
                            </button>
                            <button onClick={() => openBox( 'profession' , item?._id)}
                            className='bg-gray-300 text-sm p-1 rounded text-[#333030] hover:scale-125'>
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
                            <span className='text-ascent-2 text-sm'>{item?.instituteLocation}</span> <br />
                          </div>

                          {user.userId === userData._id && (
                          <div className='flex me-1 flex-col gap-4'>
                            <button onClick={() => navigateToInfo(item?._id)}
                            className='bg-gray-300 text-sm p-1 rounded text-[#333030] hover:scale-125'>
                              <BiSolidEdit />
                            </button>
                            <button onClick={() => openBox( 'education' , item?._id)}
                            className='bg-gray-300 text-sm p-1 rounded text-[#333030] hover:scale-125'>
                              <MdDelete />
                            </button>
                          </div>
                          )}
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
                      <button onClick={navigateJobs} className='bg-blue px-3 rounded-lg py-1 text-white text-xs'>View in Detail</button>
                    </div>
                    <div className="w-full flex flex-col gap-4 pt-4 rounded-md p-4 shadow-lg">
                      {jobs?.length > 0 ? (
                        jobs?.map((job : any) => {
                          return(
                          <div key={job?._id} className="flex items-center justify-between mb-3 border-b" >
                            <div className='flex-1'>
                              <p className='font-bold text-lg'>{job?.position}</p>
                              <span className='text-md'>{job?.location}</span>
                              <span className='text-ascent-2 text-sm'></span>
                              <span className='text-ascent-1 text-xs'>

                              </span>
                            </div>

                            <div className='flex me-1 flex-col gap-4'>
                              <button onClick={() => navigateToInfo(job?._id)}
                              className='text-sm p-1 rounded text-[#333030] hover:scale-125'>
                                <BiSolidEdit/>
                              </button>
                              <button onClick={() => openBox('job' , job?._id)}
                              className='text-sm p-1 rounded text-[#333030] hover:scale-125'>
                                <MdDelete/>
                              </button>
                            </div>
                          </div>
                          )
                          })
                      ) : ( 
                        <p className='text-gray-600 text-center'>Not Added </p>
                      )} 
                    </div>
                  </div>
                </div>  
              )}
          </div>
        </>
        )}
      </div>

      <Suspense fallback={<Spinner/>}>
        <DeleteBox 
        setUpdateUI={setUpdateUI} 
        visible={showBox} 
        type={deleteType}
        dataId={deleteId}
        closeBox={closeBox} />
      </Suspense>

      <Suspense fallback={<Spinner/>}>
        <EditProfile 
        setUpdateUI={setUpdateUI} 
        userData = {userData} 
        visible={showModal} 
        closeEditModal={closeEditModal} />
      </Suspense>
    </>  
  )
}

export default Profile