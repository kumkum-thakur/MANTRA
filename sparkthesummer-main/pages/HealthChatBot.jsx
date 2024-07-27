import Navbar from '@/Components/Navbar'
import React, { useState } from 'react'

function HealthCare() {
  const [disease, setDisease] = useState('');
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const data = await fetch("http://127.0.0.1:7000/diagnosis", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ disease: disease }), // Expecting `disease` field as per your code
      });

      if (!data.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await data.json(); // Properly parse JSON response
      console.log(result);
      setResponse(result);
      setDisease("");
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch data. Please try again later.');
    }
  }

  return (
   <>
      <Navbar active={'Health'} />
      <div className='w-screen h-full mt-4 flex flex-col justify-center'>
        <div className='self-center'>
          <input
            type="text"
            className='self-center h-10 px-2 font-mono mx-4'
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            placeholder='Enter the symptom'
          />
          <button 
            onClick={handleSubmit} 
            className='p-2 w-fit rounded-lg bg-cyan-700 text-white self-center mt-2'
          >
            Get Advice
          </button>
        </div>

        {response.length > 0 && (
          <div className='self-center mt-5'>
            <p className='font-medium text-2xl flex flex-row'>Advice From <p className='text-cyan-700 px-2'>Medi-bit</p></p>
            <ul className='list-disc'>
              {response.map((res, idx) => (
                <li key={idx} className='my-2'>
                  {res}
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <div className='self-center mt-5'>
            <h2 className='text-red-600 font-semibold'>Error:</h2>
            <p>{error}</p>
          </div>
        )}
      </div>
   </>
  )
}

export default HealthCare;
