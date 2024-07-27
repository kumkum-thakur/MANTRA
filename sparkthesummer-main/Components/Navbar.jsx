import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { SiWorldhealthorganization } from "react-icons/si";
import { VscSignOut } from "react-icons/vsc";
const Navbar = ({ active }) => {
  
  return (
    <div className=" h-10  bg-cyan-700 justify-between flex flex-row">
      <div className="px-2  gap-1  flex flex-row self-center">
        <SiWorldhealthorganization className="self-center text-3xl text-black" />
        <p className="font-bold self-center text-white  text-xl">MANTRA</p>
      </div>
      <ul className="self-center text-white flex flex-row gap-3 font-medium px-2 ">
      <Link href={"/DashBoard"}>
          {" "}
          <li
            className={`cursor-pointer  px-2 py-0.5   ${
              active == "Home" ? "active" : undefined
            } transition-colors duration-100`}>
            Home
          </li>
        </Link>
        <Link href={"/Services"}>
          {" "}
          <li
            className={`cursor-pointer  px-2 py-0.5   ${
              active == "Services" ? "active" : undefined
            } transition-colors duration-100`}>
            Services
          </li>
        </Link>

        {/* <Link href={"/HealthCare"}>
          {" "}
          <li
            className={`cursor-pointer  px-2 py-0.5   ${
              active == "Health" ? "active" : undefined
            } transition-colors duration-100`}>
            Health
          </li>
        </Link> */}

        {/* <Link href={"/Guide"}>
          {" "}
          <li
            className={`cursor-pointer  px-2 py-0.5   ${
              active == "Guide" ? "active" : undefined
            } transition-colors duration-100`}>
            Schedual
          </li>
        </Link>
        <Link href={"/PersonalData"}>
          {" "}
          <li
            className={`cursor-pointer  px-2 py-0.5   ${
              active == "ShareReport" ? "active" : undefined
            } transition-colors duration-100`}>
            Share Report
          </li>
        </Link> */}

        <Link href={"/Report"}>
          {" "}
          <li
            className={`cursor-pointer  px-2 py-0.5   ${
              active == "Report" ? "active" : undefined
            } transition-colors duration-100`}>
            My Report{" "}
          </li>
        </Link>

<VscSignOut  onClick={()=>{
  signOut()
  

}} className="self-center text-xl active:scale-95 cursor-pointer" />

        </ul>
    </div>
  );
};

export default Navbar;
