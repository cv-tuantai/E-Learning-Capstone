import React from "react";
import { Outlet } from "react-router-dom";

export default function UserTemplate() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
