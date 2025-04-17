 import React, { useState } from "react";
import {HiOutlineX, HiOutlineMenu} from "react-icons/hi";
 import SideMenu from "./SideMenu";

 const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return(
    <div className="flex gap-5 border boredr-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 " style={{ backgroundColor: "#1976D2" }}>
      <button 
        className="block lg:hidden text-black"
        onClick={() => {
            setOpenSideMenu(!setOpenSideMenu);
        }}>
            {openSideMenu ? (
                <HiOutlineX className="text-2xl" />
            ) : (
                <HiOutlineMenu className="text-2xl" />
            )}
        </button>
          
        <h1 className="text-lg font-medium text-white"> WorkNest</h1>
        {openSideMenu && (
            <div className="fixed top-[61px] -ml-4 bg-white">
                <SideMenu activeMenu={activeMenu}/>
            </div>
        )}
    </div>)
 }

 export default Navbar