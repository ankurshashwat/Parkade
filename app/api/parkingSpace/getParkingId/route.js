import { connectMongoDB } from "@utils/database";
import ParkingSpace from "@models/parkingSpace";
import Reservations from "@models/reservations";

export const POST = async (req) => {
  const { address } = await req.json();
  console.log("into the server", address);
  try {
    await connectMongoDB();
    const parkingSpace = await ParkingSpace.findOne({
      address: address,
    }).populate("reservations");
    console.log(parkingSpace);
    if (!parkingSpace) {
      return new Response(
        JSON.stringify({ message: "No Parking Space Found", success: false }),
        {
          status: 404,
        }
      );
    }
    return new Response(
      JSON.stringify({ ...parkingSpace._doc, success: true }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch Parking Id", { status: 500 });
  }
};
