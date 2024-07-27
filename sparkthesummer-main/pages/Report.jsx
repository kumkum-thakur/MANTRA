import Navbar from "@/Components/Navbar";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Utility function to format the date
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-indexed
  const day = (`0${date.getDate()}`).slice(-2);

  return `${year}/${month}/${day}`;
};

function Report() {
  // Retrieve cookies
  const image = Cookies.get("Image");
  const name = Cookies.get("Name");
  const email = Cookies.get("Email");

  // State for health data and loading/error status
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Email = email;
        // Replace this URL with your actual data endpoint
        const response = await fetch("/api/getHealthUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email: Email }), // Include email in request body
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setHealthData(data);
      } catch (err) {
        setError(`There was a problem with the fetch operation: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]); // Add email to dependency array

  if (loading) {
    return (
      <center>
        <div>Loading...</div>
      </center>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col">
      <Navbar active={"Report"} />
      <div className="flex flex-row mt-4 justify-center gap-10">
        <div className="relative w-40 h-40">
          <Image
            src={image || "/default-profile.png"} // Provide a default image
            alt={name || "User profile picture"}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <p className="self-center text-3xl font-bold">{name}</p>
      </div>
      <main  className="w-8/12 shadow-md self-center flex flex-col gap-5 pb-4 mb-4 rounded-lg h-32 mt-4">
      {healthData.map((health, index) => (
          <div className="flex flex-row border-2 justify-between border-black rounded-lg p-2">
            <div className="self-center flex flex-col">
             

              <div className="grid grid-cols-2 gap-4">
                <p className="font-medium text-sm px-2">Glucose Level: {health.Glucose}</p>
                <p className="font-medium text-sm px-2">Cholesterol Level: {health.Cholesterol}</p>
                <p className="font-medium text-sm px-2">Hemoglobin Level: {health.Hemoglobin}</p>
                <p className="font-medium text-sm px-2">White Blood Cells Level: {health.WhiteBloodCells}</p>
                <p className="font-medium text-sm px-2">Platelets Level: {health.Platelets}</p>
                <p className="font-medium text-sm px-2">Red Blood Cells Level: {health.RedBloodCells}</p>
                <p className="font-medium text-sm px-2">Insulin Level: {health.Insulin}</p>
                <p className="font-medium text-sm px-2">BMI: {health.BMI}</p>
                <p className="font-medium text-sm px-2">Blood Pressure: {health.BloodPressure}</p>
                <p className="font-medium text-sm px-2">Heart Rate: {health.HeartRate}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm self-start pr-2 font-mono">
              {formatDate(health.date) || "N/A"}
            </p>
          </div>
      ))}
        </main>
    </div>
  );
}

export default Report;
