import { connectMongoDB } from "@utils/database";
import ParkingSpace from "@models/parkingSpace";

export const POST = async (req) => {
  const { address } = await req.json();
  console.log(address)
  try {
    await connectMongoDB();
    const newParkingSpace = new ParkingSpace({
      owner: ownerId,
      metamask,
      address,
      hourlyRate,
    });

    await newParkingSpace.save();
    return new Response(JSON.stringify({ ...newParkingSpace, success: true }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to list a new parkingSpace", { status: 500 });
  }
};
