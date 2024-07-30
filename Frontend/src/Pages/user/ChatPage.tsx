import React , {useState , useEffect , useRef} from 'react'
import UserNav from '../../Components/user/Nav/UserNav'
import {HiChatAlt2} from 'react-icons/hi';
import {BsEmojiSmile} from 'react-icons/bs';
import {IoMdSend} from 'react-icons/io';
import {FaTimes} from 'react-icons/fa';
import { BsFillChatLeftTextFill} from 'react-icons/bs';
import { axiosInstance } from '../../api/axiosInstance';
import { useSelector } from 'react-redux';
import RootState from '../../Redux/rootstate/rootState';
import {io , Socket} from "socket.io-client";
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';


var socket : Socket;

const ChatPage = () => {
    const user = useSelector((state : RootState) => state.user.userCred);

    const [chatUsers , setChatUsers] = useState<any[]>([]);
    const [inputMessage , setInputMessage] = useState<string>('');
    const [chatMessages , setChatMessages] = useState<any[]>([]);
    const [chatId , setChatId] = useState<string | null>(null);
    const [updateUI , setUpdateUI] = useState<boolean>(false);
    const [socketConnection ,setSocketConnection] = useState<boolean>(false);
    
    useEffect(() => {
            socket = io('https://careerup.website' ,{withCredentials: true});
            socket.emit('start' , user?.userId);
            socket.on('connection' , () => {
                setSocketConnection(true);
            })
    },[user?.userId]);

    console.log(socketConnection);


    useEffect(() => {
        axiosInstance.get('/chatusers')
        .then((res) => {
            if(res.data.results){
                setChatUsers(res.data.results);
            }
        }).catch((error) => console.log(error)
        )
    } , [updateUI]);

    const handleMessageSubmit = () => {
        if(!inputMessage){
            return;
        }

        axiosInstance.post('/chatSend', {content : inputMessage , chatId})
        .then((res) => {
            if(res.data.msg){
                    socket.emit('new chat message' , res.data.message)
                    console.log('ethiyo');
                setChatMessages([
                    ...chatMessages,
                    res.data.message
                ]);
                setInputMessage('');
                setUpdateUI(prev => !prev);
            }
        }).catch((error) => console.log(error)
        )
    }

    const fetchMessages = () => {
        try {
            axiosInstance.get(`/viewMessages/${chatId}`)
            .then((res) => {
                if(res.data){
                    setChatMessages([...res.data.message])
                    socket.emit('join chat' , chatId);
                    console.log('join kaynjo');
                }
            })
        } catch (error) {
            console.log(error , 'while fetching');
            
        }
    }

    useEffect(() => {
        if(chatId){
            setChatMessages([]);
            fetchMessages();
        }
    }, [chatId]);

    useEffect(() => {
            socket.on('message recieved' , (newMessage : any) => {
                if(!chatId || chatId !== newMessage?.chat?._id){
                    return;
                } else {
                    setUpdateUI(prev => !prev);
                    setChatMessages([...chatMessages , newMessage]);
                }
            })
            console.log('appurom poyo');
            
    })

    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }, [chatMessages]);

    const [findUserModal , setFindUserModal] = useState<boolean>(false);

    const openModal = () => {
        setFindUserModal(true);
    }

    const closeModal = () => {
        setFindUserModal(false);
    }
    


  return (
    <>
        <Helmet>
            <title>Chats - CareerUp</title>
        </Helmet>
        <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <UserNav/>
            <Toaster position='top-right'/>
            <div className='!z-5 relative flex flex-col bg-white bg-clip-border shadow-3xl shadow-shadow-500
            mt-10 m-4 rounded-xl shadow-lg  dark:bg-gray-900 dark:text-white'>
                <div className='flex h-[81vh] antialiased rounded-xl shadow-lg  text-gray-800'>
                    <div className='flex sm:flex-row flex-col h-full w-full overflow-x-hidden'>
                        <div className='flex flex-col  py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 rounded-xl'>
                            <div className='flex flex-row items-center justify-center h-12 w-full'>
                                <div className='flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10'>
                                    <HiChatAlt2 size={25}/>
                                </div>
                            </div>

                            <div className='flex flex-col mt-8'>
                                <div className='flex flex-row items-center justify-between text-xs'>
                                    <span className='font-bold text-lg'>Contacts</span>
                                    <button onClick={openModal} 
                                    className='xs px-4 py-1 bg-blue text-white rounded shadow-sm shadow-black hover:scale-90'>Find Users</button>
                                </div>
                                <div className='flex flex-col max-h-[580px] space-y-1 mt-4 -mx-2  overflow-y-auto'>
                                    {chatUsers?.length > 0 ? (
                                        chatUsers?.map((chatUsers : any) => (
                                            <button onClick={() => setChatId(chatUsers?._id)}
                                            key={chatUsers?._id} 
                                            className={`flex items-start ${chatUsers?._id === chatId ? 'bg-gray-200' : 'hover : bg-gray-200'} rounded-xl px-2 py-4 mb-3`}>
                                                {chatUsers?.participants?.filter((users :any) => users?._id?.toString() !== user?.userId).map((userr : any) => {
                                                    return(
                                                        <>
                                                        <span key={userr?._id}>
                                                            <img src={userr?.profileImage} alt="" 
                                                            className='h-8 w-8 rounded-full bg-gray-200'/>
                                                            <div className='flex flex-col'>
                                                                <div className='ml-2 text-sm font-semibold'>
                                                                    {userr?.name}
                                                                </div>
                                                                <div className='text-[10px] ml-2 text-gray-500'>
                                                                    {chatUsers?.lastMessage ? (
                                                                        ` ${chatUsers?.lastMessage?.sender?.name === user?.username ? "You" : chatUsers?.lastMessage?.sender?.name} : ${chatUsers?.lastMessage?.content}`
                                                                    ) : (
                                                                        null
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </span>
                                                        </>
                                                    )
                                                })}
                                            </button>
                                        ))
                                    ) : (
                                        <p className='text-xl font-semibold flex justify-center m-5'>Empty Chat Contacts</p>
                                    )}
                                    
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col flex-auto h-full p-6'>
                            <div className='flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 shadow-xl'>
                                <div className='flex flex-col h-full overflow-x-auto mb-4'>
                                    <div className='flex flex-col h-full justify-end"'>
                                        <div className='grid  gap-y-2 overflow-y-auto ' ref={containerRef}>
                                            {chatMessages?.length > 0 ? (
                                                chatMessages?.map((message : any) => (
                                                    <div key={message?._id} className={`col-start-${message?.sender?._id !== user?.userId ? '6' : '1'} col-end-${message?.sender === user?.userId ? '13' : '8'} p-3 rounded-lg`}>
                                                        <div className={`flex ${message?.sender?._id === user?.userId ? 'justify-start flex-row-reverse' : 'flex-row'} items-center`}>
                                                            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0'>
                                                                <img src={message?.sender?.profileImage} className='rounded-full' alt="" />
                                                            </div>
                                                            <div className={`relative ${message?.sender?._id === user?.userId ? 'mr-3 bg-indigo-300' : 'ml-3 bg-white'} text-sm py-2 px-4 shadow rounded-xl`}>
                                                                <div>{message?.content}</div>
                                                            </div>
                                                        </div>
                                                        <div className={`flex ${message?.sender?._id === user?.userId ? 'justify-end' : ''}`}>
                                                            <div className='text-xs text-gray-500 mt-1 self-end'>
                                                                {new Date(message?.createdAt).toLocaleTimeString(undefined ,{
                                                                    hour : 'numeric',
                                                                    minute : 'numeric',
                                                                    hour12 : true
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className='flex justify-center items-center h-full'>
                                                    <h2 className='text-3xl text-black'>No Messages</h2>
                                                </div>
                                            )}    
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'>
                                    {chatId && (
                                        <>
                                            <div className='flex-grow ml-4'>
                                                <div className='relative w-full sm:text-lg text-xs'>
                                                    <input 
                                                    type="text" name="" value={inputMessage}
                                                    onChange={(e) => setInputMessage(e.target.value)} 
                                                    placeholder='Type here.....'
                                                    onKeyDown={(e) => e.key === 'Enter' && handleMessageSubmit()}
                                                    className='flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10'/>
                                                    <button className='absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600'>
                                                        <BsEmojiSmile/>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='ml-4'>
                                                <button onClick={handleMessageSubmit} 
                                                className='flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0'>
                                                    <p>Send</p>
                                                    <span className='ml-2'>
                                                        <IoMdSend/>
                                                    </span>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {findUserModal && (
            <Modal closeModal={closeModal} setUpdateUI={setUpdateUI} />
        )}
    </>
  )
}

export default ChatPage


interface ModalProps {
    setUpdateUI :(data: any) => void;
    closeModal : () => void;

}

const Modal: React.FC<ModalProps> = ({setUpdateUI, closeModal}) => {

    const [searchInput , setSearchInput] = useState<string>('');
    const [resultUsers , setResultUsers] = useState<any[]>([]);

    const findUser = () => {
        if(!searchInput){
            return;
        }

        axiosInstance.post('/searchUser' , {searchInput})
        .then((res) => {
            if(res.data.message){
                setResultUsers(res.data.searchResults);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }

    const handleSelectedUserForChat = (userId : string) => {
        axiosInstance.post('/chat-setup' , {userId})
        .then((res) => {
            if(res.data){
                setUpdateUI((prev : any) => !prev);
                closeModal();
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }

  return (
    <>
        <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
            <div className='bg-white rounded-lg p-4 pt-2 border-2 border-indigo-600'>
                <div className='flex justify-between items-center mb-2 '>
                    <p className='text-xl font-semibold '>
                        Search User
                    </p>
                    <button onClick={closeModal} className='text-white bg-blue p-2 rounded-3xl'>
                        <FaTimes/>
                    </button>
                </div>
                <hr className='w-full border-gray-300 my-4'/>
                <div className='flex justify-center items-center mb-7'>
                    <input type="search"  placeholder="Search.." name="" id="" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className='h-full w-3/4 rounded-full  border-gray-300 bg-gray-100 shadow-md shadow-black text-sm 
                    font-medium text-navy-700 placeholder-gray-400 px-4 py-2'/>

                    {searchInput !== '' && (
                        <button onClick={findUser}
                        title='Click to Search' className="text-white bg-blue rounded-md shadow-sm p-2 ml-2">
                            Find
                        </button>
                    )}
                </div>
                
                {resultUsers.length > 0 ? (
                    resultUsers?.map((user :any) => (
                    <div key={user?._id} className='flex items-center justify-between mb-4 overflow-y-auto'>
                        <div className='flex items-center'>
                            {user?.profileImage ? (
                                <img src={user?.profileImage} className='w-10 h-10 rounded-full mr-2' alt="" />
                            ) : (
                                <img src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`} className='w-10 h-10 rounded-full mr-2' alt="" />
                            )}
                            <h3 className='text-sm font-bold'>{user?.name}</h3>
                        </div>
                        <span onClick={() => handleSelectedUserForChat(user?._id)}>
                            <BsFillChatLeftTextFill size={20} />
                        </span>
                    </div>
                    ))
                ) : (
                    null
                )}
            </div>
        </div>
    </>
  )
}
