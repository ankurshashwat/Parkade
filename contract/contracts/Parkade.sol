// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Parkade {
    struct Reservation {
        uint256 hourlyRate;
        uint256 startTime;
        uint256 endTime;
        bool paid;
        address ownerAddress;
    }

    mapping(bytes32 => Reservation) public reservations;

    event Rsvp(
        bytes32 indexed reservationId,
        address indexed user,
        uint256 startTime,
        uint256 endTime,
        uint256 amount,
        bool paid,
        address ownerAddress
    );

    function MakeReservation(
        uint256 _hourlyRate,
        uint256 _startTime,
        uint256 _endTime,
        address payable _ownerAddress
    ) external payable {
        require(_hourlyRate > 0, "Hourly rate must be greater than zero");
        require(
            _endTime > _startTime,
            "End time must be greater than start time"
        );
        require(_ownerAddress != address(0), "Invalid owner address");

        uint256 duration = _endTime - _startTime;
        uint256 amount = _hourlyRate * duration;
        require(msg.value >= amount, "Insufficient payment");

        bytes32 reservationId = keccak256(
            abi.encodePacked(msg.sender, block.timestamp)
        );
        Reservation memory newReservation = Reservation(
            _hourlyRate,
            _startTime,
            _endTime,
            true,
            _ownerAddress
        );
        reservations[reservationId] = newReservation;

        emit Rsvp(
            reservationId,
            msg.sender,
            _startTime,
            _endTime,
            amount,
            true,
            _ownerAddress
        );

        _ownerAddress.transfer(amount);
    }

    receive() external payable {}
}
