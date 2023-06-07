import web3 from "web3";
import Reservations from "@models/reservations";

const makeReservation = async (renter, parkingSpace, startTime, endTime, amount) => {
  // Connect to the blockchain using a web3 provider
  const provider = new web3.providers.HttpProvider("https://<your-blockchain-provider-url>");
  const web3Instance = new web3(provider);

  // Get the deployed smart contract instance using the contract address
  const contractAddress = "<your-contract-address>";
  const contract = new web3Instance.eth.Contract(contractABI, contractAddress);

  // Make the reservation transaction using the contract's function
  const reservationResult = await contract.methods.makeReservation(renter, parkingSpace, startTime, endTime, amount).send();

  // Store the transaction hash in the database
  const reservation = new Reservations({
    renter,
    parkingSpace,
    startTime,
    endTime,
    amount,
    paid: false,
    txHash: reservationResult.transactionHash,
    contractAddress, // Add the contract address to the reservation model
  });
  await reservation.save();

  // Return the reservation object or any other relevant response
  return reservation;
};

const updateReservationStatus = async (reservationId, txHash) => {
  // Find the reservation by ID
  const reservation = await Reservations.findById(reservationId);

  // Connect to the blockchain using a web3 provider
  const provider = new web3.providers.HttpProvider("https://<your-blockchain-provider-url>");
  const web3Instance = new web3(provider);

  // Get the deployed smart contract instance using the contract address
  const contractAddress = reservation.contractAddress;
  const contract = new web3Instance.eth.Contract(contractABI, contractAddress);

  // Check the transaction status on the blockchain
  const transaction = await web3Instance.eth.getTransaction(txHash);
  const isPaid = transaction.blockNumber !== null;

  // Update the paid status in the reservation model
  reservation.paid = isPaid;
  await reservation.save();

  // Return the updated reservation object or any other relevant response
  return reservation;
};
