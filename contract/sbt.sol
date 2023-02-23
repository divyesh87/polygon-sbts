// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract sbt{
    mapping (address=>string) public directory;

    function mint( address _recepient, string memory _hash) public{    
        directory[_recepient] = _hash;
    }
}
