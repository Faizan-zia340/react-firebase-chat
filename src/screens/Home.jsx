import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../database/firebase.config"

export default  function Home() {
 const [users, setUsers] = useState([]) 
 const [myUid, setUid] = useState("") 
 const navigate=useNavigate()
 console.log("users",users)
  
  useEffect(() => {
    getUsers()
  }, [])
  
  const getUsers = async () => {
    let uid =localStorage.getItem("userId" )
      setUid(uid)
       
    const list=[]
 const dbSnap=await  getDocs(collection(db,"users"))
 dbSnap.forEach(item=>{
  list.push(item.data())
 })
 setUsers(list)
 
  }
    return (
      <div>
        <div className="bg-[#0f546f] w-full  p-6 mb-12">
          <h1 className="text-2xl font-bold text-white">User List</h1>
        </div>
{users.map(item=>(
  <div key={item.uid} onClick={()=>navigate('/Chat',{ state: {...item,myUid} } ) } className="cursor-pointer w-11/12 shadow-md border bg-blue-50  border-black shadow-gray-300 rounded-lg flex justify-between mx-auto my-4 py-5 px-10">
 <div className="flex item-center">
  <img src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png"  className="w-16  mr-4  rounded-full border-2 border-gray-500" />
 <div>
    <h1 className="uppercase font-semibold  text-xl"> {item.fullName}</h1>
  <h1 className="text-gray-600"> {item.email}</h1>
  </div>
  </div>
  <button>Message</button> 
  </div>
 
))}
      </div>
    )
  }
 