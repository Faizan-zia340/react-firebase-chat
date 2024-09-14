import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection, query, onSnapshot, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../database/firebase.config";
import moment from 'moment';

export default function Chat() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [messages, setMessages] = useState("");
  const [chatList, setChatList] = useState([]);
  const [myUid, setMyUid] = useState("");
  const [showOptions, setShowOptions] = useState(null); // State for handling which message options are open

  useEffect(() => {
    const uid = localStorage.getItem('userId');
    setMyUid(uid);
  }, []);

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
          list.push({ id: doc.id, ...doc.data() });
        });
        const sortlist = list.sort((a, b) => a.createdAt - b.createdAt);
        setChatList(sortlist);
      });

      return () => unsubscribe();
    }
  }, [myUid, state?.uid]);

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

  const deleteMessage = async (id) => {
    await deleteDoc(doc(db, "chat", id));
  };

  const editMessage = async (id, newMessage) => {
    await updateDoc(doc(db, "chat", id), {
      message: newMessage,
      editedAt: Date.now(),
    });
  };

  return (
    <div className="bg-[#1e1e1e] h-screen flex flex-col">
      {/* Navigation bar */}
      <div className="bg-[#0f546f] w-full p-6 flex items-center uppercase text-white shadow-md">
        <img
          src="https://cdn-icons-png.freepik.com/256/10065/10065357.png?semt=ais_hybrid"
          className="w-16 mr-16 cursor-pointer"
          onClick={() => navigate('/home')}
        />
        <img
          src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png"
          className="w-16 mr-4 rounded-full border-2 border-gray-500"
        />
        <h1 className="text-2xl font-bold">{state?.fullName || "User"}</h1>
      </div>

      {/* Chat section */}
      <div className="bg-[#2e2e2e] flex-grow overflow-y-auto p-4">
        {chatList.map((item, index) => (
          <div
            key={index}
            className={`relative flex ${item.senderUid === state.myUid ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`relative max-w-xs p-4 rounded-lg ${item.senderUid === state.myUid ? 'bg-[#0078FF] text-white' : 'bg-[#333] text-white'} ${item.senderUid === state.myUid ? 'mr-2' : 'ml-2'}`}
              onClick={() => setShowOptions(showOptions === item.id ? null : item.id)} // Toggle options menu
            >
              <p className="text-sm">{item.message}</p>
              <div className="flex items-center mt-1">
                <span className={`text-xs ${item.senderUid === state.myUid ? 'text-gray-300' : 'text-gray-400'}`}>
                  {moment(item.createdAt).format('h:mm A')}
                </span>
                {item.editedAt && <span className="text-xs text-gray-400 ml-2">(edited)</span>}
              </div>

              {/* Options menu for edit and delete */}
              {showOptions === item.id && (
                <div className="absolute bottom-[-3rem] right-0 bg-[#444] border border-gray-500 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      const newMessage = prompt("Edit your message:", item.message);
                      if (newMessage) {
                        editMessage(item.id, newMessage);
                        setShowOptions(null);
                      }
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-yellow-500 hover:bg-[#555]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteMessage(item.id);
                      setShowOptions(null);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#555]"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input section */}
      <div className="bg-[#1e1e1e] p-4 flex items-center border-t border-gray-700">
        <input
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Enter Message"
          className="flex-grow bg-[#333] border border-gray-500 rounded-lg px-4 py-2 text-white placeholder-gray-400"
        />
        <button
          onClick={sendMessage}
          className="ml-2 py-2 px-4 bg-[#0078FF] text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
