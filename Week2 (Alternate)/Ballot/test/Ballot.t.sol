// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Ballot.sol";
import "./common/User.sol";
import "./common/Chairperson.sol";

contract BallotTest is Test {
    bytes32[] public proposalNames;
    address public ballotContract;
    uint proposalIndex = 1;

    Chairperson internal chairperson;
    User internal user2;
    User internal user3;

    function setUp() public {
        chairperson = new Chairperson();
        ballotContract = chairperson.getContractAddress();
        proposalNames = chairperson.getProposals();

        createUsers(ballotContract);
    }

    function createUsers(address _ballotContract) public {
        user2 = new User(_ballotContract);
        user3 = new User(_ballotContract);
    }

    function testVoteWithNoRight() public {
        console.log("user2 attempts to delegate to another address");
        vm.expectRevert("Has no right to vote");
        user2.vote(proposalIndex);
    }

    function testDelegateWithNoRight() public {
        console.log("user2 attempts to delegate to another address");
        vm.expectRevert("You have no right to vote");
        user2.delegate(address(user3));
    }

    function testGiveRightToVoteWithNoRight() public {
        console.log("user2 attempts to give right to vote");
        vm.expectRevert("Only chairperson can give right to vote.");
        user2.giveRightToVote(address(user3));
    }

    function testDelegateToSelf() public {
        console.log("user2 attempts to delegate to self");
        chairperson.giveRightToVote(address(user2));
        vm.expectRevert("Self-delegation is disallowed.");
        user2.delegate(address(user2));
    }

    function testDelegateAfterVoting() public {
        console.log(
            "user2 attempts to delegate to another address after voting"
        );
        chairperson.giveRightToVote(address(user2));
        user2.vote(proposalIndex);
        vm.expectRevert("You already voted.");
        user2.delegate(address(user3));
    }
}
