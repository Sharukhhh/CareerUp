import React , {useState , useEffect} from 'react'
import {Link , useParams} from 'react-router-dom';
import {IoArrowBackCircle} from 'react-icons/io5';
import { Toaster } from 'react-hot-toast'
import { axiosInstance } from '../../api/axiosInstance';

const Applicants = () => {
    const {jobId} = useParams();
    const [job , setJob] = useState<any>([]);

    useEffect(() => {
        axiosInstance.get(`/applicants/${jobId}`)
        .then((res) => {
            if(res.data.message){
                setJob(res.data.job);
            }
        }).catch(error => console.log(error)
        )
    },[]);

  return (
    <>
        <Toaster position='top-center' />
        <div className='max-w-6xl mt-3 mx-auto p-6 bg-[#c3e3f7] border: rounded-lg shadow-xl'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold mb-3'>Applicants List</h1>
                <div className='flex'>
                    <Link to='/jobs'>
                        Back <IoArrowBackCircle size={20} />
                    </Link>
                </div>
            </div>

            <hr className='my-10 border-t border-gray-400' />

            <div className='overflow-x-auto border rounded-md shadow-md'>
                {job?.applicants?.length > 0 ? (
                <table className='table-auto min-w-full'>
                    <thead className='bg-gray-800 text-white'>
                        <tr>
                            <th className='px-4 py-2'>Sl no.</th>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Header 3</th>
                            <th className='px-4 py-2'>Header 3</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    {job?.applicants?.map((item : any , index : number) => {
                    return (
                        <tbody className='divide-y text-center divide-gray-100 border-t bg-gray-100' key={item?._id}>
                            <tr className='hover:bg-gray-200'>
                                <td className='px-3'>{index + 1}</td>
                                <th className="flex gap-3 px-4 py-4 font-normal text-gray-900">
                                <div className="relative h-10 w-10">
                                    <Link to={`/account/${item?.userId?._id}`}>
                                        <img
                                        className="h-full w-full rounded-full object-cover object-center"
                                        src={item?.userId?.profileImage}
                                        alt="pic"
                                        />
                                    </Link>
                                    {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                                </div>
                                <div className="text-sm">
                                    <Link to={`/account/${item?.userId?._id}`}>
                                        <div className="font-semibold text-gray-700">{item?.userId?.name}</div>
                                    </Link>
                                    <div className=" font-medium text-gray-500">{item?.userId?.email}</div>
                                    <div
                                    className='text-blue my-2 cursor-pointer' title='view resume'>
                                        <a href={item?.resumeUrl} target='_blank' rel='noopener noreferrer'>
                                            View Resume
                                        </a>
                                    </div>
                                    {/* <div className='text-blue my-2 cursor-pointer underline' title='view resume'>
                                    <a href={item?.userId?.resume} download>Download Resume</a>
                                    </div> */}
                                </div>
                            </th>
                                <td className='px-3'>
                                </td>
                                <td className='px-3'>Data 4</td>
                                <td className='px-3'>Data 4</td>
                            </tr>
                        </tbody>
                    )
                    })}
                </table>
                ) : (
                    <div className='bg-gray-800 text-white py-4 font-semibold text-center'>
                        <p>No Applicants Yet</p>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default Applicants