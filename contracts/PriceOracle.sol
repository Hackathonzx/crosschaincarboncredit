// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IOracle {
    function getLatestPrice() external view returns (uint256);
}

contract PriceOracle {
    uint256 public currentPrice;
    address public oracle;

    event PriceUpdated(uint256 oldPrice, uint256 newPrice);

    constructor(address _oracle) {
        oracle = _oracle;
    }

    /**
     * @dev Updates the current price using the external oracle.
     */
    function updatePrice() external {
        uint256 newPrice = IOracle(oracle).getLatestPrice();
        require(newPrice > 0, "Invalid price from oracle");

        emit PriceUpdated(currentPrice, newPrice);
        currentPrice = newPrice;
    }

    /**
     * @dev Returns the current price.
     */
    function getPrice() external view returns (uint256) {
        return currentPrice;
    }
}
