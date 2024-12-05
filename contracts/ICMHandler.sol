// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IICM {
    function sendMessage(address target, bytes calldata message) external;
}

interface ICarbonCredit {
    function burn(address from, uint256 amount) external;
    function mint(address to, uint256 amount) external;
}

contract ICMHandler {
    address public icmRouter; // ICM Router address
    ICarbonCredit public carbonCredit; // Reference to CarbonCredit contract

    event CrossChainTransfer(address indexed from, address indexed to, uint256 amount, uint256 chainId);

    constructor(address _icmRouter, address _carbonCredit) {
        icmRouter = _icmRouter;
        carbonCredit = ICarbonCredit(_carbonCredit); // Cast the address as the CarbonCredit contract
    }

    /**
     * @dev Transfers carbon credits across Avalanche chains using ICM.
     * @param to Recipient address on the target chain.
     * @param amount Number of tokens to transfer.
     * @param chainId ID of the target chain.
     */
    function transferCredit(address to, uint256 amount, uint256 chainId) external {
        // Burn tokens on the source chain
        carbonCredit.burn(msg.sender, amount);

        // Encode the transfer message
        bytes memory message = abi.encode(to, amount, chainId);

        // Send the message via ICM
        IICM(icmRouter).sendMessage(address(this), message);

        emit CrossChainTransfer(msg.sender, to, amount, chainId);
    }

    /**
     * @dev Handles incoming cross-chain messages to mint tokens on the target chain.
     * @param from Source address on the original chain.
     * @param to Recipient address on the current chain.
     * @param amount Number of tokens to mint.
     */
    function handleCrossChainMessage(address from, address to, uint256 amount) external {
        require(msg.sender == icmRouter, "Unauthorized caller");
        carbonCredit.mint(to, amount);
    }
}
