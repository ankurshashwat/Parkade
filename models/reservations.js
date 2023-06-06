import { Schema, model, models } from "mongoose";

const ReservationsSchema = new Schema({
  renter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parkingSpace: {
    type: Schema.Types.ObjectId,
    ref: "ParkingSpace",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  txHash: {
    type: String,
    required: true,
  }
});
const Reservations =
  models.Reservations || model("Reservations", ReservationsSchema);

export default Reservations;
