import React from 'react';
import MyPage from './MyPage';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
const Dashboard1 = (prop) => {
  return (
    <DashboardLayout>
       <DashboardNavbar />
    <MyPage></MyPage>
    </DashboardLayout>
    
  );
};

export default Dashboard1;
