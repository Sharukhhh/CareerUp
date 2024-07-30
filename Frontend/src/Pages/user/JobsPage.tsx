import  {useEffect , useState} from 'react'
import UserNav from '../../Components/user/Nav/UserNav';
import JobCard from '../../Components/user/cards/JobCard';
import { axiosInstance } from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import ProfileCard from '../../Components/user/Profile/ProfileCard';
import EditProfile from '../../Components/user/modal/edit-user/EditProfile';
import { Helmet } from 'react-helmet-async';

const JobsPage = () => {


  const [userData, setUserData] = useState<any>([]);
  const [industries , setIndustries] = useState<any>([]);
  const [selectedIndustry , setSelectedIndustry] = useState<string>('');
  const [jobs , setJobs] = useState<any>([]);

  const [showModal , setShowModal] = useState<boolean>(false);
  const [updateUI , setUpdateUI] = useState<boolean>(false);
  

  const openEditModal = () => {
    setShowModal(true);
  }

  const closeEditModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    axiosInstance.get(`/ownProfile`).then((res) => {
      
      if(res.data.message){
        setUserData(res.data.user);
      }
    }).catch((error) => console.log(error , 'axios')
    )
  }, [updateUI])

  useEffect(() => {
    axiosInstance.get('/getIndustries')
    .then((response) => {
      if(response.data.message){
        setIndustries(response.data.industries);
      }

      if(response.data.error){
        toast.error(response.data.error , {duration : 2000});
      }
    }).catch((error) => console.log(error , 'indsutries get err')
    )

    axiosInstance.get('/jobs')
    .then((res) => {
      if(res.data.message){
        setJobs(res.data.jobs);
      }

      if(res.data.error){
        toast.error(res.data.error , {duration : 2000});
      }
    }).catch((error) => console.log(error , 'jobs display err')
    )
  },[updateUI]);
  return (
    <>
      <Helmet>
        <title>Opportunities - CareerUp</title>
      </Helmet>
      <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        <UserNav/>

        <div className="w-full flex flex-col md:flex-row gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* Left */}
          <div className='w-full md:w-1/4 md:flex flex-col gap-6 overflow-y-auto'>
            <ProfileCard userData={userData} openEditModal={openEditModal} />
          </div>

          {/* Remaining */}
          <div className='flex-1 w-full md:w-3/4 h-full rounded-lg bg-primary px-4 flex flex-col gap-6 overflow-y-auto'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold mt-4'>Jobs For You</h2>
              <select name="dropdown" id="dropdown"
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className='bg-blue-gray-100 rounded border border-[#66666690] 
              outline-none text-sm   text-ascent-1 px-4 py-2 mt-3 placeholder:text-[#fff] shadow-md'>
                <option className='mb-2' value="">Select Industry</option>
                {industries?.map((industry : any) => {
                  return(
                    <option className='p-2' value={industry?._id} key={industry?._id}>{industry}</option>
                  )
                })}
              </select>
            </div>
            <JobCard jobs={jobs} setUpdateUI={setUpdateUI} selectedIndustry={selectedIndustry}/>
          </div>
        </div>
      </div>

      <EditProfile
      visible={showModal}
      setUpdateUI={setUpdateUI}
      userData={userData}
      closeEditModal={closeEditModal}
      />

    </>
  )
}

export default JobsPage

