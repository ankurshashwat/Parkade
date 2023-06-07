// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Parkade {
    struct Reservation {
        uint256 hourlyRate;
        uint256 startTime;
        uint256 endTime;
        bool paid;
    }

    Reservation[] public reservations;

    event ReservationStored(
        uint256 indexed reservationId,
        address indexed user,
        uint256 indexed startTime,
        uint256 endTime
    );

    event PaymentReceived(address indexed user, uint256 amount);

    function storeReservation(
        uint256 _hourlyRate,
        uint256 _startTime,
        uint256 _endTime
    ) external {
        require(_hourlyRate > 0, "Hourly rate must be greater than zero");
        require(
            _endTime > _startTime,
            "End time must be greater than start time"
        );

        Reservation memory newReservation = Reservation(
            _hourlyRate,
            _startTime,
            _endTime,
            false
        );
        reservations.push(newReservation);

        emit ReservationStored(
            reservations.length - 1,
            msg.sender,
            _startTime,
            _endTime
        );
    }

    function makeReservation(uint256 _reservationId) external payable {
        require(_reservationId < reservations.length, "Invalid reservation ID");

        Reservation storage reservation = reservations[_reservationId];
        require(!reservation.paid, "Reservation already paid");

        uint256 duration = reservation.endTime - reservation.startTime;
        uint256 amount = reservation.hourlyRate * duration;
        require(msg.value >= amount, "Insufficient payment");

        reservation.paid = true;
        emit PaymentReceived(msg.sender, amount);

        address payable contractAddress = payable(address(this));
        contractAddress.transfer(amount);
    }

    receive() external payable {}
}
