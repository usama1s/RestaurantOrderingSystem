import { TrashIcon} from '@heroicons/react/24/solid'
export function AdminFoodlistingsItem({title,imageURL,price,timestamp,slug}){
    return <div className="flex items-center bg-gray-200 w-[80%] p-2 rounded-md my-2 relative"> 
    <img className="w-48 h-48 rounded-md mr-4" src={imageURL}/>
    <div>
        <h3 className="font-bold text-2xl">{title}</h3>
        <p>{price}</p>
    </div>
    <div className="absolute right-4 top-4 cursor-pointer" >
    <TrashIcon className='h-6 w-6 text-indigo-600 pointer-events-none'/>
    </div>
    </div>
}