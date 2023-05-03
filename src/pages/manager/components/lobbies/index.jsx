import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useCtx } from "../../../../context/Ctx";
import { COLLECTIONS } from "../../../../utils/firestore-collections";
const { lobbies } = COLLECTIONS;
//Components
import { ManagerAddLobbies } from "./add-lobbies";
export function Lobbies() {
  const { updateModalStatus } = useCtx();
  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Lobbies</h1>
        <PlusIcon
          className="h-8 w-8 text-black cursor-pointer"
          onClick={() => updateModalStatus(true, <ManagerAddLobbies />)}
        />
      </div>
    </div>
  );
}
