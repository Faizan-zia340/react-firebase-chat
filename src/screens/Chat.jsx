import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, query, onSnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from '../database/firebase.config';
import { db } from "../database/firebase.config";

export default function Home() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [messages, setMessages] = useState(""); // Changed to an empty string for input field
  const [chatList, setChatList] = useState([]); // CamelCase for consistency
  const [myUid, setMyUid] = useState(""); // Added state to store myUid

  // Fetch myUid from local storage
  useEffect(() => {
    const uid = localStorage.getItem('userId');
    setMyUid(uid); // Storing myUid in state
  }, []);

  console.log("state", state);

  useEffect(() => {
    if (myUid && state.uid) { // Ensure both UIDs are available before querying
      const q = query(
        collection(db, "chat"), 
        where(state.uid, "==", true), 
        where(myUid, "==", true) // Used myUid from state
      );

      const unsubscribe = onSnapshot(q, (docsnap) => {
        const list = [];
        docsnap.forEach((doc) => {
          list.push(doc.data()); // Pushed the entire document data
        });
        const sortlist=list.sort((a,b)=>a.createdAt-b.createdAt) 
        setChatList(sortlist); // Set the entire list as chatList
      });

      return () => unsubscribe(); // Cleanup subscription
    }
  }, [myUid, state.uid]); // Added dependencies to the useEffect

  const sendMessage = async () => {
    if (messages.trim()) { // Ensure message is not empty
      await addDoc(collection(db, "chat"), {
        message: messages, // Saving the message as a string
        senderUid : state.myUid, // Using myUid from state.myUid,
        [state.myUid]: true,
        [state.uid]: true,
        createdAt: Date.now() // Corrected 'date.now()' to 'Date.now()'
      });
      setMessages(""); // Resetting input field after sending
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
        {chatList.map((item, index) => (
          <div 
            key={index} // Use index if no unique ID is available, although using a unique ID is better
            onClick={() => navigate('/Chat', { state: { ...item, myUid } })} 
            className="cursor-pointer w-11/12 shadow-md border bg-blue-50 border-black shadow-gray-300 rounded-lg flex justify-between mx-auto my-4 py-5 px-10"
          >
            <div className="flex item-center">
              <div>
                <h1 className="uppercase font-semibold text-xl"> {item.message}</h1> {/* Accessed message field */}
                 <h1 className="uppercase  text-xl"> {new Date(item.createdAt).toLocaleDateString()}</h1>
              </div>
            </div>
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
