import {useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserNav from '../../Components/user/Nav/UserNav'
import { Spinner } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import RootState from '../../Redux/rootstate/rootState';
import { axiosInstance } from '../../api/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import {ImUserPlus , ImUserMinus} from 'react-icons/im';
import { Helmet } from 'react-helmet-async';

const Explore = () => {

    const user = useSelector((state : RootState) => state.user.userCred);

    const [loading , setIsLoading] = useState<boolean>(true);
    const [companies , setCompanies] = useState<any[]>([]);
    const [listUsers , setListUsers] = useState<any[]>([]);
    const [updateUI , setUpdateUI] = useState<boolean>(false);
    const [searchInputCompanies, setSearchInputCompanies] = useState<string>('');
    const [searchInputUsers, setSearchInputUsers] = useState<string>('');
    const [activeSection, setActiveSection] = useState<string>('companies');

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

        setIsLoading(true);
        axiosInstance.get('/listusers').then((res) => {
            if(res.data.message){
                setListUsers(res.data.users);
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
                toast.success(res.data.message);
                setUpdateUI((prev) => !prev);
            }
        }).catch((error) => console.log(error)
        )
    }

    const sendConnectionRequest = (userId : string) => {
        axiosInstance.get(`/send/${userId}`).then((res) => {
            if(res.data.message){
                toast.success(res.data.message);
    
                setUpdateUI((prev) => !prev);
            }

            if(res.data.error){
                toast.error(res.data.error , {duration : 2000 });
            }
        }).catch((error) => console.log('error while connection', error)
        )
    }

    

    const filteredCompanies = companies?.filter((company) => {
        return (
            company?.name?.toLowerCase().includes(searchInputCompanies?.toLocaleLowerCase()) ||
            company?.location?.toLowerCase().includes(searchInputCompanies?.toLocaleLowerCase()) ||
            company?.headline?.toLowerCase().includes(searchInputCompanies?.toLocaleLowerCase())
        );
    });
    
    const filteredUsers = listUsers?.filter((user) => {
        return (
            user?.name?.toLowerCase().includes(searchInputUsers.toLocaleLowerCase()) ||
            user?.headline?.toLowerCase().includes(searchInputUsers.toLocaleLowerCase()) ||
            user?.location?.toLowerCase().includes(searchInputUsers?.toLocaleLowerCase())
        );
    });

    


    const isCurrentUserFollowingCompany = (company : any) => {
        if(!user?.userId || !company || !company.followers){
            return false;
        }

        const isUserFollowing = company?.followers?.some((follower: any) => {
            return (
                (follower?.user && follower?.user?.toString() === user?.userId) ||
                (follower?.company && follower?.company?.toString() === user?.userId)
            );
        });

        return isUserFollowing;
    }

  return (
    <>
        <Helmet>
            <title>Explore - CareerUp</title>
        </Helmet>
        <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <UserNav/>
            <Toaster position='top-right'/>
            
            {loading ? (
                <span className='flex items-center justify-center mx-auto my-16'>
                    <Spinner  className='h-24 w-24'/>
                </span> 
            ) : (
                <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-screen'>
                    <div className='flex-1 max-w-6xl mx-auto bg-white pt-5 pb-10 mb-10 flex flex-col rounded gap-6'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-bold text-2xl ml-4 ms-4'>Explore</h1>
                        </div>
                        <hr className='border-2 mx-4' />

                        <div className='w-full lg:w-1/2 xl:w-1/3 mx-auto'>
                            <input
                            type="search"
                            className="w-full px-4 py-2 md:mx-8 lg:mx-12 rounded-lg border bg-gray-200 focus:outline-double focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Search..."
                            onChange={(e) => {
                                activeSection === 'companies' 
                                ? setSearchInputCompanies(e.target.value)
                                : activeSection === 'users'  
                                ? setSearchInputUsers(e.target.value)
                                : null
                            }}
                            />
                        </div>

                        <div className="text-center">
                            <button
                                className={`${
                                activeSection === 'companies' ? 'bg-blue mr-2 text-white ' : 'bg-gray-700 mr-2 text-white '
                                } px-4 py-2 rounded-l-lg shadow-sm`}
                                onClick={() => setActiveSection('companies')}
                            >
                                Companies
                            </button>
                            <button
                                className={`${
                                activeSection === 'users' ? 'bg-blue text-white ' : 'bg-gray-700 text-white '
                                } px-4 py-2 rounded-r-lg shadow-sm`}
                                onClick={() => setActiveSection('users')}
                            >
                                Users
                            </button>
                        </div>

                        <div className="max-h-[calc(100vh-200px)] mb-8 overflow-y-auto">

                            {activeSection === 'companies' ? (
                                filteredCompanies?.length > 0 ? (
                                    <>
                                        <h1 className='font-bold text-xl ml-4 ms-6'>Companies</h1>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 mt-3">
                                            {filteredCompanies?.map((company: any) => (
                                                <div title='' className="bg-gradient-to-tl from-[#9facfc] to-[#e9eaec] hover:scale-110 rounded-lg shadow-lg p-3 mb-4" key={company?._id}>
                                                    <Link to="" className="cursor-pointer">
                                                        <div className="text-center">
                                                            {company?.profileImage ? (
                                                                <img
                                                                    src={company?.profileImage}
                                                                    alt=""
                                                                    className="w-20 h-20 rounded-full mx-auto"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                                                                    alt=""
                                                                    className="w-20 h-20 rounded-full mx-auto"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-lg font-semibold mt-4">{company?.name}</p>
                                                            <p className="text-ascent-1">{company?.headline}</p>
                                                            <p className="text-ascent-1">{company?.location}</p>
                                                            <p className="text-ascent-1">{company?.followers?.length} Followers</p>
                                                        </div>
                                                    </Link>
                                                    <div className="text-center mt-4">
                                                        {isCurrentUserFollowingCompany(company) ? (
                                                            <button
                                                                onClick={() => followCompany(company?._id)}
                                                                className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                                                            >
                                                                Unfollow
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => followCompany(company?._id)}
                                                                className="px-4 py-2 bg-blue text-white rounded-lg"
                                                            >
                                                                Follow
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-center p-4 bg-blue-gray-50 mx-4">
                                        <p className="text-xl font-medium">None to show</p>
                                    </div>
                                )
                            ) : (
                                <>   

                                <h1 className='font-bold text-xl ml-4 ms-6'>Candidates</h1>
                                
                                    {filteredUsers?.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 mt-3">
                                            {filteredUsers?.map((userr: any) => (
                                                <div title='Click to view Profile' className="bg-gradient-to-tl from-[#9facfc] to-[#e9eaec] hover:scale-110 rounded-lg shadow-lg p-3 mb-4" key={userr?._id}>
                                                    <Link to={`/account/${userr?._id}`} className="cursor-pointer">
                                                        <div className="text-center">
                                                            {userr?.profileImage ? (
                                                                <img
                                                                    src={userr?.profileImage}
                                                                    alt=""
                                                                    className="w-20 h-20 rounded-full mx-auto"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                                                                    alt=""
                                                                    className="w-20 h-20 rounded-full mx-auto"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-lg font-semibold mt-4">{userr?.name}</p>
                                                            <p className="text-ascent-1">{userr?.headline}</p>
                                                            <p className="text-ascent-1">{userr?.location}</p>
                                                        </div>
                                                    </Link>
                                                    {user?.role === 'Candidate' && (
                                                    <div className="text-center mt-4">
                                                        {userr?.connections?.some((conn : any) => conn?.userId?.toString() === user?.userId) ? (
                                                            
                                                            <button title='Remove Connection'
                                                                
                                                                className="px-4 py-2 bg-gray-900 text-white rounded-lg"
                                                            >
                                                                <ImUserMinus size={20}/>
                                                            </button>
                                                        ) : (
                                                            <button title='Connect'
                                                                onClick={() => sendConnectionRequest(userr?._id)}
                                                                className="px-4 py-2 bg-blue text-white rounded-lg"
                                                            >
                                                                <ImUserPlus size={20} />
                                                            </button>
                                                        )}
                                                    </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex justify-center p-4 bg-blue-gray-50 mx-4 mb-4">
                                            <p className="text-xl font-medium">None to show</p>
                                        </div>
                                    )}
                                
                                </> 
                                )
                            }        
                        </div>

                    </div>
                </div>
            )}
        </div>
    </>
  )
}

export default Explore