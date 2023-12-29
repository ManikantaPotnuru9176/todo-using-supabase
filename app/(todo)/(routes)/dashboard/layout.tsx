import React from "react";
import DashboardMenu from "../../_components/DashboardMenu";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <div className="flex justify-center">
        <DashboardMenu />
      </div>
    </div>
  );
};

export default layout;
