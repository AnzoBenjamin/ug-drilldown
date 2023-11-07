"use client";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/Navbar";
import { useState } from "react";

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false, // Disable server-side rendering for Leaflet map
});

export default function Home() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  /*

  const districtsData = [
    // Define your districts and counties data here
    // Example: { name: 'Kampala', counties: ['Makindye', 'Nakawa', 'Rubaga'] }
  ];

  const handleDistrictClick = (districtName) => {
    const district = districtsData.find(
      (district) => district.name === districtName
    );
    setSelectedDistrict(district);
    setSelectedCounty(null); // Reset selected county when a new district is clicked
  };

  const handleCountyClick = (countyName) => {
    setSelectedCounty(countyName);
  };
  */

  return (
    <div className="w-screen h-screen relative main">
      <NavBar/>
      <section className="content">
        <MapComponent />
        <Sidebar />
      </section>
    </div>
  );
}
