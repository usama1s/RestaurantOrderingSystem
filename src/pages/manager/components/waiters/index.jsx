import { PlusIcon } from "@heroicons/react/24/solid";
import { useCtx } from "../../../../context/Ctx";
import { AddWaiters } from "./add-waiter";
export function ManagersWaiterSection() {
  const { updateModalStatus } = useCtx();
  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Waiter</h1>
        <PlusIcon
          className="h-8 w-8 text-black cursor-pointer"
          onClick={() => updateModalStatus(true, <AddWaiters />)}
        />
      </div>
    </div>
  );
}
