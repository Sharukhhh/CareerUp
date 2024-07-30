import {useEffect , useState} from 'react'
import TopBar from '../../Components/admin/TopBar'
import { adminAxiosInstance } from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import {PiUsersThreeFill} from 'react-icons/pi';
import {IoDocumentsSharp} from 'react-icons/io5';
import {CgOrganisation} from 'react-icons/cg';
import {BsBriefcaseFill} from 'react-icons/bs';
import LineChart from '../../Components/admin/Dashboard/LineChart';
import JobChart from '../../Components/admin/Dashboard/JobChart';
import { Helmet } from 'react-helmet-async';


const Dashboard = () => {

    const [usersCount , setUsersCount] = useState<number | null>(null);
    const [companiesCount , setCompaniesCount] = useState<number | null >(null);
    const [postsCount , setPostsCount] = useState<number | null>(null);
    const [jobsCount, setJobsCount] = useState<number | null>(null);
    const [userMonthlyData , setUserMonthlyData] = useState<number[]>([]);
    const [companyMonthlyData, setCompanyMonthlyData] = useState<number[]>([]);
    const [monthlyJobPostedData , setMonthlyJobPostedData] = useState<number[]>([]);
    const [monthlyApplicationData , setMonthlyApplicationData] = useState<number[]>([]);



    useEffect(() => {
        adminAxiosInstance.get('/dashboard')
        .then((res) => {
            if (res.data.message) {
                setUsersCount(res.data?.totalUsers);
                setCompaniesCount(res.data?.totalCompanies);
                setPostsCount(res.data?.totalPosts);
                setJobsCount(res.data?.totalJobs);
                setUserMonthlyData(res.data?.userMonthlyCounts);
                setCompanyMonthlyData(res.data?.companyMonthlyCounts);
                setMonthlyJobPostedData(res.data?.jobPostingMonthlyCounts)
                setMonthlyApplicationData(res.data?.jobApplicationMonthlyCounts);
            }

            if(res.data.error){
                return toast.error(res.data.error , {duration : 2000});
            }
        }).catch((error) => console.log(error)
        )
    }, []);

  return (
    <>
        <Helmet>
            <title>Admin Dashboard - CareerUp</title>
        </Helmet>
        <TopBar />
        <div className='flex max-w-6xl mx-auto flex-wrap justify-center mt-10'>
            <div className='w-full sm:w-1/2 p-4'>
                <div className='bg-gradient-to-br from-[#2980B9] to-[#6DD5FA] to-[#FFFFFF] mx-auto border mr-6 mb-6 border-double 
                rounded-lg flex items-center justify-center h-40 shadow-md shadow-black'>
                    <span className='text-[#3a3584] mr-2'><PiUsersThreeFill size={50}/></span>
                    <div className='text-8xl font-bold mr-4'>{usersCount}</div>
                    <div className='text-2xl font-bold'>Total Users</div>
                </div>
            </div>

            <div className='w-full sm:w-1/2  p-4'>
                <div className='bg-gradient-to-bl from-[#2980B9] to-[#6DD5FA] to-[#FFFFFF]  mx-auto border mr-6 mb-6 border-double 
                rounded-lg flex items-center justify-center h-40 shadow-md shadow-black'>
                    <span className='text-[#3a3584] mr-2'><CgOrganisation size={50}/></span>
                    <div className='text-8xl font-bold mr-4'>{companiesCount}</div>
                    <div className='text-2xl font-bold'>Companies <br /> Registered</div>
                </div>
            </div>

            <div className='w-full sm:w-1/2  p-4'>
                <div className='bg-gradient-to-tr from-[#2980B9] to-[#6DD5FA] to-[#FFFFFF] mx-auto border mr-6 mb-6 
                border-double rounded-lg flex items-center justify-center h-40 shadow-md shadow-black'>
                    <span className='text-[#3a3584] mr-2'><IoDocumentsSharp size={50}/></span>
                    <div className='text-8xl font-bold mr-4'>{postsCount}</div>
                    <div className='text-2xl font-bold'>Total Posts</div>
                </div>
            </div>

            <div className='w-full sm:w-1/2  p-4'>
                <div className='bg-gradient-to-tl from-[#2980B9] to-[#6DD5FA] to-[#FFFFFF] mx-auto border mr-6 mb-6 
                border-double rounded-lg flex items-center justify-center h-40 shadow-md shadow-black'>
                    <span className='text-[#3a3584] mr-2'><BsBriefcaseFill size={50}/></span>
                    <div className='text-8xl font-bold mr-4'>{jobsCount}</div>
                    <div className='text-2xl font-bold'>Posted Jobs</div>
                </div>
            </div>

            {/* Charts */}
            <div className='mt-6 w-full'>
                <div className='sm:flex mb-10'>
                    <div className='w-full flex justify-center p-4 sm:mr-4'>
                        <div className='border border-spacing-4 bg-deep-orange-50 rounded shadow-md shadow-black py-4 px-16 h-96 sm: md:w-[400px] lg:w-[850px]'>
                            <LineChart userMonthlyData={userMonthlyData} companyMonthlyData={companyMonthlyData} />
                        </div>
                    </div>
                </div>

                <div className='sm:flex mb-10'>
                    <div className='w-full flex justify-center p-4 sm:mr-4'>
                        <div className='border border-spacing-4 bg-teal-50 rounded shadow-md shadow-black py-4 px-16 h-96 sm: md:w-[400px] lg:w-[850px]'>
                            <JobChart monthlyJobPostedData={monthlyJobPostedData} monthlyJobAppliedData={monthlyApplicationData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard