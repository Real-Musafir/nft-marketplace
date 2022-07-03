// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './ERC721.sol';

contract ERC721Enumerable is ERC721 {

    uint256[] private _allTokens;

    // mapping from tokenId to position in _allTokens array
        mapping (uint256 => uint256) private _allTokensIndex;

    // mapping of owner to list of all owner token ids
    // each address has multiple token
        mapping (address => uint256[]) _ownedTokens;
    
    // mapping from token ID to index of the owner tokens list
        mapping (uint256 => uint256) _ownedTokensIndex;

   

    //here super is used to greb the _mint function from ERC721
    function _mint(address to, uint256 tokenId) internal override(ERC721){
        super._mint(to, tokenId);

        //1 add tokens to the owner
        //2 all tokens to our totlasupply - to allTokens
    
        _addTokensToTotalSupply(tokenId);
    }

    function _addTokensToTotalSupply(uint256 tokenId ) private {
        _allTokens.push(tokenId);
    }

    function totalSupply() public view returns(uint256){
        return _allTokens.length;
    }

}