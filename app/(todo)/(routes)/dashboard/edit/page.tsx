import Navbar from "@/app/(todo)/_views/Navbar";
import TodoView from "@/app/(todo)/_views/TodoView";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar edit />
      <div className="flex justify-center">
        <TodoView edit />
      </div>
    </div>
  );
};

export default page;
