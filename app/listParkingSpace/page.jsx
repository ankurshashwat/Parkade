"use client";

import Form from "@components/OForm";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { push } = useRouter();
  const { data: session } = useSession();

  const [post, setPost] = useState({
    ownerAddress: "",
    hourlyRate: "",
    metamask: "",
    reservations: "",
  });

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
        address: post.ownerAddress,
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
