import { useLocation, useNavigate} from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../database/firebase.config"

export default  function Home() {
  
 const [messages, setMessages] = useState([]) 
 const navigate=useNavigate()
 const {state}=useLocation()
 console.log("state",state)
 
  
  useEffect(() => {
    getMessages()
  }, [])
  
  const getMessages = async () => {
   
  }
    return (
      <div>
        <div className="bg-[#0f546f] w-full  p-6 mb-16 flex item-center uppercase">
        <img src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png"  className="w-16  mr-4  rounded-full border-2 border-gray-500"  />
          <h1 className="text-2xl font-bold mt-5 text-white">{state.fullName}</h1>
        </div>
<div>
    <input type="text" />
    <button>send</button>
</div>


      </div>
    )
  }
 