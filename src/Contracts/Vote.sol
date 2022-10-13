// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;


contract Vote{

    mapping (uint => uint8) public votesReceived;
    
    bytes32[] public candidateList;

    function totalVotesFor(uint candidate) public returns (uint8) {
        return votesReceived[candidate];
    }

    function voteForCandidate(uint candidate) public {
        
        votesReceived[candidate] += 1;
    }

    function initializeVotes() public {
        votesReceived[0] = 0;
        votesReceived[1] = 0;
        votesReceived[2] = 0; 
    }
}