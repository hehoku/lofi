//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Lofi {
  event NewLofi(address indexed from, uint256 timestamp, string message);

  constructor() {
    console.log('Hello, world!');
  }

  LofiItem[] lofis;

  struct LofiItem {
    address submitter;
    string lofiUrl;
    uint256 upvoteCount;
    uint256 timestamp;
  }

  function newLofi(string memory _lofiUrl) public {
    lofis.push(LofiItem(msg.sender, _lofiUrl, 0, block.timestamp));
    emit NewLofi(msg.sender, block.timestamp, _lofiUrl);
  }

  function getAllLofis() public view returns (LofiItem[] memory) {
    return lofis;
  }
}
