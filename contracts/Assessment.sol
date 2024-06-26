// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;
    string private password; 

 event Deposit(address indexed account, uint amount, uint timestamp);
    event Withdraw(address indexed account, uint amount, uint timestamp);

    string[] public transactionTypes;
    uint[] public transactionAmounts;
    uint[] public transactionTimestamps;

    constructor(uint _balance, string memory _password) payable {
        owner = payable(msg.sender);
        balance = _balance;
        password = _password; 
    }

    function getBalance() public view returns(uint){
        return balance;
    }

    function deposit(uint _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        
         transactionTypes.push("Deposit");
        transactionAmounts.push(_amount);
        transactionTimestamps.push(block.timestamp);

        assert(balance == _previousBalance + _amount);

        emit Deposit(msg.sender, _amount, block.timestamp);}


    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        transactionTypes.push("Withdraw");
        transactionAmounts.push(_withdrawAmount);
        transactionTimestamps.push(block.timestamp);

        assert(balance == _previousBalance - _withdrawAmount);
    
        emit Withdraw(msg.sender, _withdrawAmount, block.timestamp);
    }


    function getTransactionHistory() public view returns (string[] memory, uint256[] memory, uint256[] memory) {
        return (transactionTypes, transactionAmounts, transactionTimestamps);
    }
        

    
    function authenticate(string memory _password) public view returns (bool) {
        return (keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(password)));
    }
}

