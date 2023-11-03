import  { useEffect, useState } from 'react';
import { adminAxiosInstance } from '../../api/axiosInstance.tsx';
import toast from 'react-hot-toast';
import Pagination from '../Pagination.tsx';


const UserTable = () => {

    const [users , setUsers] = useState<any>([]);
    const [currentPage , setCurrentPage] = useState<number>(0);
    const [paginatedDisplayedData , setPaginatedDisplayedData] = useState<any>([]);


    useEffect(() => {
        adminAxiosInstance.get('/users').then((res) => {
        
            if(res.data){
                setUsers(res.data.users);
            }
        }).catch((err) => console.log(err, 'users get error axios')
        )
    }, []);

    const handleDisplayedDataChange = (newData : any[]) => {
        setPaginatedDisplayedData(newData);
    }

    //block-user
    const blockUser = (userId : string) => {
        adminAxiosInstance.patch(`/block/${userId}`).then((res) => {

            if(res.data.message){
                toast.success(res.data.message ,{duration : 2000 , style : {color : '#fff' , background : 'black'}});

                setUsers((users : any) => users?.map((user : any) => {
                    if(user?._id === userId ){
                        return {...user , isBlocked : true}
                    }
                    return user;
                }) )
            }

            if(res.data.error){
                toast.error(res.data.error , {duration : 2000 , style : {color : '#fff' , background : 'red'}} );
            }
        }).catch((err) => console.log(err , 'verify user block axios err')
        )
    }

    //unblock-user
    const unBlockUser = (userId : string) => {

        adminAxiosInstance.patch(`/unblock/${userId}`).then((res) => {
            if(res.data.message){
                toast.success(res.data.message ,{duration : 2000 , style : {color : '#fff' , background : 'black'}});

                setUsers((users : any) => users?.map((user : any) => {
                    if(user?._id === userId ){
                        return {...user , isBlocked : false}
                    }
                    return user;
                }) )
            }

            if(res.data.error){
                toast.error(res.data.error , {duration : 2000 , style : {color : '#fff' , background : 'red'}} );
            }
        }).catch((err) => console.log(err , 'verify user unblock axios err')
        )
    }

    const itemsPerPage = 5;

    const handlePageChange = (selectedPage : number) => {
        setCurrentPage(selectedPage);
    }

  return (
    <>
    
        <div className="overflow-hidden rounded-lg border mt-12 border-gray-200 shadow-md m-5">
            
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-[#323232]">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-semibold text-white">Name</th>
                        <th scope="col" className="px-6 py-4 font-semibold text-white">Role</th>
                        {/* <th scope="col" className="px-6 py-4 font-semibold text-white">Location</th> */}
                        <th scope="col" className="px-6 py-4 font-semibold text-white">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t bg-[#efecec]">
                    {paginatedDisplayedData?.map((user : any , index : string ) => {
                        return (
                        <tr key={index} className="hover:bg-gray-50">
                            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                <div className="relative h-10 w-10">
                                    <img
                                    className="h-full w-full rounded-full object-cover object-center"
                                    src={user?.profileImage}
                                    alt="pic"
                                    />
                                    {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold text-gray-700">{user?.name}</div>
                                    <div className=" font-medium text-gray-500">{user?.email}</div>
                                </div>
                            </th>
                                <td className="px-6 py-4">{user?.role}</td>
                                {/* <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <span
                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                                        >
                                        Design
                                        </span>
                                        <span
                                        className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                                        >
                                        Product
                                        </span>
                                        <span
                                        className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
                                        >
                                        Develop
                                        </span>
                                    </div>
                                </td> */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-start gap-4">
                                        {!user?.isBlocked ? (
                                            <button onClick={() => blockUser(user?._id)}
                                            className='inline-flex items-center gap-1 rounded-full bg-[#dc7979] px-4 py-2 text-xs font-semibold text-white'>
                                                Block 
                                            </button>
                                        ) : (
                                            <button onClick={() => unBlockUser(user?._id)} 
                                            className='inline-flex items-center gap-1 rounded-full bg-[#6966ba] px-4 py-2 text-xs font-semibold text-white'>
                                                UnBlock 
                                            </button>
                                        )}
                                    </div>
                                </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>


        {/* Pagination */}
        <Pagination 
        datas={users} 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        handlePageChange={handlePageChange} onDisplayedDataChange={handleDisplayedDataChange} 
        />
    </>
  )
}

export default UserTable