import { connectMongoDB } from "@utils/database";
import Reservations from "@models/reservations";
import ParkingSpace from "@models/parkingSpace";

//GET
export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();

    const reservations = await Reservations.find({
      renter: params.id,
    }).populate("renter");

    return new Response(JSON.stringify(reservations), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to fetch all reservations", {
      status: 500,
    });
  }
};

//POST
export const POST = async (req) => {
  const { renterId, address, hourlyRate, parkingSpaceId, start, end, txHash } =
    await req.json();

  try {
    await connectMongoDB();

    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
    const amount = durationInHours * hourlyRate;

    //check if the req slot is empty


    const newReservation = new Reservations({
      renter: renterId,
      address,
      hourlyRate,
      startTime: start,
      endTime: end,
      amount,
      parkingSpace: parkingSpaceId,
      txHash,
    });

    await newReservation.save();

    await ParkingSpace.findByIdAndUpdate(
      parkingSpaceId,
      {
        $push: {
          reservations: newReservation._id,
        },
      },
      { new: true }
    );

    return new Response(JSON.stringify(newReservation), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to make a new reservation", { status: 500 });
  }
};

