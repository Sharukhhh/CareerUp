import React , {useState , lazy , Suspense , useEffect} from 'react';
import { useSelector } from 'react-redux';
import RootState from '../../Redux/rootstate/rootState';
import { axiosInstance } from '../../api/axiosInstance';
import UserNav from '../../Components/user/Nav/UserNav'
import ProfileCard from '../../Components/user/Profile/ProfileCard'
import ConnectionCard from '../../Components/user/cards/ConnectionCard'
import PostCards from '../../Components/user/postss/PostCards'
import { Spinner } from '@material-tailwind/react';
import CreatePost from '../../Components/user/postss/CreatePost';
const EditProfile = lazy(() => import('../../Components/user/modal/edit-user/EditProfile'));


const UserFeed = () => {
    const [userData , setUserData]  = useState<any>([]);
    const [posts , setPosts] = useState<any>([])

      //modals
  const [showModal , setShowModal] = useState<boolean>(false);

  const openEditModal = () => {
    setShowModal(true);
  }

  const closeEditModal = () => {
    setShowModal(false);
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
    }, [user?.userId]);

  // Function to add a new post to the 'posts' state
  const addNewPost = (newPost : any) => {
    setPosts([...posts, newPost]);
  };
  return (
    <>
        <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <UserNav userData={userData} />

            <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>

                {/* left-side */}
                <div className='w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
                    <ProfileCard userData={userData} openEditModal={openEditModal} />
                    <ConnectionCard />
                </div>

                {/* center */}   
                <div className='flex-1 h-full bg-bgColor px-3 flex flex-col gap-6 overflow-y-auto'>
                    <CreatePost  userData={userData} addNewPost={addNewPost} />
                    <PostCards posts={posts} />
                </div>

                {/* right-side */}
                <div className='w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
                    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                        <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                            <span></span>
                        </div>
                    
                        <div className="w-full flex flex-col gap-4 pt-4">
                            <div className="flex items-center justify-between">
                    
                            </div>
                        </div>
                    </div>

                    <div className="lg:hidden mt-4"></div>

                    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                        <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                            <span>Expand your connections</span>
                        </div>
                        <div className='w-full flex flex-col gap-4 pt-4'>
                            
                        </div>
                    </div>
                </div>


            </div>
        </div>

        <Suspense fallback={<Spinner />}>
            <EditProfile userData={userData} visible={showModal} closeEditModal={closeEditModal} />
        </Suspense>
    </>
  )
}

export default UserFeed