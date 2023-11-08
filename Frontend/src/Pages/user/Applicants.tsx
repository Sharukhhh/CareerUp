import  {useState , useEffect} from 'react'
import {Link , useParams} from 'react-router-dom';
import {IoArrowBackCircle} from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast'
import { axiosInstance } from '../../api/axiosInstance';

const Applicants = () => {
    const {jobId} = useParams();

    const [job , setJob] = useState<any>([]);
    const [applicationStatus , setApplicationStatus] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        axiosInstance.get(`/applicants/${jobId}`)
        .then((res) => {
            if(res.data.message){
                setJob(res.data.job);

                const initialStatus: { [key: string]: string } = {};
                res.data?.job?.applicants?.forEach((applicant : any) => {
                    initialStatus[applicant?._id] = applicant?.status;
                });
                setApplicationStatus(initialStatus);
            }
        }).catch(error => console.log(error)
        )
    },[jobId ]);

    const handleStatusChange = (applicantId : string , newStatus : string) => {
        setApplicationStatus((prevStatus) => ({
            ...prevStatus , [applicantId] : newStatus
        }))
    }

    const handleUpdateStatus = (applicationId : string) => {
        const newStatus = applicationStatus[applicationId];

        axiosInstance.patch(`/updateStatus/${applicationId}` , {newStatus})
        .then((res) => {
            if(res.data.message){
                toast.success(res.data.message);

                // Update the applicationStatus state with the new status
                setApplicationStatus((prevStatus) => ({
                    ...prevStatus,
                    [applicationId]: newStatus,
                }));

                // setUpdateUI((prev) => !prev);
            }
        }).catch((error) => {
            console.log(error.response.data.message);
        })
    }

  return (
    <>
        <Toaster position='top-right' />
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
                            <th className='px-4 py-2'>Applicants</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    {job?.applicants?.map((item : any , index : number) => {
                    return (
                        <tbody className='divide-y text-center divide-gray-100 border-t bg-gray-100' key={item?._id}>
                            <tr className='hover:bg-gray-200'>
                                <td className='px-3'>{index + 1}</td>
                                <th className="flex gap-3 px-4 py-4 font-normal justify-center text-gray-900">
                                <div className="relative h-10 w-10">
                                    <Link to={`/account/${item?.userId?._id}`}>
                                        {item?.userId?.profileImage ? (
                                            <img
                                            className="h-full w-full rounded-full object-cover object-center"
                                            src={item?.userId?.profileImage}
                                            alt="pic"
                                            />
                                        ) : (
                                            <img src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`} alt="" 
                                            className='h-full w-full rounded-full object-cover object-center'/>
                                        )}
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
                                        <a href={`https://careerup.website/${item?.userId?.resume}`} target='_blank' rel="noreferrer">
                                            View Resume
                                        </a>
                                    </div>
                                    {/* <div className='text-blue my-2 cursor-pointer underline' title='view resume'>
                                    <a href={item?.userId?.resume} download>Download Resume</a>
                                    </div> */}
                                </div>
                            </th>
                                <td className='px-3'>
                                    <select className='ring-1 rounded-sm px-2 py-2'
                                    value={applicationStatus[item?._id] || item?.status}
                                    onChange={(e) => {
                                        const newStatus = e.target.value;
                                        handleStatusChange(item?._id , newStatus)
                                    }}
                                    name="status" id="status">
                                        <option value="Pending">Pending</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>

                                    <button type='button' onClick={() => handleUpdateStatus(item?._id)}
                                    className='bg-blue p-2 rounded text-white ml-3 shadow-md'>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )
                    })}
                </table>
                ) : (
                    <div className='bg-gray-800 opacity-70 text-white py-4 font-semibold text-center'>
                        <p>No Applicants Yet</p>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default Applicants