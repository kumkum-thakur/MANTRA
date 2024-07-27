import React from "react";

function DiseaseComp({ Disease , setResponse}) {
    const handleRes =async ()=>{
        try {
            const data = await fetch("http://127.0.0.1:5000/diagnosis", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ symptoms: [Disease] }), // Sending symptoms array
            });
      
            if (!data.ok) {
              throw new Error('Network response was not ok');
            }
      
            const result = await data.json(); // Properly parse JSON response
            console.log(result);
            setResponse(result);
            
           
          } catch (err) {
            console.error('Fetch error:', err);
           
          }
        }
  return (
    <div onClick={handleRes} className="w-20 cursor-pointer h-20 text-center self-center border-2 active:scale-95 flex flex-col justify-center rounded-lg border-cyan-700 font-mono font-semibold">
      <p className="self-center">{Disease}</p>{" "}
    </div>
  );
}

export default DiseaseComp;
