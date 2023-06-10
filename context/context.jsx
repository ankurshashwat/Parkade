"use client";

import React, { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import { contractAddress, contractABI } from "@utils/constants";

// Create the context
const ParkadeContext = createContext();

// Define the Parkade context provider
const ParkadeProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [account, setAccount] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check if Web3 is available
        if (window.ethereum) {
          // Request access to user accounts
          await window.ethereum.request({ method: "eth_requestAccounts" });
          // Create the Web3 instance
          const web3 = new Web3(window.ethereum);

          // Create the contract instance
          const contract = new web3.eth.Contract(contractABI, contractAddress);

          setContract(contract);

          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
        } else {
          throw new Error("Metamask is not installed.");
        }
      } catch (err) {
        console.error("Error initializing contract:", err);
        setError(
          "Error initializing contract. Make sure Metamask is connected and installed."
        );
      }
    };

    initialize();
  }, []);

  const makeReservation = async (
    hourlyRate,
    startTime,
    endTime,
    ownerAddress
  ) => {
    try {
      const hourlyRateWei = Web3.utils.toWei(hourlyRate.toString(), "ether");
      const startTimeUnix = Math.floor(startTime);
      const endTimeUnix = Math.floor(endTime);

      // Make the reservation transaction
      const accounts = await Web3.eth.getAccounts();
      const transaction = contract.methods.MakeReservation(
        hourlyRateWei,
        startTimeUnix,
        endTimeUnix,
        ownerAddress
      );
      const gas = await transaction.estimateGas({ from: accounts[0] });
      const result = await transaction.send({
        from: accounts[0],
        value: 0,
        gas,
      });

      // Wait for the transaction to be mined
      await result.transactionHash;
      //! amount and paid field after transaction
    } catch (err) {
      console.error("Error making reservation:", err);
      setError("Error making reservation.");
    }
  };

  const parkadeContextValue = {
    contract,
    account,
    reservations,
    makeReservation,
    error,
  };

  return (
    <ParkadeContext.Provider value={parkadeContextValue}>
      {children}
    </ParkadeContext.Provider>
  );
};

export { ParkadeContext, ParkadeProvider };
