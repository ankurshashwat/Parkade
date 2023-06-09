"use client";

import Card from "@components/Card";

const Reservations = ({ parkingSpaces, reservations }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Parking Spaces</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parkingSpaces.map((parkingSpace) => (
          <Card
            key={parkingSpace.id}
            title={parkingSpace.title}
            description={parkingSpace.description}
            // Add more data to be displayed in the card as needed
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Reservations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservations.map((reservation) => (
          <Card
            key={reservation.id}
            title={reservation.title}
            description={reservation.description}
            // Add more data to be displayed in the card as needed
          />
        ))}
      </div>
    </div>
  );
};

export default Reservations;
