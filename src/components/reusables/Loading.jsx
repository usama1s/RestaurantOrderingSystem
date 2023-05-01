import React from "react";
import { PulseLoader } from "react-spinners";
function Loading() {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <PulseLoader color={"rgb(79 70 229)"} />
    </div>
  );
}

export default Loading;
