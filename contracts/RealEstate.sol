//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RealEstate is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Constructor, initializing the ERC721 token with a name and symbol
    constructor() ERC721("Real Estate", "REAL"){}

    // Function to mint a new NFT representing a property
    function mint(string memory tokenURI) public returns (uint256){
        // Increment the token ID counter
        _tokenIds.increment();
        // Create a new token ID
        uint256 newItemId = _tokenIds.current();
        // Mint the new token with the new ID
        _mint(msg.sender, newItemId);
        // Set the token URI for the new token
        _setTokenURI(newItemId, tokenURI);
        // Return the new token ID
        return newItemId;
    }

    // Function to get the total number of NFTs minted so far
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}
