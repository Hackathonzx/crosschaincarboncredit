// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCredit is ERC20, Ownable {
    constructor() ERC20("CarbonCreditToken", "CCT") {}

    /**
     * @dev Mints carbon credits to a specified address.
     * @param to Address to receive the tokens.
     * @param amount Number of tokens to mint.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Burns carbon credits from a specified address.
     * @param from Address holding the tokens to be burned.
     * @param amount Number of tokens to burn.
     */
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
