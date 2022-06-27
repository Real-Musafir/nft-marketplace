// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './ERC721Connector.sol';

contract Kryptobird is ERC721Connector {

// initialize this contract to inherit
// name and symbol from ERC721Metadata so that
// the name is KryptoBird and the symbole is KBIRDZ

constructor() ERC721Connector('Kryptobird', "KBIRDZ"){

}

}