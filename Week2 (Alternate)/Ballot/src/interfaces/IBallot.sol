// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IBallot {
    function giveRightToVote(address voter) external;

    function delegate(address to) external;

    function vote(uint proposal) external;
}
