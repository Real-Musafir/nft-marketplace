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

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
        );
    
    // keep track of token owner address to token ids
    mapping (uint256 => address) private _tokenOwner;

    // keep track of how many tokens an owner address has
    mapping (address => uint256) private _OwnedTokensCount;


    /// @notice Count all NFTs assigned to an owner
    /// @dev NFTs assigned to the zero address are considered invalid, and this
    ///  function throws for queries about the zero address.
    /// @param _owner An address for whom to query the balance
    /// @return The number of NFTs owned by `_owner`, possibly zero
    function balanceOf(address _owner) public view returns(uint256){
        
        require(_owner != address(0), 'owner query for non-existance token');
        return _OwnedTokensCount[_owner];
    }

    /// @notice Find the owner of an NFT
    /// @dev NFTs assigned to zero address are considered invalid, and queries
    ///  about them do throw.
    /// @param _tokenId The identifier for an NFT
    /// @return The address of the owner of the NFT
    function ownerOf(uint256 _tokenId) external view returns (address){
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), 'owner query for non-existance token');
        return owner;
    }


    function _exists(uint256 tokenId) internal view returns(bool){
        address owner = _tokenOwner[tokenId];
        // return truthiness the address is not zero
        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal{
        // requires that the addrss isn't zero
        require(to!=address(0), 'ERC721: minting to the zero address');
        
        //minted for first time so it should not be exist
        require(!_exists(tokenId), 'ERC721: token alredy minted');
        
        // er are adding a new address with a token id for minting
        _tokenOwner[tokenId] = to;

        _OwnedTokensCount[to] +=1;

        emit Transfer(address(0), to, tokenId);
    }

}