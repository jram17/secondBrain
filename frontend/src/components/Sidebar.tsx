import { useDispatch } from "react-redux"
import { BookMarkIcon } from "../icons/BookMarkIcon"
import { BrainIcon } from "../icons/BrainIcon"
import { FileIcon } from "../icons/FileIcon"
// import { TwitterIcon } from "../icons/TwitterIcon"
import { XIcon } from "../icons/XIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SidebarItem } from "./SidebarItem"
import { resetState, setNotes } from "../Redux/Slices/stateSlice"
import { AtIcon } from "../icons/AtIcon"
import { useNavigate } from "react-router-dom"


const Sidebar = () => {
const dispatch=useDispatch();

const navigate=useNavigate();
  return (
    <div className='h-screen bg-white border-r w-72 border-gray-200 shadow-md fixed top-0 left-0 p-4'>
      <div className="flex text-2xl items-center pt-2 " onClick={()=>navigate("/")}>
        <div className="pr-2 text-purple-600 cursor-pointer">
          <BrainIcon />
        </div>
        <div className="font-bold font-mono tracking-tighter text-gray-700 cursor-pointer">
          Second Brain
        </div>
      </div>
      <div className="pt-6">
        <SidebarItem icon={<XIcon />} text='Tweets' onClick={()=>{dispatch(setNotes("Tweets")); }}/>
        <SidebarItem icon={<YoutubeIcon />} text='Videos' onClick={()=>dispatch(setNotes("Videos"))}/>
        <SidebarItem icon={<FileIcon />} text='Documents' onClick={()=>dispatch(setNotes("Documents"))}/>
        <SidebarItem icon={<BookMarkIcon />} text='Websites' onClick={()=>dispatch(setNotes("Websites"))}/>
        <SidebarItem icon={<AtIcon/>} text="All Notes" onClick={()=>dispatch(resetState())}/>
      </div>
    </div>
  )
}

export default Sidebar
