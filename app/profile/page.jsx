"use client";

import React, { useEffect, useState } from "react";
import Card from "@components/Card";
import { useSession } from "next-auth/react";
import { LoadScript } from "@react-google-maps/api";

const Profile = () => {
  const { data: session, status } = useSession();

  const [parkingSpacesData, setParkingSpacesData] = useState([]);
  const [reservationsData, setReservationsData] = useState([]);

  console.log(status);

  const hasParkingSpaces = parkingSpacesData.length > 0 ? true : false;
  const hasReservations = reservationsData.length > 0 ? true : false;

  useEffect(() => {
    const fetchParkingSpaces = async () => {
      try {
        const response = await fetch(`api/parkingSpace/${session.user.id}`);
        const data = await response.json();
        setParkingSpacesData(data);
        console.log(data);
      } catch (error) {
        console.log("Failed to fetch parking spaces:", error);
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `api/renters/${session.user.id}/reservations`
        );
        const data = await response.json();
        setReservationsData(data);
        console.log(data);
      } catch (error) {
        console.log("Failed to fetch reservations:", error);
      }
    };

    if (status === "authenticated") {
      fetchParkingSpaces();
      fetchReservations();
    }
  }, [status]);

  return (
    <div className="p-4">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        {hasParkingSpaces && (
          <>
            <h2 className="text-2xl font-bold mb-4">Parking Spaces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parkingSpacesData.map((Pdata) => (
                <Card type="PCard" key={Pdata._id} data={Pdata} />
              ))}
            </div>
          </>
        )}

        {hasReservations && (
          <>
            <h2 className="text-2xl font-bold mt-8 mb-4">Reservations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reservationsData.map((Rdata) => (
                <Card type="RCard" key={Rdata._id} data={Rdata} />
              ))}
            </div>
          </>
        )}
      </LoadScript>
      {!hasReservations && !hasParkingSpaces && <p>Loading...</p>}
    </div>
  );
};

export default Profile;
