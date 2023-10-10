import React  , {useEffect , useState} from 'react'
import TopBar from '../../Components/admin/TopBar'
import { adminAxiosInstance } from '../../api/axiosInstance'

const PostTable = () => {
    const [posts , setPosts] = useState<any[]>([]);

    useEffect(() => {
        adminAxiosInstance.get('/posts')
        .then((res) => {
            if(res.data.message){
                setPosts(res.data.posts);
            }
        }).catch((error) => console.log(error)
        )
    }, []);
    
  return (
    <>
        <TopBar/>
        <div className='mt-10 max-w-7xl mx-auto p-6'>
            <table className='w-full min-w-min divide-y divide-gray-700 border-2  rounded-lg'>
                <thead className='bg-[#323232] text-white'>
                    <tr>
                        <th className='py-3 px-3'>No. </th>
                        <th >Users</th>
                        <th>Posts</th>
                        <th>Reports</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center py-6'>
                {posts.map((post : any , index : number) => {
                    return(
                    <tr>
                        <td className='py-3 px-3'>{index + 1}</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>4</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default PostTable