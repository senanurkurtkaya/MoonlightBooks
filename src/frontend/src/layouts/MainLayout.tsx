import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer"; 

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "2rem", minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer /> 
    </>
  );
};

export default MainLayout;
