import { connectMongoDB } from "@utils/database";
import ParkingSpace from "@models/parkingSpace";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();

    const parkingSpace = await ParkingSpace.findById(params.id).populate(
      "owner"
    );

    if (!parkingSpace) {
      return new Response("parkingSpace not found", {
        status: 404,
      });
    }
    return new Response(JSON.stringify(parkingSpace), {
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
