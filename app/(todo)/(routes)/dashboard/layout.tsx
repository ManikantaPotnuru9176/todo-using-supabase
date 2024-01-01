import React from "react";
import DashboardMenu from "../../_components/DashboardMenu";
import ProtectedRoute from "../../_components/ProtectedRoute";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div>
        {children}
        <div className="flex justify-center">
          <DashboardMenu />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default layout;
