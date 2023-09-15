// SPDX-Liscence-Identifier: MIT

pragma solidity ^0.8.0;

contract Tracking{
    enum StatusOfShipment {
        PENDING, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
    }

    struct Shipment{
        address sender;
        address reciever;
        uint256 timeofPickup;
        uint256 timeofDelivery;
        uint256 distance;
        uint256 price;
        StatusOfShipment status;
        bool paymentDone;
    }

    mapping (address => Shipment []) public shipments;
    uint256 public ShipmentNumber;

        struct TyepShipment{
        address sender;
        address reciever;
        uint256 timeofPickup;
        uint256 timeofDelivery;
        uint256 distance;
        uint256 price;
        StatusOfShipment status;
        bool paymentDone;
        }

        TyepShipment[] tyepShipments;


        event ShipmentCreated (
            address indexed sender,
            address indexed reciever,
            uint256 timeofPickup,
            uint256 distance,
            uint256 price
            );
        event ShipmentOutForDelivery (
            address indexed sender,
            address indexed reciever,
            uint256 timeofPickup
            );
        event ShipmentDelivered (
            address indexed sender,
            address indexed reciever,
            uint256 timeofDelivery
            );
        event ShipmentPaymentMade(
            address indexed sender,
            address indexed reciever,
            uint256 amount
            );

        constructor(){
            ShipmentNumber = 0;
        }

        function createShipment (
            address _reciever,
            uint256 _timeofPickup,
            uint256 _distance,
            uint256 _price
        ) public payable {
            require(msg.value == _price, "Payment amount must match the price");

            Shipment memory shipment = Shipment(msg.sender, _reciever,_timeofPickup, 0,
             _distance, _price,StatusOfShipment.PENDING, false);

            shipments[msg.sender].push(shipment);
            ShipmentNumber++;
            tyepShipments.push(
                TyepShipment(
                    msg.sender,
                    _reciever,
                    _timeofPickup,
                    0,
                    _distance,
                    _price,
                    StatusOfShipment.PENDING, 
                    false
                )
            );

            emit ShipmentCreated(msg.sender, _reciever, _timeofPickup, _distance, _price);
        }

        function startShipment(address _sender, address _reciever, uint256 _index) public{
            Shipment storage shipment = shipments[_sender][_index];
            TyepShipment storage tyepShipment = tyepShipments[_index];

            require(shipment.reciever == _reciever, "Invalid reciever");
            require(shipment.status == StatusOfShipment.PENDING, "Shipment out for Delivery");


            shipment.status = StatusOfShipment.OUT_FOR_DELIVERY;
            tyepShipment.status = StatusOfShipment.OUT_FOR_DELIVERY;

            emit ShipmentOutForDelivery(_sender, _reciever, shipment.timeofPickup);
        }


    function completeShipment (address _sender, address _reciever, uint256 _index)
    public{
            Shipment storage shipment = shipments[_sender][_index];
            TyepShipment storage tyepShipment = tyepShipments[_index];

            require(shipment.reciever == _reciever, "Invalid reciever");
            require(shipment.status == StatusOfShipment.OUT_FOR_DELIVERY, "Shipment is out for Delivery");
            require(!shipment.paymentDone, "Payment is already done");

            shipment.status = StatusOfShipment.DELIVERED;
            tyepShipment.status = StatusOfShipment.DELIVERED;
            tyepShipment.timeofDelivery = block.timestamp;
            shipment.timeofDelivery = block.timestamp;
            uint256 amount = shipment.price;

            payable(shipment.sender).transfer(amount);
            shipment.paymentDone = true;
            tyepShipment.paymentDone = true;


            emit ShipmentOutForDelivery(_sender, _reciever, shipment.timeofDelivery);
            emit ShipmentPaymentMade(_sender, _reciever, amount);
    }

    function getShipment(
        address _sender, uint256 _index) public view returns (
            address,address,uint256,uint256,uint256,uint256,StatusOfShipment, bool)
           {
            Shipment memory shipment = shipments[_sender][_index];
            return(
                shipment.sender, shipment.reciever, shipment.timeofPickup, shipment.timeofDelivery, 
                shipment.distance, shipment.price, shipment.status, shipment.paymentDone
            );
            
           } 
    function getShipmentsCount(address _sender) public view returns (uint256){
            return shipments[_sender].length;
    }   

    function getAllTransactions() public view returns (TyepShipment [] memory)
    {
        return tyepShipments;
    }



}    
