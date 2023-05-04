import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
export function CartItems() {
  return (
    <div className="flex flex-col bg-[#F3F4F6] ">
      <div className="flex ">
        <div className="p-1 pl-3 flex-[0.4] flex flex-col items-start  justify-center">
          <h2 className="truncate break-words pb-1 text-xl font-bold">Name</h2>
          <p className="truncate break-words text-base">
            <span className="font-bold">Price: </span>Rs.444
          </p>
          <div className="flex space-x-2 items-center justify-center py-2">
            <PlusCircleIcon className="h-6 w-6 cursor-pointer" />
            <span className="text-sm font-normal">3</span>
            <MinusCircleIcon className="h-6 w-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
