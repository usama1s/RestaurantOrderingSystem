import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROLES } from "../utils/roles";
function RolesComponent() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState();
  useEffect(() => {
    setRoles(
      Object.entries(ROLES).map(([key, value]) => ({
        navigateTopath: () => navigate(`/${value.toLowerCase()}`),
        value,
      }))
    );
  }, []);

  return (
    <div className="flex items-center justify-center flex-col h-[100vh]">
      <h1 className="font-bold text-2xl text-center py-2">Select a role.</h1>
      {roles?.map(({ value, navigateTopath }) => (
        <h1
          className="bg-black text-base py-2 px-6 text-white my-2 cursor-pointer rounded-md"
          key={value}
          onClick={() => navigateTopath()}
        >
          {value}
        </h1>
      ))}
    </div>
  );
}

export default RolesComponent;
