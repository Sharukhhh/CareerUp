import {useState , lazy , Suspense , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState from '../../Redux/rootstate/rootState';
import { axiosInstance } from '../../api/axiosInstance';
import UserNav from '../../Components/user/Nav/UserNav'
import ProfileCard from '../../Components/user/Profile/ProfileCard'
import PostCards from '../../Components/user/postss/PostCards'
import { Spinner } from '@material-tailwind/react';
import CreatePost from '../../Components/user/postss/CreatePost';
import toast from 'react-hot-toast';
import { BsFillChatLeftTextFill} from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';
const EditProfile = lazy(() => import('../../Components/user/modal/edit-user/EditProfile'));


const UserFeed = () => {
    const [userData , setUserData]  = useState<any>([]);
    const [posts , setPosts] = useState<any[]>([])
    const [updateUI , setUpdateUI] = useState<boolean>(false);
      //modals
  const [showModal , setShowModal] = useState<boolean>(false);
  const [loading , setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();


  const openEditModal = () => {
    setShowModal(true);
  }

  const closeEditModal = () => {
    setShowModal(false);
  }

    const user = useSelector((state : RootState) => state.user.userCred);
    const isCandidate = user?.role === 'Candidate';

    useEffect(() => {
      setIsLoading(true);
      axiosInstance.get(`/ownProfile`).then((res) => {
        if(res.data){
          setUserData(res.data.user);
        }
      }).catch((error) => {
        console.log(error , 'axios')
        // toast.error(error.response.data.message || error.response.data);
      }
      ).finally(() => setIsLoading(false))

      axiosInstance.get('/feedposts').then((res) => {
        if(res.data.message){
          setPosts(res.data.posts);
        }
      }).catch((err) => console.log(err, 'axios posts err')
      ).finally(() => setIsLoading(false))

    }, [ updateUI]);

    const navigateChat = () => {
      navigate('/message');
  }

  const unFollowCompany = (companyId : string) => {
    axiosInstance.get(`/follow-unfollow/${companyId}`)
    .then((res) => {
        if(res.data.message){
            toast.success(res.data.message);
            setUpdateUI((prev) => !prev);
        }
    }).catch((error) => console.log(error)
    )
}

  // Function to add a new post to the 'posts' state
  const addNewPost = (newPost : any) => {
    setPosts([...posts ,newPost ]);
  }

  return (
    <> 
      <Helmet>
        <title>Feeds - CareerUp</title>
      </Helmet>
        <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <UserNav/>

            {loading ? (
              <span className='flex items-center justify-center mx-auto my-16'>
                <Spinner  className='h-24 w-24'/>
              </span> 
            ) : (
            <div className='w-full flex flex-col md:flex-row  gap-2 lg:gap-4 pt-5 pb-10 h-full overflow-hidden'>

                {/* left-side */}
                
                <div className='w-full md:w-1/4 lg:w-1/4 h-auto flex flex-col gap-6 overflow-y-auto'>
                    <ProfileCard userData={userData} openEditModal={openEditModal} />
                </div>

                {/* center */}   
                <div className='w-full flex-1 bg-bgColor flex flex-col gap-6 overflow-y-auto'>
                    <CreatePost  userData={userData} addNewPost={addNewPost} />
                    <PostCards userData={userData} posts={posts} setUpdateUI={setUpdateUI} showAllposts={true} />
                </div>

                {/* right-side */}
                <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>

                    <div className="lg:hidden mt-4"></div>

                    {isCandidate && (
                      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                          <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                              <span>Your Connections</span>
                          </div>
                          <div className='w-full flex flex-col gap-4 pt-4'>
                              {userData?.connections?.map((connection : any) => {
                                return(
                                <div className='flex items-center justify-between' key={connection?._id}>
                                  <Link to={`/account/${connection?.userId?._id}`} className='w-full flex gap-4 items-center cursor-pointer'>
                                    {connection?.userId?.profileImage ? (
                                      <img src={connection?.userId?.profileImage} alt=""
                                      className='w-10 h-10 object-cover rounded-full'
                                      />
                                    ) : (
                                      <img src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`} alt="" 
                                      className='w-10 h-10 object-cover rounded-full' />
                                    )}
                                    <div className='flex-1'>
                                      <p className='text-base font-medium text-ascent-1'>
                                        {connection?.userId?.name}
                                      </p>
                                      <span className='text-sm text-ascent-2'>
                                        {connection?.userId?.headline}
                                      </span>
                                    </div>
                                  </Link>
                                  {user?.userId === userData?._id && (
                                  <div className='flex gap-1'>
                                      <button 
                                      className='text-sm p-1 rounded text-blue'
                                      >
                                          <BsFillChatLeftTextFill onClick={navigateChat} size={20} />
                                      </button>
                                  </div>
                                  )}

                                  {/* {userData?.connections?.some((conn : any) => conn.userId.toString() === user?._id) ? (
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
                                  )} */}
                                </div>
                                )
                              })}
                          </div>
                      </div>
                    )}

                    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                      <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                        <span>Following</span>
                      </div>
                      {userData?.followingCompanies?.length > 0 ? (
                      <div className='w-full flex flex-col gap-4 pt-4'>
                              {userData?.followingCompanies?.map((company : any) => {
                                return(
                                <div className='flex items-center justify-between' key={company?._id}>
                                  <Link to='' className='w-full flex gap-4 items-center cursor-pointer'>
                                    {company?.company?.profileImage ? (
                                      <img src={company?.company?.profileImage} alt=""
                                      className='w-10 h-10 object-cover rounded-full'
                                      />
                                    ) : (
                                      <img src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`} alt="" 
                                      className='w-10 h-10 object-cover rounded-full' />
                                    )}
                                    <div className='flex-1'>
                                      <p className='text-base font-medium text-ascent-1'>
                                        {company?.company?.name}
                                      </p>
                                      <span className='text-sm text-ascent-2'>
                                        {company?.company?.headline}
                                      </span>
                                    </div>
                                  </Link>
                                  <div className='flex gap-1'>
                                      <button onClick={() => unFollowCompany(company?.company?._id)}
                                      title='Unfollow'
                                      className='xs text-sm px-2 py-1 rounded text-white bg-blue'
                                      >
                                        unfollow
                                      </button>
                                  </div>
                                </div>
                                )
                              })}
                      </div>
                      ) : (
                        <div className='w-full flex flex-col gap-4 pt-4'>
                          <p className='text-gray-600 text-center'>None</p>
                        </div>
                      )}
                    </div>

                    {!isCandidate && (
                      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                        <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                          <span>Followers</span>
                        </div>
                        {userData?.followers?.length > 0 ? (
                        <div className='w-full flex flex-col gap-4 pt-4'>
                                {userData?.followers?.map((follower : any) => {
                                  return(
                                  <div className='flex items-center justify-between' key={follower?._id}>
                                    <Link to='' className='w-full flex gap-4 items-center cursor-pointer'>
                                      {follower?.company?.profileImage|| follower?.user?.profileImage ? (
                                        <img src={follower?.company?.profileImage || follower?.user?.profileImage} alt=""
                                        className='w-10 h-10 object-cover rounded-full'
                                        />
                                      ) : (
                                        <img src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`} alt="" 
                                        className='w-10 h-10 object-cover rounded-full' />
                                      )}
                                      <div className='flex-1'>
                                        <p className='text-base font-medium text-ascent-1'>
                                          {follower?.company?.name || follower?.user?.name}
                                        </p>
                                        <span className='text-sm text-ascent-2'>
                                          {follower?.company?.headline || follower?.user?.headline}
                                        </span>
                                      </div>
                                    </Link>
                                  </div>
                                  )
                                })}
                        </div>
                        ) : (
                          <div className='w-full flex flex-col gap-4 pt-4'>
                            <p className='text-gray-600 text-center'>None</p>
                          </div>
                        )}
                      </div>
                    )}
                </div>
            </div>
            )}
        </div>

        <Suspense fallback={<Spinner />}>
            <EditProfile 
            setUpdateUI={setUpdateUI} 
            userData={userData} 
            visible={showModal} 
            closeEditModal={closeEditModal} 
            />
        </Suspense>
    </>
  )
}

export default UserFeed