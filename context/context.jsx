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

  const makeReservation = (hourlyRate, startTime, endTime, ownerAddress) => {
    return new Promise((resolve, reject) => {
      const hourlyRateWithoutDecimals = parseInt(hourlyRate);
      const hourlyRateInt = Math.round(hourlyRateWithoutDecimals);
      const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);
  
      const duration = endTimestamp - startTimestamp;
      const amount = duration * hourlyRateInt;
  
      contract.methods
        .makeReservation(
          parseInt(startTimestamp),
          parseInt(endTimestamp),
          ownerAddress
        )
        .send({ from: account, value: amount })
        .on("transactionHash", (hash) => {
          console.log("Transaction Hash:", hash);
          resolve({ amount: amount, txHash: hash });
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log("Confirmation Number:", confirmationNumber);
          console.log("Receipt:", receipt);
        })
        .on("error", (error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
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
