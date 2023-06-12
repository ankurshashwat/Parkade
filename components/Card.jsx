import { useState, useEffect } from "react";
import MiniMap from "./Maps/MiniMap";

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  const formatter = new Intl.DateTimeFormat(undefined, options);
  return formatter.format(dateTime);
};

const Card = ({ data, type }) => {
  const [location, setLocation] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  
  function calculateTotalAmount(response) {
    let Amount = 0;
    if (response && response.reservations) {
      for (const reservation of response.reservations) {
        if (reservation.paid) {
          Amount += reservation.amount;
        }
      }
    }
    return Amount;
  }

  useEffect(() => {
    const fetchRsvp = async () => {
      if (data.parkingSpace?.address?.long) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.parkingSpace.address.lat},${data.parkingSpace.address.long}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          const result = await response.json();
          setLocation(result.plus_code.compound_code);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      }
    };
    const fetchPark = async () => {
      if (data.address?.long) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.address.lat},${data.address.long}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          const result = await response.json();
          setLocation(result.plus_code.compound_code);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      }
    };

    type === "PCard" ? fetchPark() : fetchRsvp();
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `api/parkingSpace/getParkingId/${data._id}`
        );
        const res = await response.json();
        console.log(res);
        const amount = calculateTotalAmount(res);
        setTotalAmount(amount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  const renderPCard = () => {
    // const totalRevenue = amounts.reduce((sum, amount) => sum + amount, 0);
    return (
      <div className="card">
        <div className="flex flex-row items-center justify-around space-x-4">
          <div>
            <MiniMap key={data._id} data={data.address} />
          </div>
          <div className="flex flex-col space-y-2 w-[300px]">
            <span className="font-semibold text-sm">Location:</span>
            <span className="text-sm">{location}</span>
            <span className="font-semibold text-sm">Revenue Generated:</span>
            <span className="text-sm">{totalAmount} wei</span>
          </div>
        </div>
      </div>
    );
  };

  const renderRCard = () => {
    const { startTime, endTime } = data;
    return (
      <div className="card">
        <div className="flex flex-row items-center justify-around">
          <div>
            <MiniMap
              key={data._id}
              data={data.parkingSpace?.address}
              user="owner"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="px-6 text-sm font-semibold">Location: </span>
            <p className="px-6 text-sm">{location}</p>
            <span className="px-6 text-sm font-semibold">Start Time: </span>
            <p className="px-6 text-sm">{formatDateTime(startTime)}</p>
            <span className="px-6 text-sm font-semibold">End Time: </span>
            <p className="px-6 text-sm">{formatDateTime(endTime)}</p>
          </div>
        </div>
      </div>
    );
  };

  return type === "PCard" ? renderPCard() : renderRCard();
};

export default Card;
