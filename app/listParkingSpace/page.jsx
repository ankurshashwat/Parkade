"use client";

import Form from "@components/Form";
import { ParkadeContext } from "@context/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Page = () => {
  const { push } = useRouter();
  const { account } = useContext(ParkadeContext);
  const { data: session } = useSession();

  const [post, setPost] = useState({
    parkringSpaceAddress: {
      lat: 0,
      long: 0,
    },
    metamask: "",
    hourlyRate: "",
    reservations: "",
  });

  useEffect(() => {
    if (account) {
      setPost((prevPost) => ({
        ...prevPost,
        metamask: account,
      }));
    }
  }, [account]);

  const updateAddress = async ({ lng, lat }) => {
    setPost((prevPost) => ({
      ...prevPost,
      parkringSpaceAddress: {
        lat: lat,
        long: lng,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("api/parkingSpace/new", {
      method: "POST",
      body: JSON.stringify({
        ownerId: session.user.id,
        metamask: post.metamask,
        address: post.parkringSpaceAddress,
        hourlyRate: post.hourlyRate,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      window.alert("Parking Space Listed!");
      push("/");
    }
  };

  const ownerFormData = {
    hourlyRate: post.hourlyRate,
    metamask: post.metamask,
    reservations: post.reservations,
  };

  const submit = false;

  return (
    <>
      <Form
        type="owner"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        post={ownerFormData}
        submit={submit}
        updateAddress={updateAddress}
      />
    </>
  );
};

export default Page;
