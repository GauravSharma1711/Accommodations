import React, { useState, useRef, useEffect } from 'react';
import { userData } from '../lib/dummy.js'; // Assuming userData has user details

const Chat = () => {
  // Dummy chat list (replace with actual data fetching)
  const [chatList, setChatList] = useState([
    { id: 1, name: 'John Doe', lastMessage: 'Lorem ipsum dolor sit...', timestamp: '10:00 AM', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 2, name: 'Jane Smith', lastMessage: 'How are you today?', timestamp: 'Yesterday', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 3, name: 'Peter Jones', lastMessage: 'Did you see the new listing?', timestamp: '2 days ago', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 4, name: 'Peter Jones', lastMessage: 'Did you see the new listing?', timestamp: '2 days ago', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 5, name: 'Peter Jones', lastMessage: 'Did you see the new listing?', timestamp: '2 days ago', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 6, name: 'Peter Jones', lastMessage: 'Did you see the new listing?', timestamp: '2 days ago', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
   
    
  ]);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]); // Messages for the selected chat
  const [newMessage, setNewMessage] = useState('');
  const messageAreaRef = useRef(null);

  useEffect(() => {
    // Dummy message fetching based on currentChat (replace with API call)
    if (currentChat) {
      // Simulate fetching messages
      setTimeout(() => {
        setMessages([
          { sender: currentChat.name, text: 'Hello!', timestamp: '10:00 AM' },
          { sender: userData.name, text: 'Hi John, how are you?', timestamp: '10:02 AM' },
          { sender: currentChat.name, text: 'I am doing well, thanks!', timestamp: '10:05 AM' },
          // Add more messages for the selected chat
        ]);
      }, 200);
    } else {
      setMessages([]);
    }
  }, [currentChat]);

  useEffect(() => {
    // Scroll to the bottom of the message area
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (currentChat && newMessage.trim()) {
      const newMessageObject = {
        sender: userData.name,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessageObject]);
      setNewMessage('');
      // In a real application, send this message to the server for the currentChat
    }
  };

  const handleChatClick = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className='h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden'>
      {/* Upper Half - List of Recent Chats */}
      <div className='h-1/2 overflow-y-auto p-4 border-b'>
        <h2 className='font-semibold text-lg text-gray-800 mb-3'>Recent Chats</h2>
        <ul className='space-y-2'>
          {chatList.map((chat) => (
            <li
              key={chat.id}
              className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-100 ${currentChat?.id === chat.id ? 'bg-blue-50 text-blue-700' : ''}`}
              onClick={() => handleChatClick(chat)}
            >
              <img className='h-10 w-10 rounded-full object-cover' src={chat.avatar} alt={chat.name} />
              <div className='flex flex-col flex-grow'>
                <span className='font-semibold text-sm text-gray-900'>{chat.name}</span>
                <p className='text-xs text-gray-600 truncate'>{chat.lastMessage}</p>
              </div>
              <span className='text-xs text-gray-500'>{chat.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lower Half - Individual Chat Window */}
      <div className='h-1/2 flex flex-col'>
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className='p-4 border-b flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <img className='h-10 w-10 rounded-full object-cover' src={currentChat.avatar} alt={currentChat.name} />
                <h3 className='font-semibold text-gray-900'>{currentChat.name}</h3>
              </div>
              <button onClick={() => handleChatClick(null)} className='text-gray-500 hover:text-gray-700 focus:outline-none'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Message Area */}
            <div ref={messageAreaRef} className='flex-grow overflow-y-auto p-4 space-y-2'>
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === userData.name ? 'justify-end' : 'justify-start'}`}>
                  <div className={`bg-gray-200 rounded-lg p-3 max-w-xs break-words ${msg.sender === userData.name ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                    <p className='text-sm'>{msg.text}</p>
                    <span className='text-xs text-gray-500'>{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className='p-4 border-t'>
              <div className='flex items-center'>
                <textarea
                  className='flex-grow border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none'
                  rows="1"
                  placeholder={`Message ${currentChat.name}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:bg-gray-400 disabled:cursor-not-allowed'
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || !currentChat}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          // Display a message when no chat is selected
          <div className='flex items-center justify-center h-full text-gray-500'>
            Select a chat to start messaging.
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;