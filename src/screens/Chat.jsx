import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection, query, onSnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../database/firebase.config";
import moment from 'moment';

export default function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [messages, setMessages] = useState("");
  const [chatList, setChatList] = useState([]);
  const [myUid, setMyUid] = useState("");

  // Fetch myUid from local storage
  useEffect(() => {
    const uid = localStorage.getItem('userId');
    setMyUid(uid);
  }, []);

  // Ensure state and state.uid are defined before querying
  useEffect(() => {
    if (myUid && state?.uid) {
      const q = query(
        collection(db, "chat"), 
        where(state.uid, "==", true), 
        where(myUid, "==", true)
      );

      const unsubscribe = onSnapshot(q, (docsnap) => {
        const list = [];
        docsnap.forEach((doc) => {
          list.push(doc.data());
        });
        const sortlist = list.sort((a, b) => a.createdAt - b.createdAt);
        setChatList(sortlist);
      });

      return () => unsubscribe();
    }
  }, [myUid, state?.uid]); // Added optional chaining to state.uid

  const sendMessage = async () => {
    if (messages.trim() && state?.myUid) {
      await addDoc(collection(db, "chat"), {
        message: messages,
        senderUid: state.myUid,
        [state.myUid]: true,
        [state.uid]: true,
        createdAt: Date.now()
      });
      setMessages("");
    }
  };

  if (!state) {
    return <div>Loading...</div>; // Render a loading state if state is null
  }

  return (
    <div className="bg-[#1e1e1e] h-screen flex flex-col">
      {/* Navigation bar */}
      <div className="bg-[#0f0f0f] w-full p-6 flex items-center uppercase text-white">
        <img 
          src="https://cdn-icons-png.freepik.com/256/10065/10065357.png?semt=ais_hybrid" 
          className="w-16 mr-16 cursor-pointer" 
          onClick={() => navigate('/home')}
        />
        <img 
          src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png" 
          className="w-16 mr-4 rounded-full border-2 border-gray-500" 
        />
        <h1 className="text-2xl font-bold mt-5">{state?.fullName || "User"}</h1>
      </div>

      {/* Chat section */}
      <div className="bg-[#2e2e2e] flex-grow overflow-y-auto p-4">
        {chatList.map((item, index) => (
          <div 
            key={index} 
            onClick={() => navigate('/Chat', { state: { ...item, myUid } })}
            className={`flex ${item.senderUid === state.myUid ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div className={`max-w-xs ${item.senderUid === state.myUid ? 'bg-[#0078FF] text-white' : 'bg-[#333] text-white'} p-6 rounded-lg relative`}>
              <p className="text-sm">{item.message}</p>
              <span className={`absolute bottom-1 ${item.senderUid === state.myUid ? 'right-2' : 'left-2'} text-xs text-gray-400`}>{moment(item.createdAt).format('h:mm A')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input section */}
      <div className="bg-[#1e1e1e] p-4 flex items-center">
        <input 
          value={messages} 
          onChange={(e) => setMessages(e.target.value)} 
          placeholder="Enter Message" 
          className="flex-grow bg-[#333] border border-gray-500 rounded-lg px-4 py-2 text-white placeholder-gray-400"
        />
        <button 
          onClick={sendMessage}
          className="ml-2 py-2 px-4 bg-red-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
