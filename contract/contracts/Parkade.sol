// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Parkade {
    struct Reservation {
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
        bool paid,
        address ownerAddress
    );

    function makeReservation(
        uint256 _startTime,
        uint256 _endTime,
        address payable _ownerAddress
    ) external payable {
        require(
            _endTime > _startTime,
            "End time must be greater than start time"
        );

        bytes32 reservationId = keccak256(
            abi.encodePacked(msg.sender, block.timestamp)
        );
        Reservation memory newReservation = Reservation(
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
            true,
            _ownerAddress
        );

        _ownerAddress.transfer(msg.value);
    }

    receive() external payable {}
}
