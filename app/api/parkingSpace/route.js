import { connectMongoDB } from "@utils/database";
import ParkingSpace from "@models/parkingSpace";

export const GET = async (request) => {
  try {
    await connectMongoDB();

    const parkingSpace = await ParkingSpace.find({}).populate("owner");

    return new Response(JSON.stringify(parkingSpace), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to fetch all parkingSpace", {
      status: 500,
    });
  }
};