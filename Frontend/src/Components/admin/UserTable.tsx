import React, { useState } from 'react';
import { adminAxiosInstance } from '../../api/axiosInstance.tsx';


const UserTable = () => {

    const [users , setUsers] = useState<any>([]);

    adminAxiosInstance.get('/users').then((res) => {
        if(res.data){
            setUsers(res.data.users);
        }
    }).catch((err) => console.log(err, 'users get error axios')
    )

  return (
    <>
        <div className="overflow-hidden rounded-lg border mt-12 border-gray-200 shadow-md m-5">
            
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Role</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Team</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {users.map((user : any ) => {
                        <tr className="hover:bg-gray-50">
                            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                <div className="relative h-10 w-10">
                                    <img
                                    className="h-full w-full rounded-full object-cover object-center"
                                    src=""
                                    alt="pic"
                                    />
                                    {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                                </div>
                                <div className="text-sm">
                                    <div className="font-medium text-gray-700">{user.name}</div>
                                    <div className="text-gray-400">{user.email}</div>
                                </div>
                            </th>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">
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
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-4">
                                        <a x-data="{ tooltip: 'Delete' }" href="#">
                                        <svg className="h-8 w-8 text-red-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                        </svg>
                                        </a>
                                    </div>
                                </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default UserTable