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

  // update upvote count
  function upvote(uint256 _index) public {
    lofis[_index].upvoteCount++;
  }

  // send tip to submitter
  function tip(uint256 _index) public {
    LofiItem memory lofi = lofis[_index];
    (bool success, ) = lofi.submitter.call{ value: 123 }('');
    require(success, 'Failed to send tip');
  }
}
