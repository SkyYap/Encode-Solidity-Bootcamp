# Week 1 - Interact with HelloWorld

The contract is deployed here: 0x7ef944e7557b39ca3c1b22d2ce86f981c41b1544

The contract consists of 4 main functions:
1. setText: change the text content
2. transferOwnership: change the owner of the contract,
3. helloWorld: display the current text
4. owner: display the current contract owner

# Homework

## 1. Function helloWorld()

View functions do not change the state of the blockchain, they do not consume gas, and are not broadcasted as a transaction.

## 2. Function setTest()

**txhash:** `0xb973f418a7ec30da048f7738ae764a452582f0d9dea5ad71b23b8f0bc97e1ef3`
_Reverted with "Fail with error 'Caller is not the owner'"_

**txhash:** `0x853ac6e57eb5ef57599b3d902f9bcb6b36373a583174b469d3723a07aec4519c`
_Success_

## 3. Function transferOwnership()

**txhash:** `0xeea349ffd609e870c9816b6191429cf41de4b0d4b7c4f788cee2100ed6570ed9`

_Reverted with "Fail with error 'Caller is not the owner'"_

**txhash:** `0x5cd91a23214bcb1730e004d4c47e9b4f13a59fd516fa540867192d63ef85da49`

_Success_