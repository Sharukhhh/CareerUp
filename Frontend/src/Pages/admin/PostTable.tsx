import  {useEffect , useState} from 'react'
import TopBar from '../../Components/admin/TopBar'
import { adminAxiosInstance } from '../../api/axiosInstance'
import {AiFillDelete} from 'react-icons/ai';
import toast from 'react-hot-toast';
import Pagination from '../../Components/Pagination';
import { Helmet } from 'react-helmet-async';

const PostTable = () => {
    const [posts , setPosts] = useState<any[]>([]);
    const [updateUI , setUpDateUI] = useState<boolean>(false);
    const [currentPage , setCurrentPage] = useState<number>(0);
    const [paginatedDisplayedData , setPaginatedDisplayedData] = useState<any>([]);

    const itemsPerPage = 4;
    const handlePageChange = (page : number) => {
        setCurrentPage(page);
    }

    const handleDisplayedDataChange = (newData : any) => {
        setPaginatedDisplayedData(newData);
    }

    useEffect(() => {
        adminAxiosInstance.get('/posts')
        .then((res) => {
            if(res.data.message){
                setPosts(res.data.posts);
            }
        }).catch((error) => console.log(error)
        )
    }, [updateUI]);

    const deletePostPermanently = (postId : string) => {
        adminAxiosInstance.get(`/adminpostDelete/${postId}`)
        .then((res) => {
            if(res.data.message){
                toast.success(res.data.message);

                setUpDateUI((prev) => !prev);
            }
        }).catch((error) => console.log(error)
        )
    }
    
  return (
    <>
        <Helmet>
            <title>Post Management - CareerUp Admin</title>
        </Helmet>
        <TopBar/>
        <div className='mt-10 max-w-7xl mx-auto p-6'>
            <table className='w-full min-w-min border-2 rounded-lg'>
                <thead className='bg-[#323232] text-white'>
                    <tr>
                        <th className='py-3 px-3'>Users</th>
                        <th>Posted At</th>
                        <th>Posts</th>
                        <th>Reports</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center py-6 bg-gray-200'>
                {paginatedDisplayedData?.map((post : any ) => {
                    return(
                    <tr className='' key={post?._id}>
                        <td className="min-w-[150px] border-white/0 py-3 pr-4">
                            <div className="flex items-center ml-4">
                                <img
                                className="w-10 h-10 rounded-full mr-3"
                                alt='img'
                                src={post?.user?.profileImage || post?.company?.profileImage}
                                />
                                <p className="text-sm font-bold">
                                {post?.user?.name || post?.company?.name}
                                </p>
                            </div>
                        </td>
                        <td className='min-w-[150px] border-white/0 py-3 pr-4'>
                        {new Date(post?.createdAt)?.toLocaleDateString()}
                        </td>
                        <td className='min-w-[150px] border-white/0 py-3 pr-4'>
                        {post?.media ? (
                            <div className='flex flex-col items-center break-words'>
                                <img src={post?.media} alt="" className='w-10 h-10 rounded-lg mb-2' />
                                <p className='text-center text-ascent-1 break-words'>{post?.description}</p>
                            </div>
                        ) : (
                            <p className='text-center mt-2 text-sm text-ascent-1 break-words'>{post?.description}</p>
                        )}
                        </td>
                        <td className='min-w-[150px] border-white/0 py-3 pr-4'>
                            <p>
                                <span className='text-red-500 mr-2'>
                                    {post?.reports?.length}
                                </span>
                                - &nbsp; Reports
                            </p>
                        </td>
                        <td className='min-w-[150px] border-white/0 py-3 pr-4'>
                            <AiFillDelete onClick={() => deletePostPermanently(post?._id)}
                            className='text-red-500 ml-10 hover:text-red-800 hover:scale-110' size={20} />
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>

        <Pagination 
        datas={posts} 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        handlePageChange={handlePageChange} 
        onDisplayedDataChange={handleDisplayedDataChange}
        />
    </>
  )
}

export default PostTable