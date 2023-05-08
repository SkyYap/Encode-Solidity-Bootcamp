// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "../../src/interfaces/IBallot.sol";

contract User {
    IBallot public ballot;

    constructor(address _ballotContract) {
        ballot = IBallot(_ballotContract);
    }

    function giveRightToVote(address voter) external {
        ballot.giveRightToVote(voter);
    }

    function delegate(address to) external {
        ballot.delegate(to);
    }

    function vote(uint proposal) external {
        ballot.vote(proposal);
    }
}
