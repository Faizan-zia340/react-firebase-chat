import { useLocation, useNavigate } from 'react-router-dom'; // Changed from useNavigation to useNavigate
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../database/firebase.config";

export default function Home() {
  
  const navigate = useNavigate(); // Corrected to useNavigate
  const { state } = useLocation(); // Deconstructed state from useLocation
  const [messages, setMessages] = useState([]); 
  const [ChatList,setChatList] = useState([]);

  console.log("state", state);

  useEffect(() => {
    getMessages(); // Called getMessages to fetch data
  }, []); // If getMessages had dependencies, they should be added here

  const getMessages = async () => {
     };

     const sendMessage = async () => {
      let myUid=await localStorage.getItem('userId')
    addDoc(collection(db, "chat"), {
     messages,
     myUid:true,
    [state.uid]:true,
     createdAt:date.now()
    })  

    };

  return (
    <div>
      {/* Navigation bar */}
      <div className="bg-[#0f546f] w-full p-6  flex items-center uppercase">
        <img 
          src="https://cdn-icons-png.freepik.com/256/10065/10065357.png?semt=ais_hybrid" 
          className="w-16 mr-16 cursor-pointer" 
          onClick={() => navigate('/home')}  // Fixed navigate function usage
        />
        <img 
          src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png" 
          className="w-16 mr-4 rounded-full border-2 border-gray-500" 
        />
        <h1 className="text-2xl font-bold mt-5 text-white">{state?.fullName || "User"}</h1> {/* Optional chaining in case state is undefined */}
      </div>
      
      {/* Input section */}


<div className="bg-gray-100 h-[80vh] "></div>

      <div className='flex items-center justify-center pt-5'>
        <input value={messages}  onChange={(e)=>setMessages(e.target.value)}  placeholder='Enter Message' className='w-10/12 border border-gray-500 rounded-lg px-6 py-2  text-xl ' />
        <button onClick={} className='text-xl w-40 py-2 ml-2 rounded-lg bg-red-200 text'>Send</button>
      </div>
    </div>
  );
}
