// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ICMRouter {
    mapping(bytes32 => bool) public processedMessages;

    event MessageSent(address indexed from, address indexed to, uint256 amount, uint256 chainId);
    event MessageReceived(address indexed from, address indexed to, uint256 amount, uint256 chainId);

    function sendMessage(
        address to,
        uint256 amount,
        uint256 chainId,
        bytes32 messageId
    ) external {
        require(!processedMessages[messageId], "Message already processed");
        processedMessages[messageId] = true;
        emit MessageSent(msg.sender, to, amount, chainId);
    }

    function receiveMessage(
        address from,
        address to,
        uint256 amount,
        uint256 chainId,
        bytes32 messageId
    ) external {
        require(!processedMessages[messageId], "Message already processed");
        processedMessages[messageId] = true;
        emit MessageReceived(from, to, amount, chainId);
    }
}
