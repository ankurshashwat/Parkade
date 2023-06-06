import { Schema, model, models } from "mongoose";

const ParkingSpaceSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservations",
    },
  ],
});
const ParkingSpace =
  models.ParkingSpace || model("ParkingSpace", ParkingSpaceSchema);

export default ParkingSpace;
