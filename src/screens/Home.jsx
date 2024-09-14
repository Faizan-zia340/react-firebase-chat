import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../database/firebase.config"

export default function Home() {
  const [users, setUsers] = useState([])
  const [myUid, setUid] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    getUsers()
  }, [])
  
  const getUsers = async () => {
    let uid = localStorage.getItem("userId")
    setUid(uid)
    
    const list = []
    const dbSnap = await getDocs(collection(db, "users"))
    dbSnap.forEach(item => {
      list.push(item.data())
    })
    setUsers(list)
  }

  const handleLogout = () => {
    localStorage.removeItem("userId")
    navigate('/login')
  }
  
  return (
    <div className="bg-gray-900 min-h-screen ">
      <div className="bg-[#2f2f30] w-full p-6 mb-12 flex justify-between">
        <h1 className="text-2xl font-bold text-white">User List</h1>
         <button className=' text-white shadow-md font-bold  hover:bg-[#959999]' onClick={handleLogout}>Logout</button>
      </div>
      
      {users.map(item => (
        <div 
          key={item.uid} 
          onClick={() => navigate('/Chat', { state: { ...item, myUid } })} 
          className="cursor-pointer w-11/12 shadow-md border bg-gray-800 border-gray-600 shadow-gray-700 rounded-lg flex justify-between mx-auto my-4 py-5 px-10 transition-transform transform hover:scale-105"
        >
          <div className="flex items-center">
            <img 
              src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png" 
              className="w-16 mr-4 rounded-full border-2 border-gray-500" 
            />
            <div>
              <h1 className="uppercase font-semibold text-xl text-white"> {item.fullName}</h1>
              <h1 className="text-gray-400"> {item.email}</h1>
            </div>
          </div>
          <button className="bg-[#1c3a47] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#274c5d]">
            Message
          </button>
        </div>
      ))}
    </div>
  )
}
