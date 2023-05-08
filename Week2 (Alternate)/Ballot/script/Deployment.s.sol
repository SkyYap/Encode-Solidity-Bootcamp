// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {Ballot} from "../src/Ballot.sol";

// forge script script/Deployment.s.sol:Deploy --fork-url http://localhost:8545 --broadcast
// forge script script/Deployment.s.sol:Deploy --rpc-url sepolia --broadcast --skip-simulation --verify -vvvv

contract Deploy is Script {
    bytes32[] public proposalNames;

    function setUp() public {
        string[3] memory proposals = [
            "ProposalZero",
            "ProposalOne",
            "ProposalTwo"
        ];
        for (uint i = 0; i < proposals.length; i++) {
            proposalNames.push(stringToBytes32(proposals[i]));
        }
    }

    function stringToBytes32(
        string memory source
    ) internal pure returns (bytes32 result) {
        require(
            bytes(source).length <= 32,
            "String length should not exceed 32 bytes."
        );

        assembly {
            result := mload(add(source, 32))
        }
    }

    function run() public {
        uint256 chairperson = vm.envUint("PRIVATE_KEY");
        uint256 user2 = vm.envUint("PRIVATE_KEY_TWO");
        uint256 user3 = vm.envUint("PRIVATE_KEY_THREE");

        // Anvil addresses
        // address chairpersonAddress = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        // address user2Address = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        // address user3Address = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;

        // Sepolia addresses
        address chairpersonAddress = 0x9620daf4fE148e8dCB58745f35BE24AE30503535;
        address user2Address = 0x58955872D346d19e5c7682A9F9317c4db7338fe0;
        address user3Address = 0xAAf640F8A06bC6A23f8f7B93618884EEeaac2276;

        uint proposalIndex = 1;

        //  deploying contract
        vm.startBroadcast(chairperson);
        console.log("Deploying contract");
        Ballot ballot = new Ballot(proposalNames);
        vm.stopBroadcast();

        // Granting user2 right to delegate and making subsequent vote
        vm.startBroadcast(chairperson);
        console.log("Giving user2 right to vote");
        ballot.giveRightToVote(user2Address);

        console.log("Giving user3 right to vote");
        ballot.giveRightToVote(user3Address);
        // chairperson votes
        console.log("Chairperson voting for proposal one");
        ballot.vote(proposalIndex);
        vm.stopBroadcast();

        vm.startBroadcast(user2);
        console.log("User2 votes for proposal one");
        ballot.vote(proposalIndex);
        vm.stopBroadcast();

        vm.startBroadcast(user3);
        console.log("User3 delegates away right to vote");
        ballot.delegate(chairpersonAddress);

        uint winningProposal = ballot.winningProposal();
        console.log("Winning proposal number:", winningProposal);

        bytes32 winnerName = ballot.winnerName();
        string memory name = string(abi.encodePacked(winnerName));

        console.log("Winner name:", name);
        vm.stopBroadcast();

        // console.log("end");
    }
}
