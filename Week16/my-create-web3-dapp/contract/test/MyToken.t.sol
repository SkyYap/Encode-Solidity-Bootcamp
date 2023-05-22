// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "forge-std/Test.sol";
import "../src/MyToken.sol";

contract MyTokenTest is Test {
    MyTokens internal myToken;

    function beforeEach() public override {
        myToken = new MyToken();
    }

    function testTokenName() public {
        string memory name = myToken.name();
        assert.equal(name, "MyToken", "Incorrect token name");
    }

    function testTokenSymbol() public {
        string memory symbol = myToken.symbol();
        assert.equal(symbol, "MTK", "Incorrect token symbol");
    }

    function testTokenDecimals() public {
        uint8 decimals = myToken.decimals();
        assert.equal(decimals, 18, "Incorrect token decimals");
    }

    // Add more test cases for other functions

    function runTests() public {
        testTokenName();
        testTokenSymbol();
        testTokenDecimals();
        // TODO: Add more test functions to run
    }
}