pragma solidity >=0.4.22 <0.7.0;

contract Payments {
    address payable owner;

    struct Payment {
        string id;
        uint256 amount;
        uint256 date;
    }
    mapping(address=>Payment[]) private payments;

    // Event to notify payment
    event Pay(address, string, uint);

    constructor() public {
        owner = msg.sender;
    }

    // Optional. Fallback function to receive funds
    function() external payable {
        require (msg.data.length == 0, 'The called function does not exist');
    }

    // Payment function. Receives the id of the payment
    function pay(string memory id, uint value) public payable {
        require(msg.value == value, 'The payment does not match the value of the transaction');
        payments[msg.sender].push(Payment(id, msg.value, block.timestamp));
        emit Pay(msg.sender, id, msg.value);
    }

    function withdraw() public payable {
        require(msg.sender == owner, 'Only owner can withdraw funds');
        owner.transfer(address(this).balance);
    }

    function paymentsOf(address buyer) public view returns (uint) {
        return payments[buyer].length;
    }

    function paymentOfAt(address buyer, uint256 index) public view returns (string memory, uint256 amount, uint256 date) {
        Payment[] memory pays = payments[buyer];
        require(pays.length > index, "Payment does not exist");
        Payment memory payment = pays[index];
        return (payment.id, payment.amount, payment.date);
    }
}