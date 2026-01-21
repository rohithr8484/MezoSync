// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MezoSyncBills
 * @dev Handles bill payments (Rent, SaaS, Utilities) for Mezo Sync platform
 */
contract MezoSyncBills is ReentrancyGuard, Ownable {
    IERC20 public musdToken;
    
    // Bill types
    enum BillType { RENT, SAAS, UTILITIES }
    
    // Bill status
    enum BillStatus { DRAFT, PENDING, PAID, OVERDUE }
    
    // Bill struct
    struct Bill {
        bytes32 billId;
        address creator;
        address payer;
        uint256 amountUSD;
        uint256 amountMUSD;
        BillType billType;
        BillStatus status;
        string customerName;
        string description;
        uint256 dueDate;
        uint256 createdAt;
        uint256 paidAt;
    }
    
    // Mapping from bill ID to Bill
    mapping(bytes32 => Bill) public bills;
    
    // User bills (created)
    mapping(address => bytes32[]) public creatorBills;
    
    // User bills (to pay)
    mapping(address => bytes32[]) public payerBills;
    
    // Bill counter for generating IDs
    uint256 public billCounter;
    
    // Events
    event BillCreated(
        bytes32 indexed billId,
        address indexed creator,
        address indexed payer,
        uint256 amountMUSD,
        BillType billType,
        uint256 dueDate
    );
    
    event BillPaid(
        bytes32 indexed billId,
        address indexed payer,
        uint256 amountMUSD,
        uint256 paidAt
    );
    
    event BillStatusUpdated(
        bytes32 indexed billId,
        BillStatus oldStatus,
        BillStatus newStatus
    );
    
    constructor(address _musdToken) Ownable(msg.sender) {
        musdToken = IERC20(_musdToken);
    }
    
    /**
     * @dev Create a new bill
     */
    function createBill(
        address _payer,
        uint256 _amountUSD,
        uint256 _amountMUSD,
        BillType _billType,
        string calldata _customerName,
        string calldata _description,
        uint256 _dueDate
    ) external returns (bytes32) {
        require(_payer != address(0), "Invalid payer address");
        require(_amountMUSD > 0, "Amount must be greater than 0");
        require(_dueDate > block.timestamp, "Due date must be in future");
        
        billCounter++;
        bytes32 billId = keccak256(
            abi.encodePacked(msg.sender, _payer, billCounter, block.timestamp)
        );
        
        bills[billId] = Bill({
            billId: billId,
            creator: msg.sender,
            payer: _payer,
            amountUSD: _amountUSD,
            amountMUSD: _amountMUSD,
            billType: _billType,
            status: BillStatus.PENDING,
            customerName: _customerName,
            description: _description,
            dueDate: _dueDate,
            createdAt: block.timestamp,
            paidAt: 0
        });
        
        creatorBills[msg.sender].push(billId);
        payerBills[_payer].push(billId);
        
        emit BillCreated(
            billId,
            msg.sender,
            _payer,
            _amountMUSD,
            _billType,
            _dueDate
        );
        
        return billId;
    }
    
    /**
     * @dev Pay a bill in MUSD
     */
    function payBill(bytes32 _billId) external nonReentrant {
        Bill storage bill = bills[_billId];
        require(bill.creator != address(0), "Bill does not exist");
        require(bill.status == BillStatus.PENDING || bill.status == BillStatus.OVERDUE, "Bill not payable");
        require(
            musdToken.balanceOf(msg.sender) >= bill.amountMUSD,
            "Insufficient MUSD balance"
        );
        
        BillStatus oldStatus = bill.status;
        bill.status = BillStatus.PAID;
        bill.paidAt = block.timestamp;
        
        // Transfer MUSD to bill creator
        require(
            musdToken.transferFrom(msg.sender, bill.creator, bill.amountMUSD),
            "Transfer failed"
        );
        
        emit BillPaid(_billId, msg.sender, bill.amountMUSD, block.timestamp);
        emit BillStatusUpdated(_billId, oldStatus, BillStatus.PAID);
    }
    
    /**
     * @dev Get bill details
     */
    function getBill(bytes32 _billId) external view returns (Bill memory) {
        return bills[_billId];
    }
    
    /**
     * @dev Get bills created by user
     */
    function getCreatorBills(address _creator) external view returns (bytes32[] memory) {
        return creatorBills[_creator];
    }
    
    /**
     * @dev Get bills assigned to payer
     */
    function getPayerBills(address _payer) external view returns (bytes32[] memory) {
        return payerBills[_payer];
    }
    
    /**
     * @dev Mark overdue bills (called by keeper or admin)
     */
    function markOverdue(bytes32 _billId) external {
        Bill storage bill = bills[_billId];
        require(bill.status == BillStatus.PENDING, "Bill not pending");
        require(block.timestamp > bill.dueDate, "Bill not overdue yet");
        
        BillStatus oldStatus = bill.status;
        bill.status = BillStatus.OVERDUE;
        
        emit BillStatusUpdated(_billId, oldStatus, BillStatus.OVERDUE);
    }
}
