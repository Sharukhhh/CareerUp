import React , {useState , useEffect} from 'react'
import {ImSearch} from 'react-icons/im';
import UserNav from '../../Components/user/Nav/UserNav'
import ChatForm from '../../Components/chat/ChatForm';
import { axiosInstance } from '../../api/axiosInstance';
import { useSelector } from 'react-redux';
import RootState from '../../Redux/rootstate/rootState';
import { io , Socket } from "socket.io-client";
import toast, { Toaster } from 'react-hot-toast';

const Chat = () => {

  let socket : Socket | null = null;
  const user = useSelector((state : RootState) => state.user.userCred);

  const [updateUI , setUpdateUI] = useState<boolean>(false);
  const [chatUsers , setChatUsers] = useState<any[]>([]);
  const [inputMessage , setInputMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [recieverId , setChatId] = useState<any>(null);
  const [socketConnection ,setSocketConnection] = useState<boolean>(false);
  const [selectedChat , setSelectedChat] = useState<any>(null);
  const [selectedContact , setSelectedContact] = useState<any[]>([]);



  useEffect(() => {
    axiosInstance.get('/chatusers')
    .then((res) => {
      if(res.data.message){
        setChatUsers(res.data.chatUsers);
      }
    }).catch((error) => console.log(error)
    )
  } ,[updateUI]);


  useEffect(() => {
    socket = io('http://localhost:3000' , {withCredentials: true,});
    socket?.emit('start' , user?.userId);
    socket?.on('connection' , () => {
      setSocketConnection(true);
    })

  }, [user?.userId]);

  const handleChatInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  }

  const handleSelectedChat = (recieverId: string) => {

    if(!selectedContact.includes(recieverId)){
      setSelectedContact([...selectedContact , recieverId])
    } 
    setSelectedChat(recieverId);
    setChatId(recieverId);
    setChatMessages([]);
    getChatMessages(recieverId);

    setChatId(recieverId);
    setChatMessages([]);
    
  }

  const handleChatMessageSubmit = (e : React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if(!inputMessage){
      return toast.error('Send Some messages' , {duration : 2000});
    }

    axiosInstance.post('/chatSend' , {inputMessage , recieverId})
    .then((res) => {
      if(res.data.message){
        socket?.emit('new chat message' , user?.userId, res.data.chat)
        setChatMessages([
          ...chatMessages , 
          res.data.chat
        ]);

        setUpdateUI((prev) => !prev );

        if(res.data.error){
          toast.error(res.data.error , {duration : 2000});
        }

        setInputMessage('');
      }
    }).catch((error) => console.log(error)
    )
  }

  const getChatMessages = (recieverId : string) => {
    
    axiosInstance.get(`/viewMessages/${recieverId}`)
    .then((res) => {
      if(res.data.message){
        setChatMessages([...res.data.messages]);
        // socket!.emit('join chat' , recieverId)
      }
    }).catch((error) => console.log(error)
    )
  }

  useEffect(() => {
    if(recieverId){
      setChatMessages([]);
      getChatMessages(recieverId);
    }
  }, [recieverId]);



  return (
    <>
      <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        <UserNav/>

        <Toaster/>
        <div className='container mx-auto mt-4'>
          <div className='min-w-full bg-blue-gray-50 border-b border-gray-200 rounded lg:grid lg:grid-cols-3'>
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
                {selectedContact?.length > 0  ? (
                  selectedContact?.map((contact) => {
                    const selectedUser = chatUsers.find((user) => user._id === contact);
                    if(selectedUser){
                    return(
                    <li key={selectedUser?._id}>
                      <div className='cursor-pointer flex items-center
                      px-3 py-2 text-sm bg-white border-gray-200 hover:bg-gray-100'>
                        <div className='relative flex items-center'>
                          <img src={selectedUser?.profileImage} className='w-10 h-10 rounded-full ' alt="" />
                          <span className='block ml-2 text-gray-800'>
                            {selectedUser?.name}
                          </span>
                        </div>
                      </div>
                    </li>
                    )
                  }
                  return null;
                })
                ) : (
                  <div className='flex items-center px-3 py-2 text-sm bg-white border-gray-200 hover:bg-gray-100'>
                    <span>Not Selected</span>
                  </div>
                )}
                <h2  className='my-2 mb-2 ml-2 text-gray-900'>Connections</h2>
                {chatUsers.length > 0 ? (
                  chatUsers.map((user : any) => (
                    <li key={user?._id} onClick={() => handleSelectedChat(user?._id)}>
                      <div className='flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100'>
                        <div className='relative flex items-center'>
                          <img src={user?.profileImage} className='w-10 h-10 rounded-full ' alt="" />
                          <span className='block ml-2 text-gray-800'>
                            {user?.name}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>
                    <div className='flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100'>
                      <span>No connections to show</span>
                    </div>
                  </li>
                )}
              </ul>
              
            </div>  
              {/* Users Listing over */}

              <div className='chat section lg:col-span-2  shadow-lg lg:block'>
                <div className='w-full'>
                  <div className='p-3 bg-white border-b border-gray-200'>
                    {selectedChat && selectedContact.length > 0 && (
                    <div className='relative flex items-center'>
                              <div >
                                <img src='' alt="" className='w-10 h-10 rounded-full' />
                                <span className='block ml-2 text-gray-800'></span>
                              </div>
                        
                          <span className="text-center opacity-60 text-gray-800"></span>
                    </div>
                    )}
                  </div>

                  <div className='w-full p-6 bg-blue-gray-50 overflow-y-auto h-[25rem] border-b border-gray-200'>
                    {selectedChat ? (
                      <ul className='space-y-2'>
                        {chatMessages.map((message) => {
                        const isSendByUser = message?.sender === user?.userId;
                        return(
                          <div key={message?._id}>
                            <li className='text-gray-800 flex'>
                              <div className={`flex justify-${isSendByUser ? 'end' : 'start'}`}>
                                <div className='relative flex items-center'>
                                  {isSendByUser ? (
                                    <>
                                      <span className='block ml-2'>{message?.message}</span>
                                    </>
                                  ) : (
                                    <>
                                      <img src={message?.sender?.profileImage} alt="" className='w-10 h-10 rounded-full' />
                                      <span className='block ml-2'>{message?.message}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </li>
                          </div>
                        )
                        })}
                      </ul>
                    ) : (
                      <div className='flex justify-center my-24'>
                        <span className="text-center opacity-60 text-gray-800">No chat selected</span>
                      </div>
                    )}
                  </div>

                  {selectedChat && (
                    <ChatForm handleChatMessageSubmit={handleChatMessageSubmit} inputMessage={inputMessage} handleChatInputChange={handleChatInputChange} />
                  )}
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat