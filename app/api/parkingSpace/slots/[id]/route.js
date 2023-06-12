import { connectMongoDB } from "@utils/database";
import ParkingSpace from "@models/parkingSpace";
import Reservations from "@models/reservations";

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const parkingSpaceId = params.id;

    const parkingSpace = await ParkingSpace.findById(parkingSpaceId)
      .populate("reservations")
      .exec();

    // const reservedSlots = []; // Array to store the reserved slots

    // for (let reservation of parkingSpace.reservations) {
    //   const reservationStartTime = new Date(reservation.startTime);
    //   const reservationEndTime = new Date(reservation.endTime);

    //   // Check if the reservation falls within today's date
    //   if (
    //     reservationStartTime >= today &&
    //     reservationStartTime < tomorrow &&
    //     reservationEndTime >= today &&
    //     reservationEndTime < tomorrow
    //   ) {
    //     reservedSlots.push({
    //       startTime: reservationStartTime,
    //       endTime: reservationEndTime,
    //     });
    //   }
    // }

    return new Response(JSON.stringify(parkingSpace), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch reserved slots for the day", {
      status: 500,
    });
  }
};
