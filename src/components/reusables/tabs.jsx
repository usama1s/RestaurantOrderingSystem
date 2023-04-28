export function Tabs({tabs,setTabs}){
    return <div className="flex items-center">
        {tabs.map((tab,index)=><div  key={index} onClick={()=>{
            setTabs(prevTabs=>(prevTabs.map((t)=>t.name===tab.name?({...t,active:true}):({...t,active:false}))))
        }} className={`mr-4 text-xl ${tab.active && 'bg-indigo-600 text-white flex items-center justify-center px-4 py-2 rounded-md'}`}>
            <p >{tab.name}</p>   
        </div>)}
    </div>
}