import React from "react";
import { WaiterOrder } from "../orders";
export function TakeAway() {
  return (
    <div>
      <h1 className="text-xl font-bold py-2">Take away</h1>
      <WaiterOrder />
    </div>
  );
}
