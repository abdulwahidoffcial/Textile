import React, { useState } from "react";
import image from "@/assets/image1.jpg"


export default function DashboardsPage() {
  // const [iframeLoaded, setIframeLoaded] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIframeLoaded(true);
  //   }, 1000); // Delay the iframe loading by 1 second

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="w-full h-[80vh]">
      <img src={image} alt="Dashboard" className="w-full h-full object-cover" />
    </div>
  )
}