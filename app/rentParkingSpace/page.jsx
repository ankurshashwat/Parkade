"use client";

import Form from "@components/RForm";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();

  const [post, setPost] = useState({
    rentersAddress: "",
    metamask: "",
    parkingSpace: "",
    startTime: "",
    endTime: "",
    amount: "",
    paid: "",
    txHash: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };
  
  const getParkingId = async()=>{
     
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parkingSpaceId = await getParkingId();
    const response = await fetch("api/parkingSpace/new", {
      method: "POST",
      body: JSON.stringify({
        renter: session.user.id,
        address: post,
        hourlyRate: post,
        startTime:  post,
        endTime: post,
        amount : post,
        parkingSpace: ,
        txHash,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      window.alert("Parking Space Listed!");
      push("/");
    }
  };

  return (
    <>
      <Form
        post={post}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Page;
