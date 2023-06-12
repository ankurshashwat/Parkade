import { connectMongoDB } from "@utils/database";
import ParkingSpace from "@models/parkingSpace";

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();
    const parkingSpaceId = params.id;

    const parkingSpace = await ParkingSpace.findById(parkingSpaceId)
      .populate("reservations")
      .exec();
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
