"use client";

import Form from "@components/Form";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ParkadeContext } from "@context/context";

const Page = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const { makeReservation } = useContext(ParkadeContext);

  const [parkingSpaceAddress, setParkingSpaceAddress] = useState({
    lat: 0.0,
    long: 0.0,
  });

  const [parkingSpaceData, setParkingSpaceData] = useState();
  const [markers, setMarkers] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);

  const [post, setPost] = useState({
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
    setPost((prevPost) => {
      return {
        ...prevPost,
        [name]: value,
      };
    });
  };

  const updateAddress = async ({ lng, lat }) => {
    setParkingSpaceAddress({
      lat: lat,
      long: lng,
    });
  };

  const getParkingId = async () => {
    const response = await fetch("api/parkingSpace/getParkingId", {
      method: "POST",
      body: JSON.stringify({
        address: parkingSpaceAddress,
      }),
    });
    const data = await response.json();
    console.log("parking:", data);
    return data;
  };

  const getAllMarkers = async () => {
    const response = await fetch("api/parkingSpace/");
    const data = await response.json();
    const filteredData = data.filter(
      (parkingSpace) =>
        parkingSpace.address &&
        parkingSpace.address.long &&
        parkingSpace.address.lat
    );
    const markers = filteredData.map((parkingSpace) => ({
      lat: parkingSpace.address.lat,
      lng: parkingSpace.address.long,
    }));
    return markers;
  };

  useEffect(() => {
    getParkingId().then((parkingSpace) => setParkingSpaceData(parkingSpace));
  }, [parkingSpaceAddress]);

  useEffect(() => {
    getAllMarkers().then((markers) => setMarkers(markers));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!parkingSpaceData) return;

    const res = await makeReservation(
      parkingSpaceData.hourlyRate,
      post.startTime,
      post.endTime,
      parkingSpaceData.metamask
    );

    if (res.status === false) {
      window.alert("Error making Transaction");
      return;
    }

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
          amount: res.amount,
          txHash: res.txHash,
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

  const renterFormData = {
    metamask: post.metamask,
    parkingSpace: post.parkingSpace,
    startTime: post.startTime,
    endTime: post.endTime,
    amount: post.amount,
    paid: post.paid,
    txHash: post.txHash,
  };

  const submit = false;

  return (
    <>
      <Form
        type="renter"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        post={renterFormData}
        submit={submit}
        updateAddress={updateAddress}
        markers={markers}
        parkingSpaceAddress={parkingSpaceAddress}
      />
    </>
  );
};

export default Page;
