// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "../../src/Ballot.sol";

contract Chairperson {
    Ballot public ballot;
    bytes32[] public proposalNames;

    constructor() {
        string[3] memory proposals = [
            "ProposalZero",
            "ProposalOne",
            "ProposalTwo"
        ];
        for (uint i = 0; i < proposals.length; i++) {
            proposalNames.push(stringToBytes32(proposals[i]));
        }
        ballot = new Ballot(proposalNames);
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

    function getProposals() external view returns (bytes32[] memory) {
        return proposalNames;
    }

    function getContractAddress() external view returns (address) {
        return address(ballot);
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
