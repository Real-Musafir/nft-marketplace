// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC165.sol";
import "./interfaces/IERC721.sol";

/*

building out the minting function:
a. nft to point to an address
b. keep track of the token ids
c. keep track of token owner address to token ids
d. keep track of how many tokens an owner address has
e. create an event that emits a  transfer log - contract
 address, where  it is being minted to, the id

*/

contract ERC721 is ERC165, IERC721 {
    // keep track of token owner address to token ids
    mapping(uint256 => address) private _tokenOwner;

    // keep track of how many tokens an owner address has
    mapping(address => uint256) private _OwnedTokensCount;

    // Mapping from token id to approved address
    mapping(uint256 => address) private _tokenApprovals;

    constructor() {
        _registerInterface(
            bytes4(
                keccak256("balanceOf(bytes4)") ^
                    keccak256("ownerOf(bytes4)") ^
                    keccak256("transferFrom(bytes4)")
            )
        );
    }

    function balanceOf(address _owner) public view override returns (uint256) {
        require(_owner != address(0), "owner query for non-existance token");
        return _OwnedTokensCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view override returns (address) {
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), "owner query for non-existance token");
        return owner;
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        // return truthiness the address is not zero
        return owner != address(0);
    }

    //virtual because this _mint functin is overited in ERC721Enumerable
    function _mint(address to, uint256 tokenId) internal virtual {
        // requires that the addrss isn't zero
        require(to != address(0), "ERC721: minting to the zero address");

        //minted for first time so it should not be exist
        require(!_exists(tokenId), "ERC721: token alredy minted");

        // er are adding a new address with a token id for minting
        _tokenOwner[tokenId] = to;

        _OwnedTokensCount[to] += 1;

        emit Transfer(address(0), to, tokenId);
    }

    function _transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        require(
            _to != address(0),
            "Error - ERC721 Transfer to the zero address"
        );
        require(
            ownerOf(_tokenId) == _from,
            "Trying to tranfer a token the address does not exist"
        );

        _OwnedTokensCount[_from] -= 1;
        _OwnedTokensCount[_to] += 1;

        _tokenOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public override {
        require(isApprovedOrOwner(msg.sender, _tokenId));
        _transferFrom(_from, _to, _tokenId);
    }

    function approve(address _to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(_to != owner, "Error - approval to currnt owner");
        require(
            msg.sender == owner,
            "Current caller is not the owner of the token"
        );
        _tokenApprovals[tokenId] = _to;
        emit Approval(owner, _to, tokenId);
    }

    function isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        require(_exists(tokenId), "token does not exist");
        address owner = ownerOf(tokenId);
        return (spender == owner);
    }
}
