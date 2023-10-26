import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserNav from '../../Components/user/Nav/UserNav'
import { Spinner } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import RootState from '../../Redux/rootstate/rootState';
import { axiosInstance } from '../../api/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

const Explore = () => {

    const user = useSelector((state : RootState) => state.user.userCred);

    const [loading , setIsLoading] = useState<boolean>(true);
    const [companies , setCompanies] = useState<any[]>([]);
    const [updateUI , setUpdateUI] = useState<boolean>(false);
    const [searchInput , setSearchInput] = useState<string>('');

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get('/companies').then((res) => {
            if(res.data.message){
                setCompanies(res.data.companies);
            }
            if(res.data.error){
                toast.error(res.data.error);
            }
        }).catch((err) => console.log(err, 'axios listing err'))
        .finally(() => setIsLoading(false));
    }, [updateUI]);

    
    const followCompany = (companyId : string) => {
        axiosInstance.get(`/follow-unfollow/${companyId}`)
        .then((res) => {
            if(res.data.message){
                setUpdateUI((prev) => !prev);
            }
        }).catch((error) => console.log(error)
        )
    }

    const filteredCompanies = companies.filter((company) => {
        return company.name.toLowerCase().includes(searchInput.toLocaleLowerCase());
    })

  return (
    <>
        <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <UserNav/>
            <Toaster/>
            
            {loading ? (
                <span className='flex items-center justify-center mx-auto my-16'>
                    <Spinner  className='h-24 w-24'/>
                </span> 
            ) : (
                <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
                    <div className='flex-1 max-w-6xl mx-auto bg-white pt-5 pb-10 flex flex-col rounded gap-6'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-bold text-2xl ml-4'>Explore Companies</h1>
                            <select name="" id=""
                            className='bg-blue-gray-100 rounded border border-[#66666690] 
                            outline-none text-sm me-10 text-ascent-1 px-4 py-2 mt-3 placeholder:text-[#fff] shadow-md'>

                            </select>
                        </div>
                        <hr className='border-2 mx-4' />

                        <input
                        type="text"
                        className="px-4 py-2 mx-12 rounded-lg border bg-gray-200 focus:outline-double focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Search..."
                        onChange={(e) => setSearchInput(e.target.value)}
                        />

                        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map((company : any) => (
                                <div className='flex items-start mx-14 mb-8 p-4 bg-gradient-to-tl from-[#9facfc] to-[#e9eaec] border rounded shadow-lg' key={company?._id}>
                                    <Link to='' className='cursor-pointer'>
                                        <div className="flex items-center space-x-4 cursor-pointer">
                                            {company?.profileImage ? (
                                                <img src={company?.profileImage} alt='' className="w-12 h-12 rounded-full" /> 
                                            ) : (
                                                <img src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`} alt='' className="w-12 h-12 rounded-full" /> 
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-lg font-semibold">{company?.name}</span> 
                                                <span className="text-ascent-1">{company?.location}</span> 
                                                <span className="text-ascent-1">{company?.followers?.length} Followers</span> 
                                            </div>
                                        </div>
                                    </Link>
                                    <button onClick={() => followCompany(company?._id)}
                                    className="ml-auto px-4 py-2 bg-blue text-white rounded-lg">Follow</button>
                                </div>
                                ))
                            ) : (
                                <div className='flex justify-center p-40 bg-blue-gray-50 mx-4'>
                                    <p className='text-xl font-medium'>None to show</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
  )
}

export default Explore