// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract sbt{
    mapping (address=>string) public directory;

    function mint( address _recepient, string memory _hash) public{    
        directory[_recepient] = _hash;
    }

    function getHash(address key) public view returns(string memory){
        return directory[key];
    }
}
