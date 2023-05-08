# Group 1 - Encode Solidity Bootcamp Homework - Week 2 (Alternate)
Attempted to work through the homework in foundry instead of hardhat.

## Some Difficulties: 
Solidity try-catch does not behave in the same way as other common languages.
Had to run transactions that resulted in errors/reverts in tests instead of the script itself.

## On chain transactions
### Deploying contract
Hash: 0xcdbd798854e8eac8c8f7a462ef0f0f5d554c23c9985af211635f054216362712
Contract Address: 0xcd863aef140259a94c6a4040b3d7f968bf0bdd85
Block: 3443830
Paid: 0.00191210100637367 ETH (637367 gas * 3.00000001 gwei)

### Giving user 2 right to vote
Hash: 0xd54ec83e0a126ed747285c25ba982b3f7099e3e02c9d377175fdbad346563622
Block: 3443831
Paid: 0.000145167000532279 ETH (48389 gas * 3.000000011 gwei)

### Giving user 3 right to vote
Hash: 0x638b516711a5f115e8f0915bb42a95be8eb633e132b2a25ad648ccf4370ce198
Block: 3443832
Paid: 0.000145167000532279 ETH (48389 gas * 3.000000011 gwei)

### Chairperson voting for proposal one
Hash: 0x6a74abde6f4e8fa2f18c08a385d3d94f904c124303628bc06eeb7df73bc42918
Block: 3443833
Paid: 0.000277557001017709 ETH (92519 gas * 3.000000011 gwei)

### User 2 votes for proposal 1
Hash: 0xb76887a667ce544be7b7e715f6d4f5d53d0c04626668f757225b6f5a3e81ca17
Block: 3443834
Paid: 0.000226257000829609 ETH (75419 gas * 3.000000011 gwei)

### User 3 delegates away right to vote
Hash: 0x6281770a2ddefd516ff6fd4b1940ba9ea523073e0376d471396058cffe2b88cc
Block: 3443835
Paid: 0.00018128400060428 ETH (60428 gas * 3.00000001 gwei)

### View functions
Winning proposal number: 1
Winner name: ProposalOne

## Test Cases
```
Traces:
  [124889] BallotTest::testDelegateAfterVoting() 
    ├─ [0] console::log(user2 attempts to delegate to another address after voting) [staticcall]
    │   └─ ← ()
    ├─ [32241] Chairperson::giveRightToVote(User: [0x2e234DAe75C793f67A35089C9d99245E1C58470b]) 
    │   ├─ [26957] Ballot::giveRightToVote(User: [0x2e234DAe75C793f67A35089C9d99245E1C58470b]) 
    │   │   └─ ← ()
    │   └─ ← ()
    ├─ [69995] User::vote(1) 
    │   ├─ [67315] Ballot::vote(1) 
    │   │   └─ ← ()
    │   └─ ← ()
    ├─ [0] VM::expectRevert(You already voted.) 
    │   └─ ← ()
    ├─ [1546] User::delegate(User: [0xF62849F9A0B5Bf2913b396098F7c7019b51A820a]) 
    │   ├─ [776] Ballot::delegate(User: [0xF62849F9A0B5Bf2913b396098F7c7019b51A820a]) 
    │   │   └─ ← "You already voted."
    │   └─ ← "You already voted."
    └─ ← ()

[PASS] testDelegateToSelf() (gas: 52253)
Logs:
  user2 attempts to delegate to self

Traces:
  [52253] BallotTest::testDelegateToSelf() 
    ├─ [0] console::log(user2 attempts to delegate to self) [staticcall]
    │   └─ ← ()
    ├─ [32241] Chairperson::giveRightToVote(User: [0x2e234DAe75C793f67A35089C9d99245E1C58470b]) 
    │   ├─ [26957] Ballot::giveRightToVote(User: [0x2e234DAe75C793f67A35089C9d99245E1C58470b]) 
    │   │   └─ ← ()
    │   └─ ← ()
    ├─ [0] VM::expectRevert(Self-delegation is disallowed.) 
    │   └─ ← ()
    ├─ [3580] User::delegate(User: [0x2e234DAe75C793f67A35089C9d99245E1C58470b]) 
    │   ├─ [810] Ballot::delegate(User: [0x2e234DAe75C793f67A35089C9d99245E1C58470b]) 
    │   │   └─ ← "Self-delegation is disallowed."
    │   └─ ← "Self-delegation is disallowed."
    └─ ← ()

[PASS] testDelegateWithNoRight() (gas: 21296)
Logs:
  user2 attempts to delegate to another address

Traces:
  [21296] BallotTest::testDelegateWithNoRight() 
    ├─ [0] console::log(user2 attempts to delegate to another address) [staticcall]
    │   └─ ← ()
    ├─ [0] VM::expectRevert(You have no right to vote) 
    │   └─ ← ()
    ├─ [7908] User::delegate(User: [0xF62849F9A0B5Bf2913b396098F7c7019b51A820a]) 
    │   ├─ [2638] Ballot::delegate(User: [0xF62849F9A0B5Bf2913b396098F7c7019b51A820a]) 
    │   │   └─ ← "You have no right to vote"
    │   └─ ← "You have no right to vote"
    └─ ← ()

[PASS] testGiveRightToVoteWithNoRight() (gas: 21365)
Logs:
  user2 attempts to give right to vote

Traces:
  [21365] BallotTest::testGiveRightToVoteWithNoRight() 
    ├─ [0] console::log(user2 attempts to give right to vote) [staticcall]
    │   └─ ← ()
    ├─ [0] VM::expectRevert(Only chairperson can give right to vote.) 
    │   └─ ← ()
    ├─ [7855] User::giveRightToVote(User: [0xF62849F9A0B5Bf2913b396098F7c7019b51A820a]) 
    │   ├─ [2560] Ballot::giveRightToVote(User: [0xF62849F9A0B5Bf2913b396098F7c7019b51A820a]) 
    │   │   └─ ← "Only chairperson can give right to vote."
    │   └─ ← "Only chairperson can give right to vote."
    └─ ← ()

[PASS] testVoteWithNoRight() (gas: 21138)
Logs:
  user2 attempts to delegate to another address

Traces:
  [21138] BallotTest::testVoteWithNoRight() 
    ├─ [0] console::log(user2 attempts to delegate to another address) [staticcall]
    │   └─ ← ()
    ├─ [0] VM::expectRevert(Has no right to vote) 
    │   └─ ← ()
    ├─ [7709] User::vote(1) 
    │   ├─ [2521] Ballot::vote(1) 
    │   │   └─ ← "Has no right to vote"
    │   └─ ← "Has no right to vote"
    └─ ← ()
```
