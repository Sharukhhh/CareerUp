import React from 'react';
import { adminAxiosInstance } from '../../api/axiosInstance';
import toast from 'react-hot-toast';

interface IndustryTableProps {
    items : any
    setUpdateUI :(data: any) => void;
}

const IndustryTable: React.FC<IndustryTableProps> = ({items , setUpdateUI}) => {

    const handleDelete  = (industryId : string) => {
        adminAxiosInstance.delete(`/deleteCat/${industryId}`)
        .then((res) => {
            if(res.data.message){
                toast.success(res.data.message);

                setUpdateUI((prev : any) => !prev);
            }

            if(res.data.error){
                toast.error(res.data.error);
            }
        }).catch((error) => console.log(error , 'delete industry error')
        )
    }
  return (
    <>
        <div className="overflow-x-auto mb-14">
            <div className='w-full sm:max-w-xl mx-auto'>
            <table className="w-full min-w-min divide-y divide-gray-200 border-2 rounded-lg">
                <thead className='bg-[#323232] text-white'>
                    <tr>
                        <th className="px-6 py-3  text-left text-sm leading-4 font-medium text-white tracking-wider">
                        SL No.    
                        </th>
                        <th className="px-6 py-3 text-left text-sm leading-4 font-medium text-white uppercase tracking-wider">
                        Industry
                        </th>
                        <th className="px-6 py-3 text-left text-sm leading-4 font-medium text-white uppercase tracking-wider">
                        Actions
                        </th>
                    </tr>
                </thead>
                    <tbody className='border-t divide-y bg-[#efecec]'>
                    {items?.map((item : any, index : number) => {
                        return (
                            <tr key={item?._id} >
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item?.industry}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <button
                                onClick={() => handleDelete(item?._id)}
                                className="bg-[#dc7979] hover:bg-[#dc6363] px-3 py-2 rounded-md text-white focus:outline-none focus:underline"
                                >
                                Delete
                                </button>
                            </td>
                            </tr>
                        )
                    })} 
                    </tbody>
            </table>
            </div>
        </div>
    </>
  )
}

export default IndustryTable