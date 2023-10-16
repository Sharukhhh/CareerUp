import React from 'react'
import {BsEmojiSunglasses} from 'react-icons/bs';
import {FaPaperPlane} from 'react-icons/fa';

interface ChatFormProps {
    handleChatInputChange : (e: React.ChangeEvent<HTMLInputElement>) => void; 
    inputMessage : string;
    handleChatMessageSubmit : (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatForm : React.FC<ChatFormProps> = ({handleChatInputChange , inputMessage , handleChatMessageSubmit}) => {
  return (
    <>
        <div className='shadow-md bg-white rounded-lg mx-2 p-4 mt-2'>
            <form onSubmit={handleChatMessageSubmit}>
                <div className='flex items-center justify-between w-full p-3 border-b border-gray-200'>
                    <button>
                        <BsEmojiSunglasses 
                        className="h-7 w-7 text-blue-gray-200 hover:text-gray-900" aria-hidden="true"/>
                    </button>

                    <input type="text" name="" id="" 
                    value={inputMessage}
                    onChange={handleChatInputChange}
                    placeholder='Write a Message' required
                    className='block w-full py-2 pl-4 mx-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    />

                    <button type='submit' >
                        <FaPaperPlane className="h-6 w-6 text-blue-gray-200 hover:text-gray-900" 
                        aria-hidden="true"/>
                    </button>
                </div>
            </form>
        </div>
    </>
  )
}

export default ChatForm