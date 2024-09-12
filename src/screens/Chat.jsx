import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from '../database/firebase.config';
import { db } from "../database/firebase.config";

export default function Home() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [messages, setMessages] = useState(""); // Changed to an empty string for input field
  const [chatList, setChatList] = useState([]); // CamelCase for consistency

  console.log("state", state);

  useEffect(() => {
    getMessages(); // Fetching messages on component mount
  }, []);

  const getMessages = async () => {
     localStorage.getItem('userId').then(myUid=>{
    const q = query(collection(db, "chat"), where(state.uid, "==", true), where(myUid, "==", true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });
  console.log("Current cities in CA: ", cities.join(", "));
    });
   });
    };

  const sendMessage = async () => {
    try {
      let myUid = await localStorage.getItem('userId');
      await addDoc(collection(db, "chat"), {
        message: messages, // Saving the message as a string
        [myUid]: true,
        [state.uid]: true,
        createdAt: Date.now() // Corrected 'date.now()' to 'Date.now()'
      });
      setMessages(""); // Resetting input field after sending
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div>
      {/* Navigation bar */}
      <div className="bg-[#0f546f] w-full p-6 flex items-center uppercase">
        <img 
          src="https://cdn-icons-png.freepik.com/256/10065/10065357.png?semt=ais_hybrid" 
          className="w-16 mr-16 cursor-pointer" 
          onClick={() => navigate('/home')} // Correct usage of navigate function
        />
        <img 
          src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png" 
          className="w-16 mr-4 rounded-full border-2 border-gray-500" 
        />
        <h1 className="text-2xl font-bold mt-5 text-white">{state?.fullName || "User"}</h1>
      </div>

      {/* Chat section */}
      <div className="bg-gray-100 h-[80vh] ">
        {/* Display chat messages here */}
        {chatList.map((chat, index) => (
          <div key={index}>
            <p>{chat.message}</p>
          </div>
        ))}
      </div>

      {/* Input section */}
      <div className='flex items-center justify-center pt-5'>
        <input 
          value={messages} 
          onChange={(e) => setMessages(e.target.value)} 
          placeholder='Enter Message' 
          className='w-10/12 border border-gray-500 rounded-lg px-6 py-2 text-xl' 
        />
        <button 
          onClick={sendMessage} // Linked the sendMessage function to the button
          className='text-xl w-40 py-2 ml-2 rounded-lg bg-red-200'
        >
          Send
        </button>
      </div>
    </div>
  );
}
