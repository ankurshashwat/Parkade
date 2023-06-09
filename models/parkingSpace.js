import { Schema, model, models } from "mongoose";

const ParkingSpaceSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  metamask: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
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
