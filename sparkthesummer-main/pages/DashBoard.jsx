import InforComp from "@/Components/InforComp";
import Navbar from "@/Components/Navbar";
import React from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
function DashBoard() {
  useGSAP(()=>{
    gsap.timeline().from('.mantra',{
      opacity:0,
      duration:0.5,
      y:20,
      scale:0.9
    })
    .from('.other',{
    duration:0.52,
    opacity:0
    })
  },[])
  return (
    <div className="flex flex-col ">
      <Navbar active={"Home"} />
      <p className="mantra text-9xl self-center first-letter:text-cyan-700 font-extrabold mt-3 text-gray-800">
        MANTRA
      </p>
      <p className="other self-end mr-56  font-semibold text-2xl text-gray-800">
        We are for you!!
      </p>
     
        <InforComp />
 
    </div>
  );
}

export default DashBoard;
