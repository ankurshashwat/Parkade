import { connectMongoDB } from "@utils/database";
import ParkingSpace from "@models/parkingSpace";
import user from "@models/user";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();

    // Find all parking spaces associated with the owner ID
    const parkingSpaces = await ParkingSpace.find({ owner: params.id }).populate("owner");

    if (!parkingSpaces) {
      return new Response("Parking spaces not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(parkingSpaces), {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectMongoDB();

    await ParkingSpace.findByIdAndRemove(params.id);

    return new Response("ParkingSpace deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting parkingSpace", {
      status: 500,
    });
  }
};
