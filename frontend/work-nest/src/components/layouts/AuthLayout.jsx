import React from "react";
import UI_IMG from "../../assets/images/auth-img.png";

const AuthLayout = ({children}) => {
    return <div className="flex">
        <div className="w-screen h-screen md:w-[40vw] px-12 pt-8 pb-12">
            <h2 className="text-4xl font-bold" style={{ color: "#1976D2" }}>WorkNest</h2>
            {children}
        </div>
   
        <div className="hidden md:flex w-[60vw] h-screen items-center justify-center bg-blue-50 bg-[url('/bg-img.png')] bg-cover bg-no-repeat bg-center overflow-hidden p-8"> 
            <img src={UI_IMG} className="w-64 lg:w-[100%]"/>
        </div>
        </div>
};

export default AuthLayout;