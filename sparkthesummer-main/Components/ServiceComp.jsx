import { useRouter } from "next/navigation";
import React from "react";

function ServiceComp({imageSrc , Catagory , Name , disc,Service}) {
const router = useRouter();
  return (
    <>
      <div className="p-4 md:w-1/3">
        <div className="h-full border-2 hover:border-4 transition-all hover:shadow-xl duration-100 border-cyan-700 border-opacity-60 rounded-xl overflow-hidden">
          <img
            className="img active:scale-95 lg:h-48 md:h-36 p-2 rounded-lg object-contain w-full cursor-pointer object-center"
            onClick={()=>{
              if(Service==="http://localhost:8000/") router.replace(`http://localhost:8000/`)
                else if(Service==="http://127.0.0.1:5500/MANAS-Mental-Analysis-for-Nations-and-Societies-Python_rep/MANAS-main/index.html") router.replace('http://127.0.0.1:5500/MANAS-Mental-Analysis-for-Nations-and-Societies-Python_rep/MANAS-main/index.html')
                else router.push(`/${Service}`)
                }}
            src={imageSrc}
            alt="blog"
          />
          <div className="p-6">
            <h1 className="title-font text-lg font-bold text-cyan-700 mb-3">
              {Name}
            </h1>
            <p className= "indent-2 text-pretty mb-3">{disc}.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceComp;
