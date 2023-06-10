import { connectMongoDB } from "@utils/database";
import ParkingSpace from "@models/parkingSpace";

export const POST = async (req) => {
  const { address } = await req.json();
  console.log(address);
  try {
    await connectMongoDB();
    const parkingSpace = await ParkingSpace.findOne({ address: address }).populate("reservations");
    if (!parkingSpace) {
      return new Response("Parking space not found", { status: 404 });
    }

    return new Response(JSON.stringify({ ...parkingSpace._doc, success: true }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to list a new parking space", { status: 500 });
  }
};
