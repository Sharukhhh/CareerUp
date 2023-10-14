import React , {useEffect , useState} from 'react'
import TopBar from '../../Components/admin/TopBar'
import { adminAxiosInstance } from '../../api/axiosInstance';
import toast from 'react-hot-toast';

const Dashboard = () => {

    const [usersCount , setUsersCount] = useState<number | null>(null);
    const [companiesCount , setCompaniesCount] = useState<number | null >(null);
    const [postsCount , setPostsCount] = useState<number | null>(null);
    const [jobsCount, setJobsCount] = useState<number | null>(null);


    useEffect(() => {
        adminAxiosInstance.get('/dashboard')
        .then((res) => {
            if (res.data.message) {
                setUsersCount(res.data.totalUsers);
                setCompaniesCount(res.data.totalCompanies);
                setPostsCount(res.data.totalPosts);
                setJobsCount(res.data.totalJobs);
            }

            if(res.data.error){
                return toast.error(res.data.error , {duration : 2000});
            }
        }).catch((error) => console.log(error)
        )
    }, []);

  return (
    <>
        <TopBar />

        <div className='flex max-w-5xl mx-auto flex-wrap justify-center mt-10'>
            <div className='w-full sm:w-1/2 p-4'>
                <div className='bg-[#ebedf1] mx-auto border-4 mr-6 mb-6 border-double
                border-black rounded-lg flex items-center justify-center h-40 shadow-lg'>
                    <div className='text-8xl font-bold mr-4'>{usersCount}</div>
                    <div className='text-2xl font-bold'>Total Users</div>
                </div>
            </div>

            <div className='w-full sm:w-1/2  p-4'>
                <div className='bg-[#ebedf1] mx-auto border-4 mr-6 mb-6 border-double 
                border-black rounded-lg flex items-center justify-center h-40 shadow-lg'>
                    <div className='text-8xl font-bold mr-4'>{companiesCount}</div>
                    <div className='text-2xl font-bold'>Companies <br /> Registered</div>
                </div>
            </div>

            <div className='w-full sm:w-1/2  p-4'>
                <div className='bg-[#ebedf1] mx-auto border-4 mr-6 mb-6
                border-black border-double rounded-lg flex items-center justify-center h-40 shadow-lg'>
                    <div className='text-8xl font-bold mr-4'>{postsCount}</div>
                    <div className='text-2xl font-bold'>Total Posts</div>
                </div>
            </div>

            <div className='w-full sm:w-1/2  p-4'>
                <div className='bg-[#ebedf1] mx-auto border-4 mr-6 mb-6
                border-double border-black rounded-lg flex items-center justify-center h-40 shadow-lg'>
                    <div className='text-8xl font-bold mr-4'>{jobsCount}</div>
                    <div className='text-2xl font-bold'>Posted Jobs</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard