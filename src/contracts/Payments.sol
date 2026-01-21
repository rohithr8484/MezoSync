// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MezoSyncPayments
 * @dev Handles MUSD payments for Mezo Sync platform
 */
contract MezoSyncPayments is ReentrancyGuard, Ownable {
    IERC20 public musdToken;
    
    // Payment struct
    struct Payment {
        address sender;
        address recipient;
        uint256 amount;
        string note;
        uint256 timestamp;
        bool completed;
    }
    
    // Mapping from payment ID to Payment
    mapping(bytes32 => Payment) public payments;
    
    // User payment history
    mapping(address => bytes32[]) public userPayments;
    
    // Events
    event PaymentSent(
        bytes32 indexed paymentId,
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        string note,
        uint256 timestamp
    );
    
    event PaymentReceived(
        bytes32 indexed paymentId,
        address indexed recipient,
        uint256 amount
    );
    
    constructor(address _musdToken) Ownable(msg.sender) {
        musdToken = IERC20(_musdToken);
    }
    
    /**
     * @dev Send MUSD payment to recipient
     * @param _recipient Address of the recipient
     * @param _amount Amount of MUSD to send
     * @param _note Optional note for the payment
     */
    function sendPayment(
        address _recipient,
        uint256 _amount,
        string calldata _note
    ) external nonReentrant returns (bytes32) {
        require(_recipient != address(0), "Invalid recipient");
        require(_amount > 0, "Amount must be greater than 0");
        require(
            musdToken.balanceOf(msg.sender) >= _amount,
            "Insufficient MUSD balance"
        );
        
        // Generate unique payment ID
        bytes32 paymentId = keccak256(
            abi.encodePacked(msg.sender, _recipient, _amount, block.timestamp)
        );
        
        // Create payment record
        payments[paymentId] = Payment({
            sender: msg.sender,
            recipient: _recipient,
            amount: _amount,
            note: _note,
            timestamp: block.timestamp,
            completed: true
        });
        
        // Track payment for both users
        userPayments[msg.sender].push(paymentId);
        userPayments[_recipient].push(paymentId);
        
        // Transfer MUSD
        require(
            musdToken.transferFrom(msg.sender, _recipient, _amount),
            "Transfer failed"
        );
        
        emit PaymentSent(
            paymentId,
            msg.sender,
            _recipient,
            _amount,
            _note,
            block.timestamp
        );
        
        return paymentId;
    }
    
    /**
     * @dev Get payment details by ID
     */
    function getPayment(bytes32 _paymentId) external view returns (Payment memory) {
        return payments[_paymentId];
    }
    
    /**
     * @dev Get user's payment history
     */
    function getUserPayments(address _user) external view returns (bytes32[] memory) {
        return userPayments[_user];
    }
    
    /**
     * @dev Get user's payment count
     */
    function getUserPaymentCount(address _user) external view returns (uint256) {
        return userPayments[_user].length;
    }
}
