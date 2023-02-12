//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Importing ERC 721 Token Contract
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Escrow.sol";


contract RealEstate is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Real Estate", "REAL"){}

    function mint(string memory tokenURI) public returns (uint256){
        // Increment and Add new token Ids
        _tokenIds.increment();

        // Adding new token by new current Token Id
        uint256 newItemId = _tokenIds.current();
        // Mint by Internal Mint Function and new Id
        _mint(msg.sender, newItemId);
        // Setting token Uri
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        // Giving how many NFTs currently minted
        return _tokenIds.current();
    }

}
