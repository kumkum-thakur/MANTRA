import Navbar from "@/Components/Navbar";
import ServiceComp from "@/Components/ServiceComp";
import React from "react";

function Services() {
  return (
    <div>
      <Navbar active={"Services"} />
      <section className="text-gray-600 body-font">
        <div className="container px-5 gap-8 flex flex-col py-24 mx-auto">
          <div className="flex flex-wrap justify-center gap-10 -m-4">
            <ServiceComp
              imageSrc={"https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg"}
              Name={"CareIntel"}
              Service={"PersonalData"}

              disc={
                "Comprehensive Analysis and Responsive Evaluation for Integrated Health Insights"
              }
            />
            <ServiceComp
              imageSrc={"https://images.moneycontrol.com/static-mcnews/2022/09/Health-insurance.png?impolicy=website&width=1600&height=900"}
              Name={"Medi-Bit"}
             
              Service={"HealthChatBot"}

              disc={" Responsive Emotional Help & Advisory Bot"}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-10 -m-4">
            <ServiceComp
              imageSrc={"https://images.indianexpress.com/2023/06/Dil-LEAD.jpg"}
              Name={"Aushadhi "}
              Service={"http://localhost:8000/"}
              disc={
                " Advanced Utility System for Scheduling and Healthcare Dosage Insights"
              }
            />
            <ServiceComp
              imageSrc={"https://static.wixstatic.com/media/2be1ce_deb8b98d61874ef9bbf278ad03f1471c~mv2.jpg/v1/fill/w_1000,h_666,al_c,q_85,usm_0.66_1.00_0.01/2be1ce_deb8b98d61874ef9bbf278ad03f1471c~mv2.jpg"}
              Name={"Manas"}
              Service={"http://127.0.0.1:5500/MANAS-Mental-Analysis-for-Nations-and-Societies-Python_rep/MANAS-main/index.html"}

              disc={"Mental Analysis for Nations & Advancing Societies"}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
