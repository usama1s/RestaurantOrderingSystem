import {useState} from "react";
import { useAdminCtx } from "../../../context/AdminCtx";
import { forwardRef } from "react";
const SideBar = forwardRef(({ showNav }, ref) => {
    const [links,setLinks]=useState([
        {title:'Categories',active:true},
        {title:'Menu Items',active:false},
    ])
    const {updateActiveTab}=useAdminCtx()
    const updateLinks=(title)=>()=>{
      setLinks(links.map((link)=>(link.title===title?({...link,active:true}):({...link,active:false}))))
      updateActiveTab(title)
    }
  return (
    <div ref={ref} className="fixed w-56 h-full bg-gray-100 shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto"
            src="/ferox-transparent.png"
            alt="company logo"
          />
        </picture>
      </div>

      <div className="flex flex-col">
       {links.map((link)=>( <div
       key={link.title}
       onClick={updateLinks(link.title)}
          className={`text-xl pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${link.active?"text-white bg-indigo-600":'bg-transparent text-black'}`}
        >
          <div>
            <p>{link.title}</p>
          </div>
        </div>))}
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
