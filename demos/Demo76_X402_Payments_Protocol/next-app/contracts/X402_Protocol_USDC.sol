// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract X402Protocol {

    IERC20 public usdc;
    address public receiver;
    uint256 public price;

    event PaymentReceived(address indexed user, uint256 amount);

    // Initialize the USDC ERC20 contract, receiver address, and USDC value
    constructor(address _usdc, address _receiver, uint256 _price) {
        require(_usdc != address(0), "Invalid USDC address");
        require(_receiver != address(0), "Invalid receiver address");
        require(_price > 0, "Price must be greater than zero");

        usdc = IERC20(_usdc);
        receiver = _receiver;
        price = _price;
    }

    // Function for completing the payment
    function pay() external {

        bool success = usdc.transferFrom(
            msg.sender,
            receiver,
            price
        );

        require(success, "USDC transfer failed");

        emit PaymentReceived(msg.sender, price);
    }
}