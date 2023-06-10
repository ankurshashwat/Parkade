"use client";

import Form from "@components/RForm";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { push } = useRouter();
  const { data: session } = useSession();

  const [post, setPost] = useState({
    parkingSpaceAddress: {
      lat: 83.234,
      long: 72.132,
    },
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

  const getParkingId = async () => {
    const response = await fetch("api/parkingSpace/getParkingId", {
      method: "POST",
      body: JSON.stringify({
        address: post.parkingSpaceAddress,
      }),
    });
    const data = await response.json();
    console.log("parking:", data);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parkingSpaceData = await getParkingId();
    //* get amount recipt fot txhash
    //! call make reserfvation
    const response = await fetch(
      `api/renters/${session.user.id}/reservations`,
      {
        method: "POST",
        body: JSON.stringify({
          renterId: session.user.id,
          hourlyRate: parkingSpaceData.hourlyRate,
          parkingSpaceId: parkingSpaceData._id,
          start: post.startTime,
          end: post.endTime,
          amount: 500,
          txHash: "00x123",
          //* need to update address comp on frontend
          //* modify the owner listing page, add a map, then on maker addition and submitn convert those into address
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      window.alert("Parking Space rented!");
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
