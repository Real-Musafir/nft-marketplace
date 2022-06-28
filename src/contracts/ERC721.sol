// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/*

building out the minting function:
a. nft to point to an address
b. keep track of the token ids
c. keep track of token owner address to token ids
d. keep track of how many tokens an owner address has
e. create an event that emits a  transfer log - contract
 address, where  it is being minted to, the id

*/

contract ERC721 {
    
    // keep track of token owner address to token ids
    mapping (uint256 => address) private _tokenOwner;

    // keep track of how many tokens an owner address has
    mapping (address => uint256) private _OwnedTokensCount;


}