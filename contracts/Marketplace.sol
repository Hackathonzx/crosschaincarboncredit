// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CarbonCredit.sol";
import "./PriceOracle.sol";

contract Marketplace {
    struct Listing {
        address seller;
        uint256 amount;
        uint256 price; // Price per token in wei
    }

    CarbonCredit public carbonCredit;
    PriceOracle public priceOracle;

    mapping(uint256 => Listing) public listings;
    uint256 public nextListingId;

    event Listed(address indexed seller, uint256 indexed id, uint256 amount, uint256 price);
    event Sold(address indexed buyer, uint256 indexed id, uint256 amount, uint256 price);

    constructor(address _carbonCredit, address _priceOracle) {
        carbonCredit = CarbonCredit(_carbonCredit);
        priceOracle = PriceOracle(_priceOracle);
    }

    /**
     * @dev Allows a seller to list carbon credits for sale using the latest oracle price.
     * @param amount Number of tokens to sell.
     */
    function listCredit(uint256 amount) external {
        uint256 currentPrice = priceOracle.getPrice();
        require(carbonCredit.balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Transfer tokens to the contract for escrow
        carbonCredit.transferFrom(msg.sender, address(this), amount);

        listings[nextListingId] = Listing(msg.sender, amount, currentPrice);
        emit Listed(msg.sender, nextListingId, amount, currentPrice);
        nextListingId++;
    }

    /**
     * @dev Allows a buyer to purchase listed carbon credits.
     * @param id Listing ID to purchase from.
     */
    function buyCredit(uint256 id) external payable {
        Listing storage listing = listings[id];
        require(listing.amount > 0, "Listing does not exist");
        require(msg.value == listing.amount * listing.price, "Incorrect payment amount");

        // Transfer tokens to the buyer and ETH to the seller
        carbonCredit.transfer(msg.sender, listing.amount);
        payable(listing.seller).transfer(msg.value);

        emit Sold(msg.sender, id, listing.amount, listing.price);
        delete listings[id];
    }
}
