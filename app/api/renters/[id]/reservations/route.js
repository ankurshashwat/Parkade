import { connectMongoDB } from "@utils/database";
import Reservations from "@models/reservations";
import ParkingSpace from "@models/parkingSpace";

//GET
export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();

    const reservations = await Reservations.find({
      renter: params.id,
    }).populate("parkingSpace");

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
  const { renterId, hourlyRate, parkingSpaceId, start, end, amount, txHash } =
    await req.json();

  try {
    await connectMongoDB();
    //check if the req slot is empty
    const newReservation = new Reservations({
      renter: renterId,
      hourlyRate,
      startTime: start,
      endTime: end,
      amount,
      paid: true,
      parkingSpace: parkingSpaceId,
      txHash,
    });

    await newReservation.save();
    console.log("reservation made");
    await ParkingSpace.findByIdAndUpdate(
      parkingSpaceId,
      {
        $push: {
          reservations: newReservation._id,
        },
      },
      { new: true }
    );

    return new Response(
      JSON.stringify({ ...newReservation._doc, success: true }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to make a new reservation", { status: 500 });
  }
};
