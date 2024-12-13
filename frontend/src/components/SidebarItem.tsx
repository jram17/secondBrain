import { ReactElement } from "react";



interface SidebarProps{
  text: string;
  icon: ReactElement;
  onClick?:()=>void;
}
export function SidebarItem({ text, icon,onClick }: SidebarProps) {
  return <div className="flex  items-center  p-4  rounded-md cursor-pointer transition-all duration-300 ease-out hover:bg-gray-200" onClick={onClick}>
    <div className="pr-2 text-slate-700">{icon}
    </div>
    <div className=" text-gray-700  font-medium text-md  tracking-normal">
      {text}
    </div>

  </div>
}


