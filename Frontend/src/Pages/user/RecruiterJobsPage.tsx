import  {useEffect , useState} from 'react'
import UserNav from '../../Components/user/Nav/UserNav'
import { axiosInstance } from '../../api/axiosInstance'
import ProfileCard from '../../Components/user/Profile/ProfileCard'
import RecruiterJobTile from '../../Components/user/cards/RecruiterJobTile'
import EditProfile from '../../Components/user/modal/edit-user/EditProfile'
import { Helmet } from 'react-helmet-async'

const RecruiterJobsPage = () => {
  const [userData , setUserData] = useState<any>([]);
  const [updateUI , setUpDateUI] = useState<boolean>(false);

  const [showModal , setShowModal] = useState<boolean>(false);

  const openEditModal = () => {
    setShowModal(true);
  }

  const closeEditModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    axiosInstance.get(`/ownProfile`)
    .then((res)=>{
      if(res.data.message){
        setUserData(res.data.user);
      }
    }).catch((error) => console.log(error , 'axios')
    )
  } , [updateUI])
  return (
    <>
      <Helmet>
        <title>Jobs - CareerUp</title>
      </Helmet>
        <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <UserNav/>

            <div className='w-full flex flex-col md:flex-row gap-2 lg:gap-4 pt-5 pb-10 h-full'>
              {/* Left */}
              <div className='w-full md:w-1/4 md:flex flex-col gap-6 overflow-y-auto'>
                <ProfileCard userData={userData}  openEditModal={openEditModal} />
              </div>

              <div className='flex-1 w-full md:w-3/4 h-full rounded-lg bg-primary px-4 flex flex-col gap-6 overflow-y-auto'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-2xl font-bold mt-4'>Your Posted Jobs</h2>
                </div>
                <RecruiterJobTile />
              </div>
            </div>
        </div>

        <EditProfile 
        setUpdateUI={setUpDateUI}
        visible={showModal}
        userData={userData}
        closeEditModal={closeEditModal}/>
    </>
  )
}

export default RecruiterJobsPage