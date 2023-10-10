import React from 'react'
import {ImSearch} from 'react-icons/im';
import UserNav from '../../Components/user/Nav/UserNav'
import ChatForm from '../../Components/chat/ChatForm';

const Chat = () => {
  return (
    <>
      <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        <UserNav/>

        <div className='container mx-auto mt-4'>
          <div className='min-w-full bg-white broder-x border-b border-gray-200 rounded lg:grid lg:grid-cols-3'>
            <div className='bg-white border-r border-gray-200 lg:col-span-1'>

              {/* Search section */}
              <div className='mx-3 my-3'>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-2 flex items-center'>
                    <ImSearch 
                    className='h-5 w-5 text-gray-500' aria-hidden="true"
                    />
                  </div>

                  <input type="search" name="search" id="search" 
                  className='block py-2 pl-10 pr-3 w-full bg-gray-50 text-gray-900 text-sm rounded-lg
                  border border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 '/>

                </div>
              </div>
              {/* Search section over */}

              {/* Users listing */}
              <ul className='overflow-auto h-[30rem]'>
                <h2 className='my-2 mb-2 ml-2 text-gray-900'>Chats</h2>
                <li>
                  <div className='cursor-pointer flex items-center
                  px-3 py-2 text-sm bg-white border-gray-200 hover:bg-gray-100'>
                    {/* Users */}
                  </div>
                </li>
                <h2  className='my-2 mb-2 ml-2 text-gray-900'>Other Users</h2>
                <li>
                  <div className='flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100'>
                    {/* Users */}
                  </div>
                </li>
              </ul>
              
            </div>  
              {/* Users Listing over */}

              <div className='lg:col-span-2 lg:block'>
                <div className='w-full'>
                  <div className='p-3 bg-white border-b border-gray-200'>
                    {/* Chat title */}
                  </div>

                  <div className='relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200'>
                    <ul className='space-y-2'>

                    </ul>
                  </div>

                  <ChatForm />
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat