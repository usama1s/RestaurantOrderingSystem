import React from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
export function Card({title,imageURL,price,timestamp,slug}) {
  return (
  //   <div
  
  //   className="flex flex-col items-center text-center "
  // >
    <div
      className="flex h-72 w-72 flex-col justify-end rounded-md relative overflow-hidden"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        src={imageURL}
      
        className="object-cover w-full h-full rounded-[10px] z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      <div className="absolute left-4 bottom-4 text-left">
        <h1 className="text-2xl text-white font-semibold">{title}</h1>
        <h1 className="text-xl font-light text-gray-200">{price}</h1>
        
        <button className="text-base text-white cursor-pointer mt-2 font-semibold flex">
        Add to Cart<PlusIcon className='h-6 w-6 text-white ml-2'/>
        </button>
      </div>
    </div>
  // </div>
  )
}
