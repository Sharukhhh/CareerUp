import {useEffect, useState} from 'react'
import { adminAxiosInstance } from '../../api/axiosInstance.tsx';
import toast from 'react-hot-toast';
import Pagination from '../Pagination.tsx';

const CompanyTable = () => {
    const [companies , setCompanies] = useState<any>([]);
    const [currentPage , setCurrentPage] = useState<number>(0);
    const [paginatedDisplayedData , setPaginatedDisplayedData] = useState<any>([]);

    const itemsPerPage = 5;

    const handlePageChange = (page : number) => {
        setCurrentPage(page);
    } 

    const handleDisplayedDataChange = (newData : any) => {
        setPaginatedDisplayedData(newData);
    }


    useEffect(() => {
        adminAxiosInstance.get('/companies').then((res) => {
            if(res.data){
                setCompanies(res.data.companies);
            }
        }).catch((error) => console.log(error, 'axios get companies err')
        )
    }, []);

    //company verification
    const verify = (companyId : string) => {
        
            adminAxiosInstance.patch(`/verify/${companyId}`).then((res) => {
                if(res.data.message){
                    toast.success(res.data.message ,{duration : 3000 , style : {color : '#fff' , background : 'black'}});

                    setCompanies((prevCompanies : any) => prevCompanies?.map((company : any) => {
                        if(company?._id === companyId ){
                            return {...company , verify : true}
                        }
                        return company;
                    }) )
                }

                if(res.data.error){
                    toast.error(res.data.error , {duration : 3000 , style : {color : '#fff' , background : 'red'}} );
                }
            }).catch((err) => console.log(err , 'verify cmpny axios err')
            )
    }

    //block-company
    const block = (companyId : string) => {

        adminAxiosInstance.patch(`/blockcompany/${companyId}`).then((res) => {

            if(res.data.message){
                toast.success(res.data.message , {duration : 2000 , style : {color : '#fff' , background : 'black'}});

                setCompanies((prevCompanies : any) => prevCompanies?.map((company : any) => {

                    if(company?._id === companyId){
                        return {...company , isBlocked : true}
                    }
                    return company;
                }))
            }

            if(res.data.error){
                toast.error(res.data.error , {duration : 2000 , style : {color : '#fff' , background : 'red'}});
            }
        }).catch((err) => console.log(err , 'axios block company err')
        )
    }

    //unblock-company
    const unblock = (companyId : string) => {

        adminAxiosInstance.patch(`/unblockcompany/${companyId}`).then((res) => {

            if(res.data.message){
                toast.success(res.data.message , {duration : 2000 , style : {color : '#fff' , background : 'black'}});

                setCompanies((prevCompanies : any) => prevCompanies?.map((company : any) => {

                    if(company?._id === companyId){
                        return {...company , isBlocked : false}
                    }
                    return company;
                }))
            }

            if(res.data.error){
                toast.error(res.data.error , {duration : 2000 , style : {color : '#fff' , background : 'red'}});
            }
        }).catch((err) => console.log(err , 'axios block company err')
        )

    }

  return (
    <>
    <div className="overflow-hidden rounded-lg border mt-12 border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-[#323232]">
                <tr>
                    <th scope="col" className="px-6 py-4 font-semibold text-white">Name</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-white">Role</th>
                    {/* <th scope="col" className="px-6 py-4 font-semibold text-white">Team</th> */}
                    <th scope="col" className="px-6 py-4 font-semibold text-white">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t bg-[#efecec]">
                {paginatedDisplayedData?.map((company : any , index : number ) => {
                    return (
                    <tr key={index} className="hover:bg-gray-50">
                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            <div className="relative h-10 w-10">
                                <img
                                className="h-full w-full rounded-full object-cover object-center"
                                src={company?.profileImage} alt='pic'
                                />
                                {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                            </div>
                            <div className="text-sm">
                                <div className="font-semibold text-gray-700">{company?.name}</div>
                                <div className="font-medium text-gray-500">{company?.email}</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">{company?.role}</td>
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
                                {!company?.verify ? (
                                    <button onClick={() => verify(company?._id)}
                                        className="inline-flex items-center gap-1 rounded-full bg-[#dc7979] px-4 py-2 text-xs font-semibold text-white"
                                    >
                                        Verify
                                    </button>
                                ) : (
                                    <button className='inline-flex items-center gap-1 rounded-full bg-[#559658] px-4 py-2 text-xs font-semibold text-white'>
                                        Verified
                                    </button>
                                )}

                                {!company?.isBlocked ? (
                                    <button onClick={() => block(company?._id)}
                                    className='inline-flex items-center gap-1 rounded-full bg-[#dc7979] px-4 py-2 text-xs font-semibold text-white'>
                                        Block 
                                    </button>
                                ) : (
                                    <button onClick={() => unblock(company?._id)}
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

    <Pagination 
    datas={companies} 
    currentPage={currentPage} 
    itemsPerPage={itemsPerPage} 
    onDisplayedDataChange={handleDisplayedDataChange} 
    handlePageChange={handlePageChange} 
    />
</>
  )
}

export default CompanyTable