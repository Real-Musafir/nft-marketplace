// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './ERC721Connector.sol';

contract KryptoBird is ERC721Connector {

    // array to stroe our nfts
    string[] public kryptoBirdz;

    mapping (string => bool) _kryptoBirdzExists;

    function mint(string memory _kryptoBird) public{

        require(!_kryptoBirdzExists[_kryptoBird],
        'Error - kryptoBird already exists');

        kryptoBirdz.push(_kryptoBird);
        uint _id = kryptoBirdz.length -1;

        _mint(msg.sender, _id);
        
        _kryptoBirdzExists[_kryptoBird] = true;
    }

constructor() ERC721Connector('Kryptobird', "KBIRDZ"){
    
}

}