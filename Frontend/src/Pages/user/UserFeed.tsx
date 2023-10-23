import React , {useState , lazy , Suspense , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState from '../../Redux/rootstate/rootState';
import { axiosInstance } from '../../api/axiosInstance';
import UserNav from '../../Components/user/Nav/UserNav'
import ProfileCard from '../../Components/user/Profile/ProfileCard'
import ConnectionCard from '../../Components/user/cards/ConnectionCard'
import PostCards from '../../Components/user/postss/PostCards'
import { Spinner } from '@material-tailwind/react';
import CreatePost from '../../Components/user/postss/CreatePost';
import toast from 'react-hot-toast';
import {BsPersonFillAdd , BsFillPersonCheckFill , BsSendCheck} from 'react-icons/bs';
import {ImInfo} from 'react-icons/im';
const EditProfile = lazy(() => import('../../Components/user/modal/edit-user/EditProfile'));


const UserFeed = () => {
    const [userData , setUserData]  = useState<any>([]);
    const [posts , setPosts] = useState<any[]>([])
    const [listUsers , setListUsers] = useState<any[]>([]);
    // const [companies , setCompanies] = useState<any[]>([]);
    const [updateUI , setUpdateUI] = useState<boolean>(false);
      //modals
  const [showModal , setShowModal] = useState<boolean>(false);


  const openEditModal = () => {
    setShowModal(true);
  }

  const closeEditModal = () => {
    setShowModal(false);
  }

    const user = useSelector((state : RootState) => state.user.userCred);
    const isCandidate = user?.role === 'Candidate';

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

      axiosInstance.get('/listusers').then((res) => {
        if(res.data.message){
          setListUsers(res.data.users);
        }

        if(res.data.error){
          toast.error(res.data.error);
        }
      }).catch((err) => console.log(err, 'axios listing err'))

      // axiosInstance.get('/companies').then((res) => {
      //   if(res.data.message){
      //     setCompanies(res.data.companies);
      //   }
      //   if(res.data.error){
      //     toast.error(res.data.error);
      //   }
      // }).catch((err) => console.log(err, 'axios listing err'))
      
    }, [ updateUI]);


    const sendConnectionRequest = (userId : string) => {
      axiosInstance.get(`/send/${userId}`).then((res) => {
        if(res.data.message){
          toast.success(res.data.message);

          setUpdateUI((prev) => !prev);
        }

        if(res.data.error){
          toast.error(res.data.error , {duration : 2000 , icon : <ImInfo/> });
        }
      }).catch((error) => console.log('error while connection', error)
      )
    }

  // Function to add a new post to the 'posts' state
  const addNewPost = (newPost : any) => {
    console.log(newPost , 'hahaha');
    
    const postWithUserData = {
      ...newPost,
      name: userData?.name,
      profileImage: userData?.profileImage,
      headline: userData?.headline,
    };
    setPosts((prevPosts : any[]) => [...prevPosts, postWithUserData]);
  };
  return (
    <>
        <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <UserNav/>

            <div className='w-full flex flex-col md:flex-row  gap-2 lg:gap-4 pt-5 pb-10 h-full md:overflow-y-auto'>

                {/* left-side */}
                <div className='w-full md:w-1/4 lg:w-1/4 h-auto flex flex-col gap-6 overflow-y-auto'>
                    <ProfileCard updateUI={updateUI} userData={userData} openEditModal={openEditModal} />
                </div>

                {/* center */}   
                <div className='w-full flex-1 bg-bgColor flex flex-col gap-6 overflow-y-auto'>
                    <CreatePost  userData={userData} addNewPost={addNewPost} />
                    <PostCards userData={userData} posts={posts} setUpdateUI={setUpdateUI} showAllposts={true} />
                </div>

                {/* right-side */}
                <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
                    {/* <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                        <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                            <span>Follow Comapnies</span>
                        </div>
                    
                        <div className="w-full flex flex-col gap-4 pt-4">
                          {companies.map((company : any)=> {
                            return(
                            <div className="flex items-center justify-between" key={company?._id}>
                              <Link to=''  className='w-full flex gap-4 items-center cursor-pointer'>
                                <img src={company?.profileImage} alt="" 
                                className='w-10 h-10 object-cover rounded-full'
                                />
                                <div className='flex-1'>
                                  <p className='text-base font-medium text-ascent-1'>
                                    {company?.name}
                                  </p>
                                  <span className='text-sm text-ascent-2'>
                                    {company?.headline}
                                  </span>
                                </div>
                              </Link>

                              <div className='flex gap-1'>
                                <button className='bg-[#0444a430] text-sm p-1 rounded text-blue'>
                                  <BsFillPersonCheckFill size={18} /> 
                                </button>
                              </div>
                            </div>
                            )
                          })}
                        </div>
                    </div> */}

                    <div className="lg:hidden mt-4"></div>

                    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                        <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                            <span>Expand your connections</span>
                        </div>
                        {isCandidate ? (
                        <div className='w-full flex flex-col gap-4 pt-4'>
                            {listUsers?.map((user : any) => {
                              return(
                              <div className='flex items-center justify-between' key={user?._id}>
                                <Link to={`/account/${user?._id}`} className='w-full flex gap-4 items-center cursor-pointer' key={user?._id}>
                                  <img src={user?.profileImage} alt=""
                                  className='w-10 h-10 object-cover rounded-full'
                                  />
                                  <div className='flex-1'>
                                    <p className='text-base font-medium text-ascent-1'>
                                      {user?.name}
                                    </p>
                                    <span className='text-sm text-ascent-2'>
                                      {user?.headline}
                                    </span>
                                  </div>
                                </Link>

                                {userData?.connections?.some((conn : any) => conn.userId.toString() === user?._id) ? (
                                // Render this when the user is connected
                                  <div className='flex gap-1'>
                                    <button 
                                      className='bg-[#0444a430] text-sm p-1 rounded text-blue'>
                                      <BsFillPersonCheckFill size={18} /> 
                                    </button>
                                  </div>
                                ) : (
                                // Render this when the user is not connected
                                  <div className='flex gap-1'>
                                    <button onClick={() => sendConnectionRequest(user?._id) }
                                      className='bg-[#0444a430] text-sm p-1 rounded text-blue'>
                                      <BsPersonFillAdd size={18} /> 
                                    </button>
                                  </div>
                                )}
                              </div>
                              )
                            })}
                        </div>
                        ) : (
                          <div className='w-full flex flex-col gap-4 pt-4'>
                            <p className="text-ascent-2 text-center py-4">
                              Loading...........
                            </p>
                          </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <Suspense fallback={<Spinner />}>
            <EditProfile setUpdateUI={setUpdateUI} userData={userData} visible={showModal} closeEditModal={closeEditModal} />
        </Suspense>
    </>
  )
}

export default UserFeed